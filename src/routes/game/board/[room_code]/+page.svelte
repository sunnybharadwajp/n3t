<script>
   import Pusher from "pusher-js";
   import { onMount, onDestroy } from "svelte";
   import { gameState } from "$lib/game_store";

   export let data;

   Pusher.log = null;

   let pusher = new Pusher(data.env.PUSHER_KEY, {
      cluster: data.env.CLUSTER,
   });

   let channel = pusher.subscribe(data.room_code);

   channel.bind("pusher:subscription_succeeded", () => {
      console.log("Successfully subscribed to the channel.");
   });

   channel.bind("game-started", function (data) {
      //
   });

   channel.bind("joined-room", function (data) {
      console.log("joined-room", data);

      gameState.update((state) => {
         state.players.push(data);
         return state;
      });

      fetch("/api/share_state", {
         method: "POST",
         body: JSON.stringify($gameState),
      });
   });

   channel.bind("state-shared", function (data) {
      gameState.set(data);
      console.log($gameState);
   });

   const setupBoard = (dimension) => {};

   const startGame = async () => {};

   onMount(() => {});

   onDestroy(() => {
      pusher.unsubscribe(data.room_code);
      pusher.disconnect();
   });
</script>

<h1>{data.room_code}</h1>

<div
   class="board"
   style={`grid-template-columns: repeat(${$gameState.dimension}, 40px); grid-template-rows: repeat(${$gameState.dimension}, 40px);`}
>
   {#each $gameState.board as row}
      {#each row as cell}
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <!-- svelte-ignore missing-declaration -->
         <!-- svelte-ignore a11y-no-static-element-interactions -->
         <div class="cell" on:click={() => {}}>
            {#if cell.value}
               {cell.value}
            {/if}
         </div>
      {/each}
   {/each}
</div>

<!-- {#if $winner}
    <div class="winner">Winner: {$winner}</div>
{/if} -->

<style>
   .board {
      display: grid;
      gap: 1px;
   }
   .cell {
      border: 1px solid #ccc;
      width: 40px;
      height: 40px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .cell:hover {
      background-color: #ccc;
      cursor: pointer;
   }
</style>
