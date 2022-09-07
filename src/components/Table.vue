<script setup lang="ts">
import { reactive, useSlots, isProxy } from "vue";
import { Delete, Edit } from '@element-plus/icons-vue';

// 【接口】通用设置key
interface IKey {
  [key: string]: any;
}

// 【接口】table表格模型
interface ITableModel {
  label: string;
  key: string;
  width?: number;
  value?: string;
}

// 【接口】接受传参字段
interface IProps {
  tableModels?: ITableModel[];
  data: object[];
  total: number;
  showEditBtn?: boolean;
  showDeleteBtn?: boolean;
  operationsWidth?: number;
  showSelection?: boolean;
}

// 初始化默认参数
const props = withDefaults(defineProps<IProps>(), {
  total: 0,
  showEditBtn: true,
  showDeleteBtn: true,
  operationsWidth: 200,
  showSelection: true,
});

// 插槽对象
const slots = useSlots();

// 事件
const emit = defineEmits<{
  (e: "handleEdit", data: object, index: number): void;
  (e: "handleDelete", data: object, index: number): void;
  (e: "handlePagination", data: object): void;
  (e: "handleSelection", data: object): void;
}>();

// 点击了编辑
const handleEdit = (data: object, index: number) => {
  emit('handleEdit', data, index);
};

// 点击了删除
const handleDelete = (data: object, index: number) => {
  emit('handleDelete', data, index);
};

// 替换表格数据
const replaceColumnData = (data: object, key: string) => {

  let value = '';

  if (isProxy(data)) {

    const newData = Object.assign({}, data);

    const keys = key.split('.');

    // 递归次数
    const count = keys.length;
    // 当前递归次数
    let i = 0;

    const getValue = (obj: IKey) => {

      if (i < count) {
        const index = i;

        i++;

        value = obj[keys[index]];

        getValue(obj[keys[index]]);
      }
    }

    getValue(newData);
  }

  return value;
};

// 分页
const page = reactive({
  currentPage: 1,
  pageSize: 10,
})

// 改变了分页条数
const handleSizeChange = (val: number) => {
  page.pageSize = val;

  handlePagination();
}

// 改变了页数
const handleCurrentChange = (val: number) => {
  page.currentPage = val;

  handlePagination();
}

// 改变了分页
const handlePagination = () => {
  emit('handlePagination', page);
}

// 改变了选中
const handleSelection = (values: any) => {
  emit('handleSelection', values);
};

</script>
  
<template>
  <el-table :data="data" stripe :border="true" table-layout="fixed" @selection-change="handleSelection"
    style="width: 100%">
    <el-table-column type="selection" width="55" v-if="showSelection" />
    <el-table-column v-for="tableModel in props.tableModels" :key="tableModel.key" :prop="tableModel.key"
      :label="tableModel.label" :width="tableModel.width">
      <template #default="scope">
        <slot v-if="slots[tableModel.key]" :name="tableModel.key" v-bind="scope.row"></slot>
        <span v-else-if="tableModel.value">
          {{ replaceColumnData(scope.row, tableModel.value) }}
        </span>
        <span v-else>
          {{ scope.row[tableModel.key] }}
        </span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" :width="operationsWidth" v-if="operationsWidth">
      <template #default="scope">
        <slot name="operations" v-bind="scope.row"></slot>

        <el-button link type="primary" :icon="Edit" @click="handleEdit(scope.row, scope.$index)" v-if="showEditBtn">编辑
        </el-button>
        <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(scope.row, scope.$index)" confirm-button-text="确定"
          cancel-button-text="再想想" v-if="showDeleteBtn">
          <template #reference>
            <el-button link type="danger" :icon="Delete">删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="c-pagination" v-model:currentPage="page.currentPage" v-model:page-size="page.pageSize"
    :page-sizes="[10, 20, 50, 100, 200, 500]" background layout="total, sizes, prev, pager, next, jumper" :total="total"
    hide-on-single-page @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>
  
<style scoped>
.c-pagination {
  margin-top: 20px;
}
</style>