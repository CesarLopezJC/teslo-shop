import { initialData } from "./seed";
import prisma from '../lib/prisma';

export { }

async function main() {
    await Promise.all([
        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.category.deleteMany(),
        await prisma.user.deleteMany(),
    ])
    // console.log(initialData);

    const { categories, products, users } = initialData;




    //insert all images in db
    await prisma.user.createMany({
        data: users
    });


    // Categories
    // {
    //     name: 'Shirt'
    // }

    const categoriesData = categories.map(category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {

        map[category.name.toLowerCase()] = category.id;

        return map;
    }, {} as Record<string, string>); //<string=categoryString/label as shirt, string=categoryID

    console.log(categoriesMap);
    console.log('Seed executed successfully !');


    //Products
    // const { images, type, ...product1 } = products[0]; //when we use ...products we get the rest of variable

    // This below function is for a row 
    // await prisma.product.create({
    //     data: {
    //         ...product1,
    //         categoryId: categoriesMap[type]
    //     }
    // })

    // This function is for many rows 
    products.forEach(async (product) => {
        const { images, type, ...restOfProduct } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...restOfProduct,
                categoryId: categoriesMap[type]
            }
        })



        // Images //Craet object array with all images
        const imagesData = images.map(img => ({
            url: img,
            productId: dbProduct.id
        }));

        //insert all images in db
        await prisma.productImage.createMany({
            data: imagesData
        })

    });




}


(() => {
    if (process.env.NODE_ENV === 'production') return;

    main();
})();