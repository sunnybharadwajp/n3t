import { writable } from "svelte/store";

let dimension = writable(3);
let board = writable([]);
let currentTurn = writable("X");
let winner = writable(null);
let winRule = writable(3);
let winCondition = writable(3);
let multiplayer = writable(true);
let players = writable(2);

export {
   dimension,
   winRule,
   board,
   currentTurn,
   winner,
   winCondition,
   multiplayer,
   players,
};
