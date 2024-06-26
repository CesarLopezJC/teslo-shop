import prisma from "@/lib/prisma"

export const getCategories = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return categories;

}