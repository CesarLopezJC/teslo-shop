'use server';

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { collectAppConfig } from "next/dist/build/utils";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
    // console.log(paypalTransactionId);

    const authToken = await getPayPalBearerToken();

    // console.log(authToken);

    if (!authToken) {
        return {
            ok: false,
            message: 'Could not get the token',
        }
    }

    const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

    if (!resp) {
        return {
            ok: false,
            message: 'Could not verify the payment',
        }
    }

    const { status, purchase_units } = resp;
    const { invoice_id: orderId } = purchase_units[0]; // to define a variable with diferent name

    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: `It hasn't been paid yet`,
        }
    }

    // Todo: change the state in the db 
    console.log(status, purchase_units);



    try {

        await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        });

        revalidatePath(`/orders/${orderId}`); //this reloads the page

        return {
            ok: true,
        }


        // Todo: Revalidate a path
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: '500 - Could not done the payment ',
        }
    }


}


const getPayPalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';




    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        'utf-8'
    ).toString('base64');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
        "Authorization",
        `Basic ${base64Token}`
    );

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };


    try {
        const result = await fetch(oauth2Url, {
            ...requestOptions,
            cache: 'no-store',
        }).then(r => r.json());

        return result.access_token;


    } catch (error) {
        console.log(error);
        return null;
    }

}



const verifyPayPalPayment = async (paypalTransactionId: string, bearerToken: string):
    Promise<PayPalOrderStatusResponse | null> => {
    const paypalOrdersUrl = process.env.PAYPAL_ORDERS_URL ?? '';

    var myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        `Bearer ${bearerToken}`
    );

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    try {
        const orderStatus = await fetch(`${paypalOrdersUrl}/${paypalTransactionId}`, {
            ...requestOptions,
            cache: 'no-store',
        }).then(res => res.json());
        return orderStatus;
    } catch (error) {
        console.log(error);
        return null;
    }
}