import pusher from "$lib/pusher_server";

export async function POST({ request }) {
   try {
      const payload = await request.json();
      console.log("here");

      pusher.trigger("demo", "move-made", payload);

      // console.log('payload', payload);

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
