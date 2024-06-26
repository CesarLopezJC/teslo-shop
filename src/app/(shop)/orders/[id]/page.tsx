import { OrderStatus, PaypalButton, Title } from '@/components';
import Image from 'next/image';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';
import { getOrderBy } from '@/actions';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { currencyFormat } from '@/utils';
import { ProductImage } from '../../../../components/product/product-image/ProductImage';



interface Props {
    params: {
        id: string;
    };
}


export default async function OrdersId({ params }: Props) {

    const session = await auth();

    if (!session?.user) {
        notFound();
    }

    const { id } = params;

    const resp = await getOrderBy(id);

    const shortId = id.split('-')[4];


    // Todo: Verify
    if (!resp.ok || resp?.order?.OrderItem.length === 0 || !resp.order?.OrderAddress) {
        notFound();
    }

    //Define main variables
    const { order } = resp;

    const address = order?.OrderAddress;

    const items = order?.OrderItem;





    // redirect(/)



    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title={`Orden #${shortId}`} />


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5">

                        <OrderStatus isPaid={order.isPaid ?? false} />


                        {/* Items */}
                        {
                            items!.map(item => (

                                <div key={item.id} className="flex mb-5">
                                    <ProductImage
                                        src={`${item.product.ProductImage[0].url}`}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: '100px',
                                            height: '100px'
                                        }}
                                        alt={item.product.title}
                                        className="mr-5 rounded"
                                    />
                                    {/* {JSON.stringify(item.product.ProductImage)} */}

                                    <div>
                                        <p>{item.product.title}</p>
                                        <p>{currencyFormat(item.price)} x {item.quantity}</p>
                                        <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                                    </div>

                                </div>


                            ))
                        }
                    </div>




                    {/* Checkout - Resumen de orden */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

                        <h2 className="text-2xl mb-2">Dirección de entrega</h2>
                        <div className="mb-8">
                            <p className="text-xl">{address?.firstName} {address?.lastName}</p>
                            <p>{address?.address}</p>
                            <p>{address?.address2}</p>
                            <p>Pc {address?.postalCode}</p>
                            <p>{address?.city}, {address?.country.name}</p>
                            <p>Tel. {address?.phone}</p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-8" />


                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <div className="grid grid-cols-2">

                            <span>No. Productos</span>
                            <span className="text-right">{order!.itemsInOrder} {order!.itemsInOrder > 1 ? ('items') : ('')}</span>

                            <span>Subtotal</span>
                            <span className="text-right">{currencyFormat(order!.subTotal)}</span>

                            <span>Impuestos (16%)</span>
                            <span className="text-right">{currencyFormat(order!.tax)}</span>

                            <span className="mt-5 text-2xl">Total:</span>
                            <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>


                        </div>

                        <div className="mt-5 mb-2 w-full">

                            {order.isPaid ? (
                                <OrderStatus isPaid={order.isPaid} />
                            ) : (
                                <PaypalButton amount={order.total} orderId={order.id} />
                            )}


                            {/* <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        'bg-red-500': !order?.isPaid,
                                        'bg-green-700': order?.isPaid,
                                    }
                                )
                            }>
                                <IoCardOutline size={30} />
                                {order?.isPaid ? (
                                    <span className="mx-2">Pagada</span>
                                ) : (
                                    <span className="mx-2">Pendiente de pago</span>
                                )}
                            </div> */}

                        </div>


                    </div>



                </div>



            </div>


        </div>
    );
}