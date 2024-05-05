'use client';

import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const ProductsInCart = () => {
    const [loading, setLoading] = useState(false);
    const prodcutsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoading(true);

    });


    if (!loading) {
        return <p>Loading...</p>
    }




    return (
        <>
            {
                prodcutsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className=' flex mb-4' >
                        < Image
                            src={`/products/${product.image}`}
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
                            <span >
                                {product.size} - {product.title} ({product.quantity})
                            </span>

                            <p className='font-bold'>{currencyFormat(product.price * product.quantity)}</p>

                        </div>
                    </div>
                ))
            }
        </>
    )
}
