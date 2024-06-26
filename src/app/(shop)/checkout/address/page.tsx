import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/auth';
import { Title } from '@/components';
import Link from 'next/link';
import AddressForm from './ui/AddressForm';

export default async function Address() {
    const countries = await getCountries();
    const session = await auth();

    if (!session?.user) {
        return (
            <h3 className='text-5xl'>500 - There isn&apos;t a session</h3>
        )
    }

    const address = await getUserAddress(session.user.id);

    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">


            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

                <Title title="Dirección" subtitle="Dirección de entrega" />

                <AddressForm countries={countries} userId={session?.user.id} userStoredAddress={address} />
            </div>


        </div>
    );
}