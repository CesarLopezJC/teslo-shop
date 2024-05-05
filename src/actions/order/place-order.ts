'use server';

import { auth } from "@/auth";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface productToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds: productToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    // Verify user
    if (!userId) {
        return {
            ok: false,
            message: 'there is not a session',
        }
    }

    // Get product information
    // Note: Remain that we can take 2+ products with the same ID but with different size

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(product => product.productId)
            }
        }
    });


    // caculate the amont // header
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);


    // The totals of tax, subtotal and total
    const { subTotal, tax, total } = productIds.reduce((totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(p => p.id === item.productId);

        if (!product) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += (subTotal * 0.16);
        totals.total += (subTotal + (subTotal * 0.16));

        return totals;
    }, { subTotal: 0, tax: 0, total: 0 });

    // console.log({ subTotal, tax, total });

    if (products.length === 0) {
        return {
            ok: false,
            message: "The order has to have an item as minimum",
        }
    }


    try {


        // Send to database throut a transaction 
        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1- Update the stock of products
            const updatedProductsPromises = products.map(async (product) => {
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0);

                if (productQuantity === 0) {
                    throw new Error(`${product.id} doesn't have a defined quantity`);
                }

                return tx.product.update({
                    where: {
                        id: product.id,
                    },

                    data: {
                        // inStock: product.inStock - productQuantity, // shouldn't do it
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                });
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);

            // Verify negative values = there isn't stock
            updatedProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} doesn't have enough stock`);
                }
            });

            // 2- Create the order - header - details
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,

                    OrderItem: {
                        createMany: {
                            data: productIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => p.productId === product.id)?.price ?? 0,
                            }))
                        }
                    }
                }
            });


            // 3- Creatye the address of order
            const ordeAddress = await tx.orderAddress.create({
                data: {
                    orderId: order.id,
                    countryId: address.country,
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    postalCode: address.postalCode,
                    city: address.city,
                    phone: address.phone,
                }
            });

            console.log({ ordeAddress });



            return {
                order: order,
                updatedProduct: updatedProducts,
                orderAddress: ordeAddress,
            };
        });


        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
        }


    } catch (error: any) {
        return {
            ok: false,
            message: error.message,
        }
    }






    // console.log({ productIds, address });

    // console.log({ productIds, products });
}