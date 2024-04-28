import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CheckoutLayout({ children }: {
    children: React.ReactNode;
}) {

    // const session = await auth();

    // if (!session?.user) {
    //     // redirect('/auth/login?returnTo=/profile');
    //     redirect('/auth/login?redirecto=/checkout/address');
    // }
    // console.log("hola");
    return (
        <>
            {children}
        </>
    );
}