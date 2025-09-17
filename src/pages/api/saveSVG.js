import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // adapte l'URL si besoin

export const POST = async ({ request }) => {
    const { name, code } = await request.json();
    try {
        // Remplace 'svg' par le nom exact de ta collection PocketBase
        const record = await pb.collection('SVG').create({ name, code });
        return new Response(JSON.stringify({ success: true, id: record.id }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
};