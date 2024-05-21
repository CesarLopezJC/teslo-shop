'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
    amount: number;
    orderId: string;
}

export function PaypalButton({ orderId, amount }: Props) {
    const [{ isPending }] = usePayPalScriptReducer();

    const roundedAmount = (Math.round(amount * 100)) / 100; //123.45

    if (isPending) {
        return (
            <div className="animate-pulse">
                <div className="h-10 bg-gray-300 rounded" />
                <div className="h-10 bg-gray-300 rounded mt-2" />
            </div>
        )
    }

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionId = await actions.order.create({
            purchase_units: [
                {
                    invoice_id: orderId, //this line is for avoiding to repay an order wich is paied 
                    amount: {
                        value: roundedAmount.toString(),
                    }
                }
            ]
        });

        // console.log(transactionId);

        const setTransaction = await setTransactionId(orderId, transactionId);

        // console.log(setTransaction);

        if (!setTransaction.ok) {
            throw new Error('Could update the order');
        }


        return transactionId;
    }


    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {

        const datails = await actions.order?.capture();
        if (!datails) return;

        await paypalCheckPayment(datails.id);
    }

    return (
        <>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
}
