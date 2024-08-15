import { PUSHER_KEY, CLUSTER } from "$env/static/private";

export function load({ url }) {
   const dimension = url.searchParams.get("dimension");
   const winCondition = url.searchParams.get("winCondition");

   return {
      dimension,
      winCondition,
      env: {
         PUSHER_KEY,
         CLUSTER,
      },
   };
}
