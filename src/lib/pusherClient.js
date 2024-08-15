import { PUSHER_KEY, CLUSTER } from "$env/static/private";

import Pusher from "pusher-js";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher(PUSHER_KEY, {
   cluster: CLUSTER,
});

export default pusher;
