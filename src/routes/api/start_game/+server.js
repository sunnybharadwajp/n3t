import { json } from "@sveltejs/kit";
import Pusher from "pusher";
import {
   APP_ID,
   CLUSTER,
   PUSHER_KEY,
   SECRET,
   USE_TLS,
} from "$env/static/private";

const pusher = new Pusher({
   appId: APP_ID,
   key: PUSHER_KEY,
   secret: SECRET,
   cluster: CLUSTER,
   useTLS: USE_TLS,
});

export async function POST({ request }) {
   try {
      const payload = await request.json();

      // pusher.trigger(payload.roomCode, 'game-started', payload);
      console.log("payload", payload);

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
