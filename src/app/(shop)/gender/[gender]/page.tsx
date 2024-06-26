import { Pagination, Title } from "@/components";
import ProductGrid from "@/components/products/ProductGrid";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { initialData } from '../../../../seed/seed';
import { Gender } from '@prisma/client';
import { getPaginatedProductsWithImages } from "@/actions";

const seedProducts = initialData.products;

interface Props {
    params: {
        gender: Gender;
    },
    searchParams: {
        page?: string;
    };
}

export default async function GenderPage({ params, searchParams }: Props) {
    const { gender } = params;

    const page = searchParams?.page ? parseInt(searchParams.page) : 1;

    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender });

    return (
        <>
            <Title
                title="Store"
                subtitle={`All for ${gender}`}
                className="mb-2"
            />

            <ProductGrid products={products} />

            <Pagination totalPages={totalPages} />
        </>
    );
}