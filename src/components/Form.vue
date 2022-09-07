<script setup lang="ts">
import { ref, reactive, useSlots, nextTick } from "vue";
import type { FormInstance, FormRules } from 'element-plus';
import { Key, Plus } from '@element-plus/icons-vue';

import Tag from './Tag.vue';

// 【接口】通用设置key
interface IKey {
  [key: string]: any;
}

// 【接口】form表单模型
interface IFormModel {
  label: string;
  key: string;
  type: string;
  rule?: any;
  placeholder?: string;
  disabled?: boolean;
  options?: any;
  props?: any;
}

// 【接口】接受传参字段
interface IProps {
  formModels: IFormModel[];
  ruleForm: IKey;
  showSubmitBtn?: boolean;
  submitText?: string;
  showResetBtn?: boolean;
}

// 初始化默认参数
const props = withDefaults(defineProps<IProps>(), {
  showSubmitBtn: true,
  submitText: '提交',
  showResetBtn: true,
});

// 获取“占位符”
const getPlaceholder = (type: string, label: string): string => {

  if (type === ('input' || 'number' || 'tag')) {
    return '请输入' + label;
  }

  if (type === 'upload') {
    return '请上传' + label;
  }

  return '请选择' + label;
};

// form表单校验规则
const rules = reactive<FormRules>({});

props.formModels.forEach(formModel => {

  if (!formModel.placeholder) {
    formModel.placeholder = getPlaceholder(formModel.type, formModel.label);
  }

  if (formModel.rule) {

    if ((typeof formModel.rule) === 'boolean') {
      rules[formModel.key] = [{
        required: true,
        message: formModel.placeholder,
        trigger: 'blur',
      }];
    } else {
      rules[formModel.key] = formModel.rule;
    }
  }
});

// 插槽对象
const slots = useSlots();

// 表单ref
const ruleFormRef = ref<FormInstance>();

// 校验
const validate = () => {
  return ruleFormRef.value?.validate();
};

// 清除验证
const clearValidate = (): void => {
  ruleFormRef.value?.clearValidate();
};

// 重置表单
const resetForm = (): void => {
  ruleFormRef.value?.resetFields();
};

// 事件
const emit = defineEmits<{
  (e: "submitForm", ruleForm: IKey): void;
}>();

// 提交表单
const submitForm = async (): Promise<void> => {

  await validate();

  emit('submitForm', props.ruleForm);
};

// 设置form表单值
const setRuleForm = (newRuleForm: IKey): void => {

  Object.assign(props.ruleForm, newRuleForm);

  setTimeout(() => {
    clearValidate();
  }, 30);
}

// 清空form表单值
const resetRuleForm = (): void => {

  const oldRuleForm = Object.assign({}, props.ruleForm);

  for (const key in oldRuleForm) {
    delete props.ruleForm[key];
  }

  setTimeout(() => {
    clearValidate();
  }, 30);
}

// 暴露函数
defineExpose({
  validate,
  clearValidate,
  resetForm,
  setRuleForm,
  resetRuleForm,
});

interface IDialog {
  visible: boolean;
  imageUrl: string;
};

const dialog = reactive<IDialog>({
  visible: false,
  imageUrl: '',
});

const handlePictureCardPreview = (uploadFile: any) => {
  dialog.imageUrl = uploadFile.url!
  dialog.visible = true
};

</script>
  
<template>
  <!-- 表单 -->
  <el-form :model="props.ruleForm" :rules="rules" ref="ruleFormRef" label-width="120px">
    <el-form-item :label="formModel.label" v-for="formModel in props.formModels" :prop="formModel.key">
      <!-- 预留自定义表单 -->
      <slot v-if="slots[formModel.key]" :name="formModel.key" v-bind="{ key: props.ruleForm[formModel.key] }"></slot>
      <!-- 输入框 -->
      <el-input v-else-if="formModel.type === 'input'" v-model="props.ruleForm[formModel.key]"
        :placeholder="formModel.placeholder" :disabled="formModel.disabled" clearable />
      <!-- 密码框 -->
      <el-input v-else-if="formModel.type === 'password'" v-model="props.ruleForm[formModel.key]" type="password"
        :placeholder="formModel.placeholder" :disabled="formModel.disabled" show-password clearable />
      <!-- 文本框 -->
      <el-input v-else-if="formModel.type === 'textarea'" v-model="props.ruleForm[formModel.key]"
        :autosize="{ minRows: 4, maxRows: 6 }" type="textarea" :placeholder="formModel.placeholder"
        :disabled="formModel.disabled" clearable />
      <!-- 数字输入框 -->
      <el-input-number v-else-if="formModel.type === 'number'" v-model="props.ruleForm[formModel.key]"
        :disabled="formModel.disabled" :precision="formModel.props?.precision ?? 2" />
      <!-- 单选 -->
      <el-radio-group v-else-if="formModel.type === 'radio'" v-model="props.ruleForm[formModel.key]">
        <el-radio v-for="item in formModel?.options" :key="item.key" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
      <!-- 多选框 -->
      <el-checkbox-group v-else-if="formModel.type === 'checkbox'" v-model="props.ruleForm[formModel.key]">
        <el-checkbox v-for="item in formModel?.options" :key="item.key" :label="item.value">
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
      <!-- 下拉单选 -->
      <el-select v-else-if="formModel.type === 'select'" v-model="props.ruleForm[formModel.key]"
        :placeholder="formModel.placeholder" :disabled="formModel.disabled">
        <el-option v-for="item in formModel?.options" :key="item.key" :label="item.label" :value="item.value" />
      </el-select>
      <!-- 联级单选 -->
      <el-cascader v-else-if="formModel.type === 'cascader'" v-model="props.ruleForm[formModel.key]"
        :options="formModel?.options" :props="formModel?.props" :placeholder="formModel.placeholder"
        :disabled="formModel.disabled" />
      <!-- 开关 -->
      <el-switch v-else-if="formModel.type === 'switch'" v-model="props.ruleForm[formModel.key]"
        :disabled="formModel.disabled" />
      <!-- 时间 -->
      <el-time-picker v-else-if="formModel.type === 'time'" v-model="props.ruleForm[formModel.key]"
        :placeholder="formModel.placeholder" :disabled="formModel.disabled" />
      <!-- 时间 to 时间 -->
      <el-time-picker v-else-if="formModel.type === 'time-to-time'" v-model="props.ruleForm[formModel.key]" is-range
        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :disabled="formModel.disabled" />
      <!-- 日期 -->
      <el-date-picker v-else-if="formModel.type === 'date'" v-model="props.ruleForm[formModel.key]" type="date"
        :placeholder="formModel.placeholder" :disabled="formModel.disabled" />
      <!-- 日期 to 日期 -->
      <el-date-picker v-else-if="formModel.type === 'date-to-date'" v-model="props.ruleForm[formModel.key]"
        :placeholder="formModel.placeholder" type="daterange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" :disabled="formModel.disabled" />
      <!-- 日期时间 -->
      <el-date-picker v-else-if="formModel.type === 'datetime'" v-model="props.ruleForm[formModel.key]" type="datetime"
        :placeholder="formModel.placeholder" :disabled="formModel.disabled" />
      <!-- 日期时间 to 日期时间 -->
      <el-date-picker v-else-if="formModel.type === 'datetime-to-datetime'" v-model="props.ruleForm[formModel.key]"
        type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
        :disabled="formModel.disabled" />
      <!-- 文件上传 -->
      <el-upload v-else-if="formModel.type === 'upload'" v-model:file-list="props.ruleForm[formModel.key]"
        :action="formModel?.props?.action" :limit="formModel?.props?.limit || 1" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :disabled="formModel.disabled"
        :class="{'el-upload--none': props.ruleForm[formModel.key].length === formModel?.props?.limit}">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <!-- 文件上传--mini -->
      <el-upload v-else-if="formModel.type === 'upload-mini'" v-model:file-list="props.ruleForm[formModel.key]"
        :action="formModel?.props?.action" :limit="formModel?.props?.limit || 1" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :disabled="formModel.disabled" class="upload-mini"
        :class="{'el-upload--none': props.ruleForm[formModel.key].length === formModel?.props?.limit}">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <!-- tag -->
      <Tag v-else-if="formModel.type === 'tag'" v-model:bindModel="props.ruleForm[formModel.key]"></Tag>
    </el-form-item>
    <el-form-item class="form-operations">
      <!-- 预留自定义区域 -->
      <slot name="operations"></slot>

      <!-- 默认【提交】按钮和【重置】按钮 -->
      <el-button type="primary" @click="submitForm" v-if="showSubmitBtn">{{ submitText }}</el-button>
      <el-button @click="resetForm" v-if="showResetBtn">重置</el-button>
    </el-form-item>

    <el-dialog v-model="dialog.visible">
      <img w-full :src="dialog.imageUrl" alt="Preview Image" />
    </el-dialog>
  </el-form>
</template>
  
<style scoped>
:deep(.el-upload-list__item .el-icon--close-tip) {
  display: none !important;
}

:deep(.upload-mini .el-upload--picture-card) {
  width: 80px;
  height: 80px;
}

:deep(.upload-mini .el-upload-list__item) {
  width: 80px;
  height: 80px;
}

:deep(.el-upload--none .el-upload--picture-card) {
  display: none;
}

:deep(.el-form-item .el-form-item) {
  margin-bottom: 18px;
}
</style>