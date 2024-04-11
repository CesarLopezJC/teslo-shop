'use server';

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginateionOption {
    page?: number;
    take?: number;
    gender?: string;
}

export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 12,
    gender = ''
}: PaginateionOption) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 12;


    try {
        console.log(gender);
        // 1. getting all products
        const products = gender === '' ?
            await prisma.product.findMany({
                take: 12,
                skip: (page - 1) * take,
                include: {
                    ProductImage: {
                        take: 2,
                        select: {
                            url: true,
                        }
                    }
                },
            })
            : //Else
            await prisma.product.findMany({
                take: 12,
                skip: (page - 1) * take,
                include: {
                    ProductImage: {
                        take: 2,
                        select: {
                            url: true,
                        }
                    }
                },
                where: {
                    gender: gender as Gender
                }
            });
        //2. Getting the total of pages
        //todo:
        const tatalCount = gender === '' ?
            await prisma.product.count({})
            :
            await prisma.product.count({
                where: {
                    gender: gender as Gender
                }
            })
            ;

        const totalPages = Math.ceil(tatalCount / take);

        return {
            currentPage: page,
            totalPages: totalPages,
            products:
                products.map(product => ({
                    ...product,
                    images: product.ProductImage.map(image => image.url)
                }))
        }
        // console.log(products);
    } catch (error) {
        throw new Error("It couldn't load products.")
    }
}