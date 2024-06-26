'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe estar auntenticado',
        }
    }

    const orders = await prisma.order.findMany({
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            }
        },
        orderBy: [{
            createdAt: 'desc',
        }]
    });

    return {
        ok: true,
        orders: orders,
    }
};
