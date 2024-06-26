'use server';
import { auth } from "@/auth"
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe estar auntenticado',
        }
    }

    const users = await prisma.user.findMany({
        orderBy: {
            name: 'desc'
        }
    });


    return {
        ok: true,
        users: users,
    }

}