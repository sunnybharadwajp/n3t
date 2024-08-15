import { writable } from "svelte/store";

export const gameState = writable({
   players: [],
   currentPlayer: 0,
   winner: null,
   dimension: 3,
   winCondition: 3,
   board: [],
   roomCode: "",
});
