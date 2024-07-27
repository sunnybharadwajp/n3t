<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { dimension, winRule, board, currentTurn, winner } from '$lib/store.js';



    onMount(() => {
        updateBoard($dimension);
    });

    let currentDimension;
    let winCondition;

    $: currentDimension = $dimension;
    $: winCondition = $winRule;

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

    const updateBoard = (dimension) => {
        if (dimension) {
            currentDimension = dimension;
            board.set(createBoard(dimension));
        }
    };

    const setDimension = (e) => {
        dimension.set(e.target.value);
    };

    const setWinCondition = (e) => {
        winRule.set(e.target.value);
    };

    const makeMove = (cell, turn) => {
        if($currentTurn === 'X') {
            currentTurn.set('O');
        } else {
            currentTurn.set('X');
        }
        if (cell.value === null && !$winner) {
            cell.value = turn;
            board.update((b) => b);
            if (checkWinner(cell, turn)) {
                winner.set(turn);
            } else {
                currentTurn.set(turn === 'X' ? 'O' : 'X');
            }
        }
    };

    const checkWinner = (cell, turn) => {
        return checkDirection(cell, turn, 1, 0) || // Horizontal
            checkDirection(cell, turn, 0, 1) || // Vertical
            checkDirection(cell, turn, 1, 1) || // Diagonal \
            checkDirection(cell, turn, 1, -1);  // Diagonal /
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
        while (x >= 0 && x < currentDimension && y >= 0 && y < currentDimension) {
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

</script>


<div class="form">
    Dimension:
    <select on:change={setDimension}>
        {#each Array.from({ length: 18 }, (_, i) => i + 3) as num}
            <option value={num} >{num}</option>
        {/each}
    </select>
    Win Condition:
    <select on:change={setWinCondition}>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    <button on:click={() => updateBoard($dimension)}>Update Board</button>
</div>
<div class="spacer"></div>
<div class="board" style={`grid-template-columns: repeat(${currentDimension}, 40px); grid-template-rows: repeat(${currentDimension}, 40px);`}>
    {#each $board as row}
        {#each row as cell}
            <div class="cell" on:click={() => makeMove(cell,$currentTurn)}>
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
    .spacer {
        padding: 1rem;
    }
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