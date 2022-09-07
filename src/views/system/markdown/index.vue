<script setup lang="ts">
import { ref, reactive, inject } from "vue";

import MdEditor from "../../../components/MdEditor.vue";

const text = ref('markdown编辑器');

const markdown = ref();

const getMarkdown = () => {
  console.log('getMarkdown => ', markdown.value.getMarkdown());

  window.alert(markdown.value.getMarkdown());
}

const getHtml = () => {
  console.log('getHtml => ', markdown.value.getHtml());

  window.alert(markdown.value.getHtml());
}

</script>

<template>
  <MdEditor :text="text" ref="markdown"></MdEditor>

  <div class="mt-3">
    <el-button type="primary" @click="getMarkdown">getMarkdown</el-button>
    <el-button type="primary" @click="getHtml">getHtml</el-button>
  </div>
</template>

<style scoped>
</style>
