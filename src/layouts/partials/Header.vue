<template>
    <div>
        <header>
            <nav>
                <div v-for="item in items">
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
                </div>
            </nav>
        </header>
    </div>
</template>
<script setup lang="ts">
import { Ref, ref } from "vue";
import { RouterLink } from "vue-router";

const selected = ref(window.location.pathname);

interface HeaderItem {
    label: string;
    route: string;
}
const items: Ref<HeaderItem[]> = ref([
    {
        label: "Data",
        route: "/data-loading",
    },
    {
        label: "Grid",
        route: "/grid",
    },
    {
        label: "User Component",
        route: "/user-component",
    },
]);
</script>

<style scoped>
header {
    background-color: var(--primary-color);
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
}
a {
    text-decoration: none;
    font-size: larger;
    color: #000;
    padding: 10px 20px;
    transition: all 0.3s;
}
a.selected {
    color: white;
    border-bottom: 2px solid white;
    transition: all 0.3s;
}
</style>
