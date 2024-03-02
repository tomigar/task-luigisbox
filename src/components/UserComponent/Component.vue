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
        <div :style="{ border: inputData ? '0px' : '0px' }">
            <component :is="component"></component></div
    ></XTemplate>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { createApp, defineComponent } from "vue/dist/vue.esm-bundler.js";

const htmlContent = ref("");
const data = ref("{}");

let component = defineComponent({
    template: "<template><h1>hi</h1></template>",
});

const inputData = ref(false);

const draw = () => {
    component = defineComponent({
        template: `${htmlContent.value}`,
        data: () => JSON.parse(data.value),
    });

    inputData.value = !inputData.value;
};
</script>
