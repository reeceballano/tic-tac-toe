<template>
    {{  move.x }} <br />

    {{ isExist }} <br />

    <button class="px-10 py-3 bg-indigo-500 text-white rounded-full text-sm uppercase" @click.prevent="check">check</button>
</template>

<script>
import { inject, ref } from 'vue';

export default {
    name: 'Move',

    setup() {
        const move = inject('moves');

        const isExist = ref(false);

        const check = () => {
            const randomNum = Math.floor(Math.random() * 80);
            console.log(randomNum)
            if(move.x.includes(randomNum)) {
                isExist.value = true;
            } else {
                isExist.value = false;
            }
        }

        return {
            move,
            check,
            isExist
        }
    }
}
</script>

<style>

</style>