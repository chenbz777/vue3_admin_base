<script setup lang="ts">
import { ref, reactive } from "vue";
import { Delete, Edit } from '@element-plus/icons-vue';

interface Tree {
  id: string;
  label: string
  children?: Tree[]
}

// 【接口】接受传参字段
interface IProps {
  data: Tree[];
  showEditBtn?: boolean;
  showDeleteBtn?: boolean;
}

// 初始化默认参数
const props = withDefaults(defineProps<IProps>(), {
  showEditBtn: true,
  showDeleteBtn: true,
});

// 事件
const emit = defineEmits<{
  (e: "handleNode", data: object): void;
  (e: "handleEdit", data: object): void;
  (e: "handleDelete", data: object): void;
}>();

// 点击了行
const handleNode = (data: Tree) => {

  emit('handleNode', data);
}

// 点击了编辑
const handleEdit = (data: object) => {

  emit('handleEdit', data);
};

// 点击了删除
const handleDelete = (data: object) => {

  emit('handleDelete', data);
};

</script>

<template>
  <el-tree :data="props.data || []" @node-click="handleNode">
    <template #default="{ node, data }">
      <div class="flex-1 c-row-y-center">
        <div class="flex-1">{{ node.label }}</div>
        <div>
          <el-button link type="primary" :icon="Edit" @click.stop="handleEdit(data)" v-if="showEditBtn">编辑
          </el-button>
          <el-button link type="danger" :icon="Delete" @click.stop="handleDelete(data)" v-if="showDeleteBtn">删除
          </el-button>
        </div>
      </div>
    </template>
  </el-tree>
</template>

<style scoped>
:deep(.el-tree-node__content) {
  padding: 5px 10px 5px 0;
  border-radius: 10px;
  margin: 2px 0;
}
</style>
