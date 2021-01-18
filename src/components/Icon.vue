<template>
    <font-awesome-icon :icon="icon" :class="styles" />
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircle, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';

library.add(faCircle, faTimes, faHome)

export default {
    name: 'Icon',
    props: {
        icon: {
            type: String,
            default: 'home'
        },

        styles: {
            type: Array,
            default: () => []
        }
    },
    components: {
        FontAwesomeIcon
    }
}
</script>