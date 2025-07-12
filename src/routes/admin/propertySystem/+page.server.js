import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const connection = await createConnection();
    const [properties] = await connection.execute('SELECT * FROM properties ORDER BY id DESC');

    return { properties, user: locals.user };
}

export const actions = {
    deleteProperty: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        const connection = await createConnection();
        await connection.execute('DELETE FROM properties WHERE id = ?', [id]);
    }
};
