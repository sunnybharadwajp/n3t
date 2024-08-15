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

export default pusher;
