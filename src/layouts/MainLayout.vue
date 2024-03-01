<template>
    <div>
        <Header />
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>
<script setup>
import Header from "@/layouts/partials/Header.vue";
</script>
