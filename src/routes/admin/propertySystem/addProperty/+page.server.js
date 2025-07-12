import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    return { user: locals.user };
}

export const actions = {
    upload: async ({ request }) => {
        const formData = await request.formData();
        const uploadedImage = formData.get('image');
        const location = formData.get('location');
        const type = formData.get('type');
        const price = formData.get('price');
        const bedrooms = formData.get('bedrooms');
        const bathrooms = formData.get('bathrooms');
        const squareFoot = formData.get('square_foot');
        const address = formData.get('address');

        if (!uploadedImage) {
            throw error(400, { message: 'No file to upload.' });
        }

        const timestamp = Date.now();
        const safeName = uploadedImage.name.replace(/\s+/g, '_');
        const uniquePath = `property_images/${timestamp}-${safeName}`;

        const { url } = await put(uniquePath, uploadedImage, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });

        const connection = await createConnection();
        await connection.execute(
            `INSERT INTO properties 
            (image, location, type, price, bedrooms, bathrooms, square_foot, address) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [url, location, type, price, bedrooms, bathrooms, squareFoot, address]
        );

        return { uploaded: url };
    }
};
