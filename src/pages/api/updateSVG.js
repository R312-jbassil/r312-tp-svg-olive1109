import pb from '../../utils/pb';
import { Collections } from '../../utils/pocketbase-types';

export async function POST({ request }) {
    const { id, code_svg, chat_history } = await request.json();
    try {
        await pb.collection(Collections.SVG_History).update(id, {
            code_svg,
            chat_history,
        });
        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
}