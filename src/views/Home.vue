<template>
    <div class="home">
        <div class="container my-5 mt-16">
            <span v-if="gameActive">Current Player: {{ currentPlayer }}</span>
            <span v-if="!gameActive">Winner: {{ winner }}</span>

            <div class="game-wrapper w-1/3 m-auto my-10">
                <Board />

                <button @click.prevent="reset" class="bg-blue-800 text-white px-5 py-3 rounded mt-14 hover:bg-blue-900 transition-colors delay-900 text-sm">Reset Game</button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
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

        const gameState = computed(() => {
            return store.getters['game/getGameState'];
        })

        const winner = computed(() => {
            return store.getters['game/getWinner'];
        })

        const gameActive = computed(() => {
            return store.getters['game/getGameActive'];
        })

        const reset = () => {
            store.dispatch('game/resetGame');
        }

        return {
            currentPlayer,
            gameState,
            winner,
            gameActive,
            reset,
        }
    }

}
</script>
