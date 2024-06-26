'use client';
import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ProductImage } from '../../../../components/product/product-image/ProductImage';

export const ProductsInCart = () => {
    const removeProduct = useCartStore(state => state.removeProduct);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const [loading, setLoading] = useState(false);
    const prodcutsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoading(true);
    }, []);


    if (!loading) {
        return <p>Loading...</p>
    }



    return (
        <>
            {
                prodcutsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className=' flex mb-4' >
                        <ProductImage
                            src={`${product.image}`}
                            alt={product.title}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            className='mr-5 rounded'
                        />

                        <div>
                            <Link
                                className='hover:underline cursor-pointer'
                                href={`/product/${product.slug}`}>
                                {product.title}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
                            />

                            <button className='underline mt-3 cursor-pointer' onClick={() => removeProduct(product)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
