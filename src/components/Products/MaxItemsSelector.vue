<template>
    <div class="dropdown">
        <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            {{ props.maxItems }}
        </button>
        <ul class="dropdown-menu">
            <li v-for="item in items" :key="item">
                <a
                    class="dropdown-item"
                    @click="$emit('onChange', item)"
                    :class="{ active: item === props.maxItems }"
                >
                    {{ item }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    maxItems: {
        type: Number,
        required: true,
    },
});
const items = [5, 10, 15, 20];
</script>

<style scoped></style>
