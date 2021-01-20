<template>
    <Move />
</template>

<script>
import { provide, reactive } from 'vue';
import Move from '@/components/Move';

export default {
    name: 'Moves',

    components: {
        Move
    },

    setup() {
        const moves = reactive({
            x: [0,1,2,3,4,5,6,7,8],
        })

        provide('moves', moves);

        return {
            moves
        }
    }
}
</script>