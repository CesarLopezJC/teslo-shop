export const revalidate = 0;

import { getPaginatedUsers } from '@/actions';
// https://tailwindcomponents.com/component/hoverable-table
import { Title } from '@/components';
import { UsersTable } from './ui/UsersTable';

export default async function Users() {

    const { ok, users = [] } = await getPaginatedUsers();

    let rowNumber = 1;

    return (
        <>
            <Title title="Users" />

            <div className="mb-10">
                <UsersTable users={users} />
            </div>
        </>
    );
}