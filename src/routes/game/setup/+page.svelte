<script>
   import { goto } from "$app/navigation";
   import { gameState } from "$lib/game_store";

   let userId = Math.floor(Math.random() * 10);
   let existingRoomCode = "";
   let dimension = 3;
   let winCondition = 3;

   const createBoard = (dimension) => {
      let board = [];
      for (let i = 0; i < dimension; i++) {
         let row = [];
         for (let j = 0; j < dimension; j++) {
            row.push({ x: i, y: j, value: null });
         }
         board.push(row);
      }
      return board;
   };

   const createGame = async () => {
      gameState.set({
         players: [userId],
         currentPlayer: userId,
         winner: null,
         dimension: dimension,
         winCondition: winCondition,
         board: createBoard(dimension),
         roomCode: Math.random().toString(36).substring(7),
      });
      goto(`/game/board/${$gameState.roomCode}`);
   };

   const joinGame = async () => {
      await fetch("/api/join_game", {
         method: "POST",
         body: JSON.stringify({
            roomCode: existingRoomCode,
            userId: userId,
         }),
      });

      goto(`/game/board/${existingRoomCode}`);
   };
</script>

<div class="form">
   <h3>Board Setup</h3>
   Dimension:
   <select bind:value={dimension}>
      {#each Array.from({ length: 18 }, (_, i) => i + 3) as num}
         <option value={num}>{num}</option>
      {/each}
   </select>
   Win Condition:
   <select bind:value={winCondition}>
      {#each Array.from({ length: 4 }, (_, i) => i + 3) as num}
         <option value={num}>{num}</option>
      {/each}
   </select>
   <button on:click={createGame}>Update Board</button>
</div>

<div class="multiplayer">
   <h3>Multiplayer</h3>
   <div class="field">
      <label
         >Enter Initial:
         <input type="text" bind:value={userId} />
      </label>
   </div>

   <div class="initiators">
      <div class="field">
         <label
            >Enter Room Code:
            <input type="text" bind:value={existingRoomCode} />
            <button on:click={joinGame}>Join Room</button>
         </label>
      </div>
      <div class="field">
         <label
            >Or Create a new room:
            <button on:click={createGame}>Create New Room</button>
         </label>
      </div>
   </div>
</div>

<style>
   .field {
      margin: 1rem 0;
   }
</style>
