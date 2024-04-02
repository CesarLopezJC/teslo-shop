import ProductGrid from "@/components/products/ProductGrid";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { Title } from '../../components/ui/title/Title';

const products = initialData.products;

export default function Home() {
  return (
    < >
      <Title
        title="Store"
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
