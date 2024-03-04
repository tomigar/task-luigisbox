<template>
    <div class="d-flex gap-4">
        <div>
            <h3>template:</h3>
            <textarea v-model="htmlContent" style="height: 300px; width: 300px">
            </textarea>
        </div>
        <div>
            <h3>data:</h3>
            <textarea v-model="data" style="height: 300px; width: 300px">
            </textarea>
        </div>
        <div>
            <h3>result:</h3>
            <XTemplate>
                <component :is="component" :key="key"></component>
            </XTemplate>
        </div>
    </div>
    <button class="" @click="draw">Draw</button>
</template>

<script setup lang="ts">
import { DefineComponent, Ref, ref } from "vue";
/* @ts-ignore */
import { defineComponent } from "vue/dist/vue.esm-bundler.js";

const htmlContent: Ref<string> = ref("");
const data: Ref<string> = ref("{}");

let component: DefineComponent = defineComponent({
    template: "<template><h1>hi</h1></template>",
});

const key: Ref<number> = ref(0);

const draw = () => {
    component = defineComponent({
        template: `${htmlContent.value}`,
        data: () => JSON.parse(data.value),
    });

    key.value++;
};
</script>
