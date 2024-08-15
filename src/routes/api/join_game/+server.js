import { json } from "@sveltejs/kit";
import pusher from "$lib/pusher_server";

export async function POST({ request }) {
   try {
      const payload = await request.json();

      pusher.trigger(payload.roomCode, "joined-room", payload.userId);

      return json({
         status: 200,
         body: {},
      });
   } catch (error) {
      return json({
         status: 500,
         body: {
            error: error.message,
         },
      });
   }
}
