<template>
    <ul class="pagination">
        <li class="pagination-item">
            <button type="button" @click="firstPage" class="btn">First</button>
        </li>

        <li class="pagination-item">
            <button type="button" @click="previousPage" class="btn">
                Previous
            </button>
        </li>

        <li v-for="page in pages" :key="page.name" class="pagination-item">
            <button
                type="button"
                :disabled="page.isDisabled"
                @click="setPage(page.name)"
                class="btn"
                :class="{ 'btn-primary': isPageActive(page.name) }"
            >
                {{ page.name }}
            </button>
        </li>

        <li class="pagination-item">
            <button type="button" @click="nextPage" class="btn">Next</button>
        </li>

        <li class="pagination-item">
            <button type="button" @click="lastPage" class="btn">Last</button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
const emit = defineEmits(["pagechanged"]);
const props = defineProps({
    maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3,
    },
    totalPages: {
        type: Number,
        required: true,
    },
    perPage: {
        type: Number,
        required: true,
    },
    currentPage: {
        type: Number,
        required: true,
    },
});

const startPage = computed(() => {
    if (props.currentPage === props.totalPages) {
        const start = props.totalPages - (props.maxVisibleButtons - 1);

        if (start === 0) {
            return 1;
        } else {
            return start;
        }
    }

    if (props.currentPage === 1) {
        return 1;
    }
    return 1;
});

// Compute the pages range
const pages = computed(() => {
    const range = [];

    for (
        let i = startPage.value;
        i <=
        Math.min(
            startPage.value + props.maxVisibleButtons - 1,
            props.totalPages
        );
        i++
    ) {
        range.push({
            name: i,
            isDisabled: i === props.currentPage,
        });
    }

    return range;
});

const firstPage = () => emit("pagechanged", 1);
const previousPage = () => emit("pagechanged", props.currentPage - 1);
const setPage = (page: number) => emit("pagechanged", page);
const nextPage = () => emit("pagechanged", props.currentPage + 1);
const lastPage = () => emit("pagechanged", props.totalPages);
const isPageActive = (page: number) => {
    return props.currentPage === page;
};
</script>
<style scoped>
.pagination {
    list-style-type: none;
}

.pagination-item {
    display: inline-block;
}

.active {
    background-color: #4aae9b;
    color: #ffffff;
}
</style>
