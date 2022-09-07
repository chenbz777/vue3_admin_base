<script lang="ts" setup>
import { ref, onBeforeUnmount, shallowRef } from 'vue';

import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

// 【接口】接受传参字段
interface IProps {
  mode?: string;
  defaultHtml?: string;
  toolbarConfig?: object;
  editorConfig?: any;
}

// 初始化默认参数
const props = withDefaults(defineProps<IProps>(), {
  mode: 'default',
  defaultHtml: '',
  toolbarConfig: Object(),
  editorConfig: { placeholder: '请输入内容...', MENU_CONF: {} },
});

props.editorConfig.MENU_CONF["uploadImage"] = {
  // 上传图片的配置
  // 自定义上传
  async customUpload(file: any, insertFn: any) {
    // file 需要自己调用上传后端接口

    // 然后使用 insertFn(url, alt, href) 回调编辑器显示
    // insertFn();
  },
};

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor: any) => {
  // 记录 editor 实例，重要！
  editorRef.value = editor;
};

const valueHtml = ref(props.defaultHtml);

const getHtml = () => {
  return editorRef.value.getHtml();
}

// 暴露函数
defineExpose({
  getHtml,
});

</script>

<template>
  <div class="wangEditor">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" class="wangEditor__editor"
      @onCreated="handleCreated" />
  </div>
</template>

<style scoped>
.wangEditor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.wangEditor__editor {
  height: 400px !important;
  overflow-y: hidden !important;
}
</style>