<script lang="ts" setup>
import { ref } from 'vue';

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';


let mdStr = '';

const updateMarkdown = (md: string) => {

  mdStr = md;
}

let htmlStr = '';

const updateHtml = (html: string) => {

  htmlStr = html
}

const getMarkdown = () => {
  return mdStr;
}

const getHtml = () => {
  return htmlStr;
}

// 暴露函数
defineExpose({
  getMarkdown,
  getHtml,
});

const onUploadImg = async (files: any, callback: any) => {

  // 上传图片方法

  // const res = await Promise.all(
  //   files.map((file) => {
  //     return new Promise((rev, rej) => {
  //       const form = new FormData();
  //       form.append('file', file);

  //       axios
  //         .post('/api/img/upload', form, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data'
  //           }
  //         })
  //         .then((res) => rev(res))
  //         .catch((error) => rej(error));
  //     });
  //   })
  // );

  // callback(res.map((item) => item.data.url));
};


</script>

<template>
  <md-editor @onChange="updateMarkdown" @onHtmlChanged="updateHtml" @onUploadImg="onUploadImg" />
</template>

<style scoped>

</style>