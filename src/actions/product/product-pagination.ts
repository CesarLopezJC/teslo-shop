'use server';

import prisma from "@/lib/prisma";

interface PaginateionOption {
    page?: number;
    take?: number;
}

export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 12
}: PaginateionOption) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 12;


    try {
        // 1. getting all products
        const products = await prisma.product.findMany({
            take: 12,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            }
        });
        //2. Getting the total of pages
        //todo:
        const tatalCount = await prisma.product.count({});

        const totalPages = Math.ceil(tatalCount / take);

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }
        // console.log(products);
    } catch (error) {
        throw new Error("It couldn't load products.")
    }
}