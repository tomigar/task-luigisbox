<template>
    <div class="row row-cols-3 position-relative">
        <template v-if="!items.length">
            <ProductPlaceholder />
            <ProductPlaceholder />
            <ProductPlaceholder />
        </template>
        <div v-else v-for="item in items" :key="item.id">
            <Product :product="item" />
        </div>
    </div>
    <div class="row justify-content-between mt-4">
        <Pagination
            :current-page="page"
            :perPage="maxItems"
            :totalPages="totalItems / maxItems"
            @pagechanged="(p) => onPageChange(p)"
            class="col-4"
        />
        <div class="col-2">
            <MaxItemsSelector
                :maxItems="maxItems"
                @onChange="(val: number) => onMaxItemsChange(val)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import useAPI from "@/composables/useApi";
import { ProductType } from "@/types/Product";

import Product from "@/components/Products/Product.vue";
import ProductPlaceholder from "@/components/Products/ProductPlaceholder.vue";
import Pagination from "@/components/Products/Pagination.vue";
import MaxItemsSelector from "@/components/Products/MaxItemsSelector.vue";

const { get, itemsLength } = useAPI();
const items = ref<ProductType[]>([]);
const maxItems: Ref<number> = ref(5);
const page: Ref<number> = ref(1);
const totalItems: Ref<number> = ref(0);

onMounted(() => {
    fetchData();
});
const fetchData = async () => {
    try {
        const data = await get({ page: page.value, size: maxItems.value });
        totalItems.value = await itemsLength();
        items.value = data;
        console.log(totalItems.value / maxItems.value);
    } catch (error) {
        console.error("Error fetching data:", (error as any).message);
    }
};

const onPageChange = (p: number) => {
    page.value = p;
    fetchData();
};

const onMaxItemsChange = (val: number) => {
    maxItems.value = val;
    console.log(maxItems.value);

    fetchData();
};
</script>
