<script setup lang="ts">
import { ref, reactive, inject } from "vue";

const form = reactive({
  formModels: [
    {
      label: '输入框',
      key: 'input',
      type: 'input',
      rule: true,
    },
    {
      label: '下拉选择',
      key: 'select',
      type: 'select',
      value: 1,
      disabled: false,
      options: [
        {
          key: 1,
          label: "女",
          value: 0
        },
        {
          key: 2,
          label: "男",
          value: 1
        }
      ]
    },
    {
      label: '开关',
      key: 'switch',
      type: 'switch',
    },
    {
      label: '时间',
      key: 'time',
      type: 'time',
    },
    {
      label: '时间',
      key: 'time2',
      type: 'time-to-time',
    },
    {
      label: '联级单选',
      key: 'cascader',
      type: 'cascader',
      value: 0,
      options: [
        {
          value: 'disciplines',
          label: 'Disciplines',
          children: [
            {
              value: 'consistency',
              label: 'Consistency',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency',
                },
                {
                  value: 'feedback',
                  label: 'Feedback',
                },
              ],
            },
            {
              value: 'feedback',
              label: 'Feedback',
            },
          ],
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'side nav',
              label: 'Side Navigation',
            },
            {
              value: 'top nav',
              label: 'Top Navigation',
            },
          ],
        },
      ],
    },
    {
      label: '日期',
      key: 'date',
      type: 'date',
    },
    {
      label: '日期2',
      key: 'date2',
      type: 'date-to-date',
    },
    {
      label: '日期时间',
      key: 'datetime',
      type: 'datetime',
    },
    {
      label: '日期时间2',
      key: 'datetime2',
      type: 'datetime-to-datetime',
    },
    {
      label: '图片上传',
      key: 'images',
      type: 'upload',
      rule: true,
      props: {
        action: '上传图片接口',
        limit: 1,
      }
    },
  ],
  ruleForm: {
    images: [],
  }
});

</script>

<template>
  <Form :formModels="form.formModels" :ruleForm="form.ruleForm"></Form>
</template>

<style scoped>
</style>
