<script>
   import { onMount, onDestroy } from "svelte";
   import {
      board,
      currentTurn,
      winner,
      multiplayer,
      players,
   } from "$lib/store";
   import Pusher from "pusher-js";

   export let data;
   const env = data.env;
   const dimension = data.dimension;
   const winCondition = data.winCondition;

   let gameMode, currentPlayer;
   gameMode = $multiplayer ? "multiplayer" : "singleplayer";

   onMount(() => {
      board.set(createBoard(dimension));
   });

   // Pusher.logToConsole = true;

   let pusher = new Pusher(data.env.PUSHER_KEY, {
      cluster: data.env.CLUSTER,
   });

   let channel = pusher.subscribe("demo");

   channel.bind("move-made", function (data) {
      console.log("pusher heard it!");
   });

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

   const makeMove = (cell, turn) => {
      const response = fetch("/api/make_move", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            roomCode: "demo",
            cell: cell,
            player: currentPlayer,
         }),
      });

      // if($currentTurn === 'X') {
      //     currentTurn.set('O');
      // } else {
      //     currentTurn.set('X');
      // }

      // if (cell.value === null && !$winner) {
      //     cell.value = turn;
      //     board.update((b) => b);
      //     if (checkWinner(cell, turn)) {
      //         winner.set(turn);
      //     } else {
      //         currentTurn.set(turn === 'X' ? 'O' : 'X');
      //     }
      // }
   };

   const checkWinner = (cell, turn) => {
      return (
         checkDirection(cell, turn, 1, 0) || // Horizontal
         checkDirection(cell, turn, 0, 1) || // Vertical
         checkDirection(cell, turn, 1, 1) || // Diagonal \
         checkDirection(cell, turn, 1, -1)
      ); // Diagonal /
   };

   const checkDirection = (cell, turn, dx, dy) => {
      let count = 1;
      count += countInDirection(cell, turn, dx, dy);
      count += countInDirection(cell, turn, -dx, -dy);
      return count >= winCondition;
   };

   const countInDirection = (cell, turn, dx, dy) => {
      let count = 0;
      let x = cell.x + dx;
      let y = cell.y + dy;
      while (x >= 0 && x < dimension && y >= 0 && y < dimension) {
         const currentCell = $board[x][y];
         if (currentCell === undefined || currentCell.value !== turn) {
            break;
         }
         count++;
         x += dx;
         y += dy;
      }
      return count;
   };

   onDestroy(() => {
      pusher.unsubscribe("demo");
      pusher.disconnect();
   });
</script>

<div
   class="board"
   style={`grid-template-columns: repeat(${dimension}, 40px); grid-template-rows: repeat(${dimension}, 40px);`}
>
   {#each $board as row}
      {#each row as cell}
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <!-- svelte-ignore missing-declaration -->
         <!-- svelte-ignore a11y-no-static-element-interactions -->
         <div class="cell" on:click={() => makeMove(cell, $currentTurn)}>
            {#if cell.value}
               {cell.value}
            {/if}
         </div>
      {/each}
   {/each}
</div>

{#if $winner}
   <div class="winner">Winner: {$winner}</div>
{/if}

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
