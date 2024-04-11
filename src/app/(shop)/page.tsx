export const revalidate = 60; // 60 seconds

import ProductGrid from "@/components/products/ProductGrid";
import { Title } from '../../components/ui/title/Title';
import { getPaginatedProductsWithImages } from '../../actions/product/product-pagination';
import { redirect } from "next/navigation";
import { Pagination } from "@/components";


interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  console.log(searchParams);

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) redirect('/');
  return (
    < >
      <Title
        title="Store"
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />
    </>
  );
}
