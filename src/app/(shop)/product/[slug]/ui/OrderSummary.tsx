'use client';
import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
    const [loading, setLoading] = useState(false);
    const getSummaryInformation = useCartStore(state => state.getSummaryInformation());
    const { subTotal, tax, itemsInCart, total } = getSummaryInformation;

    useEffect(() => {
        setLoading(true);
    }, []);

    if (!loading) {
        return (<p>Loading</p>)
    }

    return (
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
    )
}
