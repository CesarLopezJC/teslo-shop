import { QuantitySelector } from '@/components';
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
    initialData.products[4],
    initialData.products[4],
    initialData.products[4],
    initialData.products[4],
]

export default function () {
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
                                        <p>${product.price.toFixed(2)} x 3</p>
                                        <p className=' font-bold'>Subtotal: ${(product.price * 3).toFixed(2)}</p>

                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout - Order Resum*/}
                    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
                        <h2 className='text-2xl mb-2'>Dirección de Entrega</h2>
                        <div className='mb-10'>
                            <p>Cesar Lopez</p>
                            <p>Av. Siempre Viva</p>
                            <p>Col. Centro</p>
                            <p>Alcandia Cuiauhtémoc</p>
                            <p>Ciudad de Mexico</p>
                            <p>Cp 25050</p>
                            <p>123.123.123</p>
                        </div>


                        {/* Divider */}
                        <div
                            className='w-full h-0.5 rounded bg-gray-200 mb-10'
                        />



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

                            <p className="mb-5">
                                {/* Disclaimer */}
                                <span className="text-xs">
                                    Al hacer clic en "Colocar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                                </span>
                            </p>

                            <Link
                                className='flex btn-primary justify-center'
                                href='/orders/123'>
                                Colocar Orden
                            </Link>

                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}