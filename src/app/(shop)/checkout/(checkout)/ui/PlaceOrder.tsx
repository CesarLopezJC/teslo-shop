'use client';
import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useEffect } from 'react';

export const PlaceOrder = () => {
    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const address = useAddressStore((state) => state.address);

    const getSummaryInformation = useCartStore(state => state.getSummaryInformation());
    const { subTotal, tax, itemsInCart, total } = getSummaryInformation;

    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);



    useEffect(() => {
        if (!loaded)
            setLoaded(true);
    }, [loaded]);


    if (!loaded) {
        return <p>Loading...</p>
    }
    console.log('isPlacingOrder: ' + !isPlacingOrder);
    console.log('loaded: ' + loaded);
    console.log('cart.length === 0: ' + (cart.length === 0));
    console.log('result: ' + (cart.length === 0 && loaded && !isPlacingOrder));
    if (cart.length === 0 && loaded && !isPlacingOrder)
        redirect('/empty');
    // console.log('passes');


    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);

        const productToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }));

        // console.log(address, productToOrder);

        const resp = await placeOrder(productToOrder, address);

        if (resp.ok === false) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }

        // Every thing is ok
        clearCart();

        // console.log('/orders/' + resp.order?.id);

        router.replace('/orders/' + resp.order?.id);

        // console.log({ resp });
    }


    return (
        <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl mb-2'>Dirección de Entrega</h2>
            <div className='mb-10'>
                <p>{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>Pc {address.postalCode}</p>
                <p>{address.city}, {address.country}</p>
                <p>Tel. {address.phone}</p>
            </div>


            {/* Divider */}
            <div
                className='w-full h-0.5 rounded bg-gray-200 mb-10'
            />



            <h2 className='text-2xl mb-2'>Purchease Resum</h2>

            <div className='grid grid-cols-2'>
                <span> No. Products</span>
                <span className='text-right'>{itemsInCart === 1 ? '1 item' : `${itemsInCart} items`}</span>

                <span>Subtotal</span>
                <span className='text-right'>{currencyFormat(subTotal)}</span>

                <span>Taxes (16%)</span>
                <span className='text-right'>{currencyFormat(tax)}</span>

                <span className='mt-5 text-2xl'>Total:</span>
                <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>

            </div>

            <div className='mt-5 mb-2 w-full'>

                <p className="mb-5">
                    {/* Disclaimer */}
                    <span className="text-xs">
                        Al hacer clic en Colocar orden, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                    </span>
                </p>

                <p className='text-red-500 mb-3'>{errorMessage}</p>

                <button
                    disabled={isPlacingOrder}
                    className={clsx({
                        'flex justify-center': true,
                        'btn-primary': !isPlacingOrder,
                        'btn-disabled': isPlacingOrder,
                    })}
                    onClick={() => onPlaceOrder()}
                // href='/orders/123'
                >
                    Colocar Orden
                </button>

            </div>
        </div >
    )
}
