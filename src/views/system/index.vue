<script setup lang="ts">
import { reactive } from "vue";

import LeftMenuVue from './components/LeftMenu.vue';
import TopHeader from './components/TopHeader.vue';

interface IMenu {
  id: string | number;
  title: string;
  router: string;
  icon: string;
  parentId: string | number;
  isEnd: boolean;
  children?: IMenu[];
}

const menus = reactive<IMenu[]>([
  {
    id: 1,
    title: '封装表单',
    icon: 'Document',
    router: '/system/form',
    parentId: 0,
    isEnd: true,
    children: []
  },
  {
    id: 2,
    title: '封装表格',
    icon: 'Grid',
    router: '/system/table',
    parentId: 0,
    isEnd: true,
    children: []
  },
  {
    id: 3,
    title: '封装树形控件',
    icon: 'Finished',
    router: '/system/tree',
    parentId: 0,
    isEnd: true,
    children: []
  },
  {
    id: 4,
    title: 'markdown编辑器',
    icon: 'EditPen',
    router: '/system/markdown',
    parentId: 0,
    isEnd: true,
    children: []
  },
  {
    id: 5,
    title: '富文本编辑器',
    icon: 'Edit',
    router: '/system/editor',
    parentId: 0,
    isEnd: true,
    children: []
  },
]);


</script>

<template>
  <el-container>
    <el-header>
      <TopHeader></TopHeader>
    </el-header>
    <el-container>
      <el-aside>
        <LeftMenuVue :menus="menus"></LeftMenuVue>
      </el-aside>
      <el-main>
        <el-card shadow="never">
          <router-view />
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-container {
  height: calc(100vh);
}

.el-header {
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
}

.el-aside {
  width: auto;
  background-color: white;
  padding: 10px;
  border-right: 1px solid #e6e6e6;
}

.el-main {
  padding: 10px;
}
</style>
