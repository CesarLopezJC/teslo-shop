import Link from 'next/link';
import { Title } from '../../../components/ui/title/Title';
import { OrderSummary } from '../product/[slug]/ui/OrderSummary';
import { ProductsInCart } from './ui/ProductsInCart';

export default function Cart() {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">

                <Title title='Cart' />

                <div className='grid grid-cols-1 sm:grid-cols-2 gab-10'>

                    {/* Cart */}
                    <div className='flex flex-col mt-5'>
                        <span className='text-xl'>Add more items</span>
                        <Link href="/" className='underline mb-5' >
                            Continue shopping
                        </Link>

                        {/* Items */}
                        <ProductsInCart />
                    </div>

                    {/* Checkout */}
                    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
                        <h2 className='text-2xl mb-2'>Purchease Resum</h2>


                        <OrderSummary />

                        <div className='mt-5 mb-2 w-full'>
                            <Link
                                className='flex btn-primary justify-center'
                                href='/checkout/address'>
                                Checkout
                            </Link>

                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}