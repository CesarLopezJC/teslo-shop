'use server';

import prisma from "@/lib/prisma";



export const setTransactionId = async (id: string, transactionId: string) => {
    try {

        const setTransaction = await prisma.order.update({
            where: {
                id: id,
            },

            data: {
                transactionId: transactionId
            }
        });


        if (!setTransaction) {
            return {
                ok: false,
                message: 'The order doesn´t exist',
            }
        }

        console.log(setTransaction);


        return {
            ok: true,
            order: setTransaction,
        }



    } catch (error) {
        return {
            ok: false,
            message: 'There is an error with the payment',
        }
    }
};