'use client';

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);


    const addToCart = async () => {
        setPosted(true);
        if (!size) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0],
        }

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);

        //console.log({ product, size, quantity });
    }

    return (
        <>
            {
                posted && !size && (
                    <span className="mt-2 text-red-500">
                        * Should select a size
                    </span>)
            }

            {/* Selector de Tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
            />


            {/* Selector de Cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {/* Button */}
            <button className="btn-primary my-5" onClick={() => addToCart()}>
                Agregar al carrito
            </button>
        </>
    )
}
