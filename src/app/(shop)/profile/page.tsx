import { Title } from "@/components";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
    const session = await auth();

    // if (!session?.user) {
    //     // redirect('/auth/login?returnTo=/profile');
    //     redirect('/auth/login');
    // }

    return (
        <div>
            <Title title="Perfil" />
            <pre>
                {
                    JSON.stringify(session, null, 2)
                }
            </pre>

            <h3 className="text-3xl mb-10">{session?.user.role}</h3>
        </div>
    );
}