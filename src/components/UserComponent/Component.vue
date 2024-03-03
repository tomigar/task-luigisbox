<template>
    <div>
        <textarea
            v-model="htmlContent"
            style="height: 300px; width: 300px; margin-right: 50px"
        >
        </textarea>
        <textarea v-model="data" style="height: 300px; width: 300px">
        </textarea>
    </div>
    <button @click="draw">Draw</button>
    <XTemplate>
        <component :is="component" :key="key"></component>
    </XTemplate>
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
