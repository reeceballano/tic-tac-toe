<template>
    <div class="col-span-1 border relative">
        <div 
            v-if="gameActive"
            class="game-cell" 
            @click.prevent="playerClick(), addNumber(cell)"
        >
            <Icon v-if="playerIcon === 'circle'" icon="circle" :styles="['text-red-500']" /> 
            <Icon v-if="playerIcon === 'times'" icon="times" :styles="['text-gray-800']" />
        </div>

        <div v-else class="game-cell">
            <Icon v-if="playerIcon === 'circle'" icon="circle" :styles="['text-red-500']" /> 
            <Icon v-if="playerIcon === 'times'" icon="times" :styles="['text-gray-800']" />

            <!-- <Icon v-if="prevMoves.includes(cell) && gameState[cell] === 'O'" icon="circle" :styles="['text-green-500']" />
            <Icon v-if="prevMoves.includes(cell) && gameState[cell] === 'X'" icon="times" :styles="['text-red-500']" /> -->
            <!-- <Icon :icon="playerIcon" :styles="['text-green-500']" /> -->
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import Icon from '@/components/Icon';

export default {
    name: "Cell",
    props: {
        cell: {
            type: Number
        }
    },
    components: {
        Icon
    },

    setup(props) {
        const store = useStore();

        let currentPlayer = ref(computed(() => {
            return store.getters['game/getCurrentPlayer'];
        }))

        let markCell = ref('');

        let playerIcon = ref('');

        const playerClick = () => {
            switch(currentPlayer.value) {
                case 'X':
                    store.dispatch('game/playerTurn', 'X')
                    markCell.value = currentPlayer.value;
                    setTimeout(() => {
                        store.dispatch('game/playerTurn', 'O')
                    }, 100)
                    break;

                case 'O':
                    store.dispatch('game/playerTurn', 'O')
                    markCell.value = currentPlayer.value;
                    setTimeout(() => {
                        store.dispatch('game/playerTurn', 'X')
                    }, 100)
                    break;
            }
        }

        const addNumber = (x) => {
            const payload = {
                player: currentPlayer.value,
                cell: x
            }
            store.dispatch('game/addNumber', payload);
        }

        const gameActive = computed(() => {
            return store.getters['game/getGameActive'];
        })

        const gameState = computed(() => {
            return store.getters['game/getGameState'];
        })

        const prevMoves = computed(() => {
            return store.getters['game/getPrevMoves'];
        })

        const resetState = computed(() => {
            return store.getters['game/getresetState'];
        })

        watch(resetState, () => {
            if(resetState.value) {
                markCell.value = '';
            }
        })

        watch(gameState.value, () => {
            if(prevMoves.value.includes(props.cell) && gameState.value[props.cell] === 'O') {
                if(resetState.value) {
                    playerIcon.value = '';
                } else {
                    playerIcon.value = 'circle';
                }
            } 

            if(prevMoves.value.includes(props.cell) && gameState.value[props.cell] === 'X') {
                if(resetState.value) {
                    playerIcon.value = '';
                } else {
                    playerIcon.value = 'times';
                }
            }
        })

        return {
            playerClick,
            markCell,
            currentPlayer,
            addNumber,
            gameActive,
            resetState,
            gameState,
            prevMoves,
            playerIcon,
        }
    }
}
</script>

<style lang="scss" scoped>
    .game-cell {
        @apply hover:bg-blue-200 delay-100 transition-colors text-7xl font-extralight  cursor-pointer top-0 left-0 flex items-center justify-center w-full md:h-36 h-24;
    }
</style>