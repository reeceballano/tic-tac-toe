<template>
    <div class="toggle">
        <!-- Toggle Button -->
        <label for="toogleA" class="flex items-center cursor-pointer">
            <!-- toggle -->
            <div class="relative">
                <!-- input -->
                <input id="toogleA" @change="toggle" type="checkbox" class="hidden" />
                <!-- line -->
                <div class="toggle__line w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                <!-- dot -->
                <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
            </div>
            <!-- label -->
            <div class="ml-3 text-gray-700 font-medium">
                Play with AI
            </div>
        </label>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "Toggle",

    setup(props, { emit }) {
        const status = ref(false);

        const toggle = () => {
            status.value = !status.value;
            emit('toggle', status.value);
        }

        return {
            toggle,
            status,
        }
    }
}
</script>

<style lang="scss" scoped>
    .toggle__dot {
        top: -.25rem;
        left: -.25rem;
        transition: all 0.3s ease-in-out;
    }

    input:checked ~ .toggle__dot {
        transform: translateX(100%);
        background-color: #2564eb;
    }
</style>