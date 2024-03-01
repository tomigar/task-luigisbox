import { createRouter, createWebHistory } from "vue-router";
import DataLoadingView from "@/views/DataLoadingView.vue";
import GridView from "@/views/GridView.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import type { Component } from "vue";

interface Route {
    path: string;
    component: Component;
    children?: Route[];
}

const routes: Route[] = [
    {
        path: "/",
        component: MainLayout,
        children: [
            { path: "/data-loading", component: DataLoadingView },
            { path: "/grid", component: GridView },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
