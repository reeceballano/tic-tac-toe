<template>
    <div class="board grid grid-cols-3 gap-0 relative">
        <Cell 
            v-for="(cell, i) in 9" 
            :key="i"
            :cell="i"
        >
        </Cell>
    </div>
</template>

<script>
import Cell from '@/components/Cell';

export default {
    name: "Board",
    components: {
        Cell,
    },


}
</script>

<style lang="scss" scoped>

</style>