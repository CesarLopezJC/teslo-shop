import { QuantitySelector } from '@/components';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Title } from '../../../components/ui/title/Title';
import { initialData } from '../../../seed/seed';


const prodcutsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
    initialData.products[4],
]

export default function Cart() {
    // redirect('/empty')

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
                        {
                            prodcutsInCart.map(product => (
                                <div key={product.slug} className=' flex mb-4' >
                                    <Image
                                        src={`/products/${product.images[0]}`}
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
                                        <p>{product.title}</p>
                                        <p>${product.price}</p>
                                        <QuantitySelector quantity={3} />

                                        <button className='underline mt-3'>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout */}
                    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
                        <h2 className='text-2xl mb-2'>Purchease Resum</h2>


                        <div className='grid grid-cols-2'>
                            <span> No. Products</span>
                            <span className='text-right'>5 items</span>

                            <span>Subtotal</span>
                            <span className='text-right'>$100</span>

                            <span>Taxes (16%)</span>
                            <span className='text-right'>$100</span>

                            <span className='mt-5 text-2xl'>Total:</span>
                            <span className='mt-5 text-2xl text-right'>$100</span>

                        </div>

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