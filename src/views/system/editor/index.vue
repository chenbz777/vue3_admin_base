<script setup lang="ts">
import { ref, reactive, inject } from "vue";

import WangEditor from "../../../components/WangEditor.vue";

const defaultHtml = ref('<h3>富文本编辑器</h3>');

const wangEditor = ref();

const getHtml = () => {
  console.log('getHtml => ', wangEditor.value.getHtml());

  window.alert(wangEditor.value.getHtml());
}

</script>

<template>
  <WangEditor :defaultHtml="defaultHtml" ref="wangEditor"></WangEditor>

  <div class="mt-3">
    <el-button type="primary" @click="getHtml">getHtml</el-button>
  </div>
</template>

<style scoped>
</style>
