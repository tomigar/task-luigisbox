<template>
    <div class="row row-cols-3">
        <template v-if="!items.length">
            <ProductPlaceholder />
            <ProductPlaceholder />
            <ProductPlaceholder />
        </template>
        <div v-else v-for="item in items" :key="item.id">
            <Product :product="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useAPI from "@/composables/useApi";
import { ProductType } from "@/types/Product";
import Product from "@/components/Products/Product.vue";
import ProductPlaceholder from "@/components/Products/ProductPlaceholder.vue";

const { get } = useAPI();
const items = ref<ProductType[]>([]);

onMounted(() => {
    fetchData();
});
const fetchData = async () => {
    try {
        const data = await get({ page: 1, size: 5 });
        console.log(data);

        items.value = data;
    } catch (error) {
        console.error("Error fetching data:", (error as any).message);
    }
};
</script>
