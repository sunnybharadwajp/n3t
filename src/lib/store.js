import {writable} from "svelte/store";

let dimension = writable(3)
let board = writable([]);
let currentTurn = writable('X');
let winner = writable(null);
let winRule = writable(3);

export {
    dimension,
    winRule,
    board,
    currentTurn,
    winner
}