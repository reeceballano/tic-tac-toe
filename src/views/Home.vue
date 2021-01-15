<template>
    <div class="home">
        <div class="container my-5 mt-16">
            <span v-if="gameActive">Current Player: {{ currentPlayer }}</span>
            <span v-if="!gameActive">Winner: {{ winner }}</span>

            <div class="game-wrapper md:w-1/3 w-10/12 m-auto my-10">
                <Board />

                <button @click.prevent="reset" class="bg-blue-800 text-white px-5 py-3 rounded-full mt-14 hover:bg-blue-900 transition-colors delay-900 text-sm">Reset Game</button>
            </div>

            <Audio class="hidden" @play="play" src="audo-1.mp3" />
            <Audio class="hidden" @play="play" src="audo-2.mp3" />
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import Board from '@/components/Board';
import { useStore } from 'vuex';
import Audio from '@/components/Audio';

export default {
    name: 'Home',
    components: {
        Board,
        Audio
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

        const play = (x) => {
            console.log('parent', x);
        }

        return {
            currentPlayer,
            gameState,
            winner,
            gameActive,
            reset,
            play
        }
    }

}
</script>
