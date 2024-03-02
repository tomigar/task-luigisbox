<template>
    <div class="container d-flex flex-column align-items-center">
        <h1>Grid size: {{ currentGridSize[0] }}x{{ currentGridSize[1] }}</h1>
        <GridSelector
            :maxGridSize="[10, 10]"
            :currentGridSize="currentGridSize"
            @setSize="(val) => setSize(val)"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GridSelector from "@/components/Grid/GridSelector.vue";
const currentGridSize = ref([0, 0]);

const setSize = ([x, y]: [number, number]) => {
    currentGridSize.value = [x, y];
};
</script>

<style scoped></style>
