<template>
    <div class="audio">
        <button class="bg-blue-800 rounded-full text-sm py-3 px-10 text-white" @click="play">Play {{ src }}</button>
    </div>
</template>

<script>
export default {
    name: "Audio",

    props: {
        src: {
            type: String
        }
    },

    setup(props, { emit }) {

        const play = () => {
            emit('play', props.src);
        }

        return {
            play
        }
    }
}
</script>

<style>

</style>