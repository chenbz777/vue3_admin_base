<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { ElInput } from 'element-plus';

// 【接口】接受传参字段
interface IProps {
  bindModel: string[];
}

// 初始化默认参数
const props = withDefaults(defineProps<IProps>(), {});


const inputValue = ref('');
// const dynamicTags = ref(props.bindModel || []);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (tag: string) => {
  props.bindModel.splice(props.bindModel.indexOf(tag), 1);

  updateData();
};

const showInput = () => {
  inputVisible.value = true;

  nextTick(() => {
    InputRef.value!.input!.focus();
  });

};

const handleInputConfirm = () => {
  if (inputValue.value) {
    props.bindModel.push(inputValue.value);
  }
  inputVisible.value = false
  inputValue.value = '';

  updateData();
};

// 事件
const emit = defineEmits<{
  (e: "updateData", data: object): void;
}>();

// 点击了编辑
const updateData = () => {
  emit('updateData', props.bindModel);
};

</script>

<template>
  <div>
    <el-tag v-for="tag in props.bindModel" :key="tag" class="mx-1" closable :disable-transitions="false"
      @close="handleClose(tag)" effect="dark" size="large">
      {{ tag }}
    </el-tag>
    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1" style="width:100px"
      @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
    <el-button v-else class="button-new-tag ml-1" @click="showInput">
      + 添加
    </el-button>
  </div>
</template>

<style scoped>
</style>