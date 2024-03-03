<template>
    <div class="row row-cols-3 position-relative">
        <template v-if="!items.length">
            <ProductPlaceholder />
            <ProductPlaceholder />
            <ProductPlaceholder />
        </template>
        <div v-else v-for="item in items" :key="item.id" class="mb-4">
            <Product :product="item" />
        </div>
    </div>
    <div v-if="items.length" class="row justify-content-between mt-4">
        <Pagination
            :current-page="page"
            :perPage="maxItems"
            :totalPages="maxPages"
            @pageChanged="(p) => onPageChange(p)"
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

const { get } = useAPI();
const items: Ref<ProductType[]> = ref([]);
const maxPages: Ref<number> = ref(0);

const page: Ref<number> = ref(1);
const maxItems: Ref<number> = ref(5);

onMounted(() => {
    fetchData();
});
const fetchData = async () => {
    try {
        const { items: fetchedItems, maxPages: fetchedMaxPages } = await get({
            page: page.value,
            size: maxItems.value,
        });

        maxPages.value = fetchedMaxPages;
        items.value = fetchedItems;
    } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
    }
};

const onPageChange = (p: number) => {
    page.value = p;
    fetchData();
};

const onMaxItemsChange = (val: number) => {
    maxItems.value = val;
    page.value = 1;
    fetchData();
};
</script>
