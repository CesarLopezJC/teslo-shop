'use server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (id: string, role: string) => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe estar auntenticado',
        }
    }



    try {
        const newRole = role === 'admin' ? 'admin' : 'user';

        const change = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                role: newRole
            }
        });

        revalidatePath('/admin/users');

        return {
            ok: true,
            change: change,
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Could not execute the change, check the logs'
        }
    }
}