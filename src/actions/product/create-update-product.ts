'use server';

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

//Validation Schema
const productSchema = z.object({
    id: z.string().uuid().optional().or(z.literal('')), //.or(z.literal('')) | .nullable()
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),

    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),

    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.nativeEnum(Gender),
})


export const createUpdateProduct = async (formData: FormData) => {

    const data = Object.fromEntries(formData); //get the data
    const productParsed = productSchema.safeParse(data); //validate the data

    console.log(data);

    console.log(productParsed.success);


    if (!productParsed.success) {
        console.log(productParsed.error);
        return { ok: false }
    }

    console.log(productParsed.data);

    const product = productParsed.data;

    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim(); //lower words, replace blank space for '-', (trim) to delete spaces before and after

    const { id, ...rest } = product;


    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            let product: Product;
            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase())

            if (id) {
                // Actualizar

                product = await prisma.product.update({
                    where: {
                        id: id
                    },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray,
                        }
                    }
                });

                console.log({ updatedProduct: product });
            } else {
                // Crear
                console.log('Create');

                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray,
                        }
                    }
                });
            }

            // Uploading Process 
            if (formData.getAll('images')) {
                // [https://url.jpg, https://url.jpg]
                const images = await uploadImages(formData.getAll('images') as File[]);

                if (!images) {
                    throw new Error("Could not upload the images, rolling back");
                }

                await prisma.productImage.createMany({
                    data: images.map(image => ({
                        url: image!,
                        productId: product.id,
                    }))
                });
                // console.log(formData.getAll('images') as File[]);
                console.log(images);
            }




            return {
                product
            }
        });

        // todo: RevalidatePath
        revalidatePath(`/admin/products`);
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);

        return {
            ok: true,
            product: prismaTx.product,
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Check the logs, Could not update it',
        }
    }



    // console.log(formData);

    return {
        ok: true,
        product: product,
    }
}





const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map(async (image) => {
            // the double trycatch is to upload all images successfully
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');

                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url);

            } catch (error) {
                console.log(error);
                return null;
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;

    } catch (error) {
        console.log(error);
        return null;
    }
}