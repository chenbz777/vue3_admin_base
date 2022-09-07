<script setup lang="ts">
import { reactive } from 'vue';

const table = reactive({
  tableModels: [
    {
      label: '数据标识',
      key: 'id',
      width: 200,
    },
    {
      label: '字符串',
      key: 'str',
      width: 200,
    },
    {
      label: '对象',
      key: 'obj',
      width: 200,
      value: 'obj.one'
    },
    {
      label: '数组',
      key: 'arr',
      width: 200,
      value: 'arr.0'
    },
    {
      label: '数组对象',
      key: 'arrObj',
      width: 200,
      value: 'arrObj.0.one'
    },
  ],
  data: [],
  total: 20
});

const arr: any = [];

for (let i = 0; i < 10; i++) {
  const data = {
    id: i,
    str: '123',
    obj: {
      one: '中国'
    },
    arr: ['苹果', '西瓜'],
    arrObj: [
      {
        one: '北京'
      },
      {
        two: '上海'
      }
    ]
  }

  arr.push(data);
}

table.data = arr;

const handleEdit = (data: object, index: number) => {
  console.log('点击了编辑按钮 => ', data, index);
}

const handleDelete = (data: object, index: number) => {
  console.log('点击了删除按钮 => ', data, index);
}

const handlePagination = (data: any) => {
  const { currentPage, pageSize, } = data;

  console.log('改变了分页 => ', { currentPage, pageSize, });
}

const handleSelection = (values: any) => {
  console.log('改变了选中 =>', values);
}

</script>
  
<template>

  <Table :tableModels="table.tableModels" :data="table.data" :total="table.total" @handleEdit="handleEdit"
    @handleDelete="handleDelete" @handlePagination="handlePagination" @handleSelection="handleSelection">
    <!-- 自定义列【phone】字段 -->
    <template v-slot:phone="scope">
      <el-tag>{{ scope.phone }}</el-tag>
    </template>
  </Table>

</template>
  
<style scoped>
</style>