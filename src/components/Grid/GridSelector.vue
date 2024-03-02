<template>
    <div class="grid-selector">
        <div
            v-for="(col, colIndex) in maxGridSize[1]"
            :key="col"
            class="grid-row"
        >
            <div
                v-for="(row, rowIndex) in maxGridSize[0]"
                :key="row"
                class="grid-cell"
                :class="{
                    hovered: isHovered(rowIndex, colIndex),
                    active: isActive(rowIndex, colIndex),
                }"
                @mouseover="previewSize(row, col)"
                @click="setSize(row, col)"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
    maxGridSize: {
        type: Array,
        default: () => [10, 10],
    },
    currentGridSize: {
        type: Array,
        default: () => [0, 0],
    },
});

const emit = defineEmits(["setSize"]);

const activePreview = ref<[number, number] | null>(null);

function isHovered(row: number, col: number) {
    return (
        row < (activePreview.value ? activePreview.value[0] : 0) &&
        col < (activePreview.value ? activePreview.value[1] : 0)
    );
}
const isActive = (row: number, col: number) => {
    const [x, y]: [number, number] = props.currentGridSize as [number, number];
    return row < x && col < y;
};

function previewSize(x: number, y: number) {
    activePreview.value = [x, y];
}

function setSize(x: number, y: number) {
    emit("setSize", [x, y]);
}
</script>

<style scoped>
.grid-selector {
    display: flex;
    flex-direction: column;
}

.grid-row {
    display: flex;
}

.grid-cell {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    margin: 2px;
}

.grid-cell.hovered {
    border-color: red;
}

.grid-cell.active {
    background-color: grey;
}
</style>
