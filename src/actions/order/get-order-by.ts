'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getOrderBy = async (id: string, userId?: string) => {
    const session = await auth();

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: id,
                userId: userId,
            },
            include: {
                OrderAddress: {
                    include: {
                        country: true,
                    }
                },
                OrderItem: {
                    include: {
                        product: {
                            include: {
                                ProductImage: true,
                            }
                        }
                    }
                },
            }
        });

        if (!order) {
            return {
                ok: false,
                message: `The order doesn't exist`,
            }
        }

        if (session?.user.role === 'user')
            if (session.user.id != order.userId)
                return {
                    ok: false,
                    message: `The order doesn't exist`,
                }



        return {
            ok: true,
            order: order,
        }

    } catch (error) {
        return {
            ok: false,
            message: `The order doesn't exist`,
        }
    }
};