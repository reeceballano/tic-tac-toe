<template>
    <div class="col-span-1 border relative">
        <div 
            v-if="markCell.length === 0 && gameActive"
            class="cursor-pointer top-0 left-0 flex items-center justify-center w-full h-32" 
            @click.prevent="playerClick(), addNumber(cell)"
        >
            {{ markCell }}
        </div>

        <div v-else class="cursor-pointer top-0 left-0 flex items-center justify-center w-full h-32">
            {{ markCell }}
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "Cell",
    props: {
        cell: {
            type: Number
        }
    },

    setup() {
        const store = useStore();

        let currentPlayer = ref(computed(() => {
            return store.getters['game/getCurrentPlayer'];
        }))

        let markCell = ref('');

        const playerClick = () => {
            switch(currentPlayer.value) {
                case 'X':
                    store.dispatch('game/playerTurn', 'X')
                    markCell.value = currentPlayer.value;
                    setTimeout(() => {
                        store.dispatch('game/playerTurn', 'O')
                    }, 1)
                    break;

                case 'O':
                    store.dispatch('game/playerTurn', 'O')
                    markCell.value = currentPlayer.value;
                    setTimeout(() => {
                        store.dispatch('game/playerTurn', 'X')
                    }, 1)
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

        return {
            playerClick,
            markCell,
            currentPlayer,
            addNumber,
            gameActive
        }
    }
}
</script>

<style lang="scss" scoped>

</style>