import { PUSHER_KEY, CLUSTER } from "$env/static/private";

export async function load({ params, fetch, url }) {
   const room_code = params.room_code;
   const userId = url.searchParams.get("user_id");

   return {
      env: {
         PUSHER_KEY,
         CLUSTER,
      },
      room_code,
   };
}
