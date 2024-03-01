<template>
    <div class="card">
        <img :src="product.image" :alt="product.title" class="card-img-top" />
        <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.price }}€</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ProductType } from "@/types/Product";
import { PropType } from "vue";

defineProps({
    product: {
        type: Object as PropType<ProductType>,
        required: true,
    },
});
</script>

<style scoped>
.card-img-top {
    height: 200px;
    object-fit: contain;
}
</style>
