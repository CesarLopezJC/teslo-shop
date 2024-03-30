import { Product } from "@/interfaces"
import ProductGridItem from "./ProductGridItem";

interface Props {
    products: Product[];
}
export default function ProductGrid({ products }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
            {
                products.map(products => (
                    <ProductGridItem key={products.slug} product={products} />
                ))
            }
        </div>
    )
}
