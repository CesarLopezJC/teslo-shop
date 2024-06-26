'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const deleteProductImage = async (id: number) => {
    try {
        const deletedProduct = await prisma.productImage.delete({
            where: {
                id: id,
            },
            select: {
                product: {
                    select: {
                        slug: true,
                    }
                },
                url: true,
            }
        });

        if (deletedProduct.url.startsWith('http')) {
            const imageName = deletedProduct.url
                .split('/')
                .pop() //getting the last of the split
                ?.split('.')[0] ?? '';

            try {
                await cloudinary.uploader.destroy(imageName);
            } catch (error) {
            }
        }

        if (deletedProduct) {
            revalidatePath(`/admin/products`);
            revalidatePath(`/admin/product/${deletedProduct.product.slug}`);
            revalidatePath(`/products/${deletedProduct.product.slug}`);
        }



    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Could not delete this product.'
        }
    }




    return {
        ok: true,
    }
}