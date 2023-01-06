<script setup lang="ts">
import { ref, reactive, inject } from "vue";

const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]

const handleNode = (data: any) => {
  console.log('点击了行 =>', data);
}

const handleEdit = (data: any) => {
  console.log('点击了编辑 =>', data);
}

const handleDelete = (data: any) => {
  console.log('点击了删除 =>', data);
}

</script>

<template>
  <Tree :data="data" @handleNode="handleNode" @handleEdit="handleEdit" @handleDelete="handleDelete"></Tree>
</template>

<style scoped>

</style>
