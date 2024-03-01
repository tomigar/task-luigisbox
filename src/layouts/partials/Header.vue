<template>
    <div>
        <header>
            <nav>
                <ul>
                    <li v-for="item in items">
                        <RouterLink
                            :to="(item.route as string)"
                            class=""
                            :class="{
                                selected: selected === item.route,
                            }"
                            @click="selected = item.route"
                        >
                            <span>
                                {{ item.label }}
                            </span>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const selected = ref(window.location.pathname);

interface HeaderItem {
    label: string;
    route: string;
}
const items = ref([
    {
        label: "Data",
        route: "data-loading",
    },
    {
        label: "Grid",
        route: "/grid",
    },
] as HeaderItem[]);
</script>

<style scoped>
header {
    padding: 1rem;
}

nav ul {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

nav ul li {
    list-style: none;
}
a {
    text-decoration: none;
    color: #000;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s;
    background-color: gray;
}
.selected {
    color: white;
    background-color: rgba(128, 128, 128, 0.518);
    transition: all 0.3s;
}
</style>
