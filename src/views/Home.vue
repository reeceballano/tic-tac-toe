<template>
    <div class="home">
        <div class="container my-5 mt-16">
            <span v-if="gameActive">Current Player: {{ currentPlayer }}</span>
            <span v-if="!gameActive">Winner: {{ winner }}</span> <br />
            {{ gameState }} <br />
            {{ prevMoves }}
            <div class="game-wrapper md:w-1/3 w-10/12 m-auto my-10">
                <Board />

                <div class="flex justify-between items-center mt-14">
                    <button @click.prevent="reset" class="bg-blue-800 text-white px-5 py-3 rounded-full hover:bg-blue-900 transition-colors delay-900 text-sm">Reset Game</button>
                    <Toggle :toggleText="opponentName" @toggle="toggle" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Board from '@/components/Board';
import Toggle from '@/components/Toggle';

export default {
    name: 'Home',
    components: {
        Board,
        Toggle
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

        const prevMoves = computed(() => {
            return store.getters['game/getPrevMoves'];
        })

        let opponentName = ref('Play with AI');

        const toggle = (x) => {
            if(x) {
                opponentName.value = 'Play with HUMAN';
            } else {
                opponentName.value = 'Play with AI';
            }

            store.dispatch('game/aiOpponent', x);
        }

        return {
            currentPlayer,
            gameState,
            winner,
            gameActive,
            reset,
            prevMoves,
            toggle,
            opponentName
        }
    }

}
</script>
