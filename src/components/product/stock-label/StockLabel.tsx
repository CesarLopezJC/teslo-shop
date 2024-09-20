'use client';
import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';


interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStock = async () => {
            const stockFull = await getStockBySlug(slug);
            setStock(stockFull);
            setIsLoading(false);
        }

        getStock();
    }, [slug]);




    return (
        <>

            {
                isLoading ?
                    //Skeleton
                    <h1 className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-100 animate-pulse`}>
                        &nbsp;
                    </h1>
                    :
                    <h1 className={` ${titleFont.className} antialiased font-bold text-lg`}>
                        Stock: {stock}
                    </h1>

            }
        </>

    )
}
