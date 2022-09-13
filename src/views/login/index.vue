<script setup lang="ts">
import { ref, reactive, inject } from "vue";
import { useRouter } from "vue-router";

const loginRef = ref();

const router = useRouter();

const request: any = inject('$request');

const cookie: any = inject('$cookie');

const form = reactive({
  formModels: [
    {
      label: '账户',
      key: 'username',
      type: 'input',
      rule: true,
    },
    {
      label: '密码',
      key: 'password',
      type: 'password',
      rule: true,
    },
  ],
  ruleForm: {}
});

const memoryPassword = ref(false);

// 读取cookie是否有存储账号密码
const cookieRuleForm = cookie.getJSON('memoryPassword');

// 有存储账号密码,取出赋值
if (cookieRuleForm) {
  form.ruleForm = cookieRuleForm;

  memoryPassword.value = true;
}


const login = async () => {

  // 记住密码
  if (memoryPassword.value) {
    // 存储账号密码7天
    cookie.setJSON('memoryPassword', form.ruleForm, 7 * 24);
  } else {
    // 取消记录密码
    cookie.del('memoryPassword');
  }

  await loginRef.value.validate();

  const data = form.ruleForm;

  // const res = await request.post('/login', data);

  cookie.set('token', 'token', 2);
  cookie.setJSON('userInfo', { name: 123 });

  router.push('/system');
}

</script>

<template>
  <div class="login c-row-center vh-100">
    <div class="login__content t-card">
      <h3>Login</h3>
      <Form :formModels="form.formModels" :ruleForm="form.ruleForm" :showSubmitBtn="false" :showResetBtn="false"
        label-width="80px" label-position="top" ref="loginRef">
        <template v-slot:operations>
          <div class="w-100">
            <el-checkbox v-model="memoryPassword" label="记住密码" size="large" />
          </div>
          <div class="text-center w-100">
            <el-button type="primary" class="login__btn" @click="login">登录</el-button>
          </div>
        </template>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.login {
  background-image: url('http://img.chen.bz/1661308833256.png');
  background-size: 100%;
  background-repeat: no-repeat;
}

.login__content {
  width: 500px;
}

.login__btn {
  width: 50%;
  background-color: #3861db;
  border: 0;
  border-radius: 16px;
  margin-top: 30px;
}

.t-card {
  box-shadow: 0px 0px 20px 0 rgb(55 99 170 / 20%), -0px -0px 20px 0 #fff;
}
</style>
