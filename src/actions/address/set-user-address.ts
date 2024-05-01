'use server';

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";


export const setUserAddress = async (address: Address, userId: string, remember: boolean) => {
    try {

        if (remember) {
            const newAddress = await CreateOrReplaceAddress(address, userId);

            return {
                ok: true,
                address: newAddress,
            }
        } else {
            const deleteAddress = await prisma.userAddress.delete({
                where: { userId }
            });

            return {
                ok: true,
                address: deleteAddress,
            }
        }



    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Could not save the address',
        }
    }
}


const CreateOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const { country, ...restAddress } = address;
        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId: userId
            }
        });

        const addressToSave = {
            ...restAddress,
            countryId: country
        };

        if (!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: {
                    ...addressToSave,
                    userId: userId,
                }
            });

            return newAddress;
        }


        const setAddress = await prisma.userAddress.update({
            data: {
                ...addressToSave,
            },
            where: {
                userId: userId
            }
        })

        return setAddress;


    } catch (error) {
        console.log(error);
        throw new Error('Could not save the address');
    }
}