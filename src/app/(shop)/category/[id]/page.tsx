import { Title } from "@/components";
import ProductGrid from "@/components/products/ProductGrid";
import { notFound } from "next/navigation";
import { initialData } from '../../../../seed/seed';

const seedProducts = initialData.products;

interface Props {
    params: {
        id: string;
    };
}

export default function ({ params }: Props) {

    const { id } = params;

    const products = seedProducts.filter(product => product.gender === id);

    // if (id === 'kids') {
    //     notFound();
    // }

    return (
        <>
            <Title
                title="Store"
                subtitle={`All for ${id}`}
                className="mb-2"
            />

            <ProductGrid products={products} />
        </>
    );
}