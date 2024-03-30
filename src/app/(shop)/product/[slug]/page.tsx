import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { ProductMobileSlideshow2 } from "@/components/product/slideshow/ProductMobileSlideshow2";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from 'next/navigation';

interface Props {
    params: {
        slug: string;
    }
}

export default function ({ params }: Props) {
    const { slug } = params;
    const product = initialData.products.find(product => product.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

            <div className="col-span-1 md:col-span-2">

                {/* Mobile Slideshow */}
                <ProductMobileSlideshow2 className="block md:hidden" />
                {/* <ProductMobileSlideshow
                    className="block md:hidden"
                    title={product.title}
                    images={product.images}
                /> */}
                {/* Desktop Slideshow */}
                <ProductSlideshow
                    className="hidden md:block"
                    title={product.title}
                    images={product.images}
                />

            </div>


            {/* Details */}
            <div className="col-span-1 px-5|">
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5">${product.price.toFixed(2)}</p>


                {/* Sizes Selector */}
                <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />

                {/* Quantity Selector */}
                <QuantitySelector quantity={2} />

                {/* Button */}
                <button className="btn-primary my-5">
                    Add to cart
                </button>

                {/* Description */}
                <h3 className="font-bold text-sm">Description</h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>
        </div>
    );
}