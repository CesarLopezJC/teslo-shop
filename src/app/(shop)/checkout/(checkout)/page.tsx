import Link from 'next/link';
import { Title } from '../../../../components/ui/title/Title';
import { PlaceOrder } from './ui/PlaceOrder';
import { ProductsInCart } from './ui/ProductsInCart';


export default function Checkout() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">

                <Title title='Verificar orden' />

                <div className='grid grid-cols-1 sm:grid-cols-2 gab-10'>

                    {/* Cart */}
                    <div className='flex flex-col mt-5'>
                        <Link href="/cart" className='underline mb-5' >
                            Ajustar elementos
                        </Link>

                        {/* Items */}
                        <ProductsInCart />
                    </div>

                    {/* Checkout - Order Resum*/}
                    <PlaceOrder />
                </div>

            </div>
        </div>
    );
}