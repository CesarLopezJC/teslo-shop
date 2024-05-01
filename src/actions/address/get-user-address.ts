import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
    try {
        const address = prisma.userAddress.findFirst({
            where: {
                userId: userId,
            },
        }).then(
            (user) => ({ ...user, country: user?.countryId, })
        )

        return address;
    } catch (error) {
        return {};
    }
}