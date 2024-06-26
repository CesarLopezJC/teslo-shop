import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductPage({ params }: Props) {

    const { slug } = params;

    const product = await getProductBySlug(slug);

    const categories = await getCategories();

    //todo: when it's new
    if (!product && slug != 'new') {
        redirect('/admin/products');
    }

    return (
        <div>
            <Title title={product?.title ?? 'New product'} />

            <ProductForm product={product ?? {}} categories={categories} />
        </div>
    );
}