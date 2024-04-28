'use server';

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

export const resgisterUser = async (name: string, email: string, password: string) => {
    try {

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });



        return {
            ok: true,
            user: user,
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Could not create Account..."
        }
    }
}


