<template>
    <div class="home">
        <div class="container my-5">
            <h2 class="text-red-500 text-center">Tic-Tac-Toe</h2>
            <span v-if="gameActive">Current Player: {{ currentPlayer }}</span> <br />
            Game State: {{ gameState }} <br />
            <span v-if="!gameActive">Winner: {{ winner }}</span>
            <div class="game-wrapper w-1/2 m-auto my-10">
                <Board />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import Board from '@/components/Board';
import { useStore } from 'vuex';

export default {
    name: 'Home',
    components: {
        Board
    },

    setup() {
        const store = useStore();

        const currentPlayer = computed(() => {
            return store.getters['game/getCurrentPlayer'];
        })

        const playerX = ref(computed(() => {
            return store.getters['game/getPlayerXStat'];
        }))

        const playerO = ref(computed(() => {
            return store.getters['game/getPlayerOStat'];
        }))

        const gameState = computed(() => {
            return store.getters['game/getGameState'];
        })

        const winner = computed(() => {
            return store.getters['game/getWinner'];
        })

        const gameActive = computed(() => {
            return store.getters['game/getGameActive'];
        })

        return {
            currentPlayer,
            playerX,
            playerO,
            gameState,
            winner,
            gameActive
        }
    }

}
</script>
