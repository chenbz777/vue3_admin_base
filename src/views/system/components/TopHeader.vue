<script setup lang="ts">
import { ref, reactive, inject } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus';

const store = useStore();

const cookie: any = inject('$cookie');

const userInfo = cookie.getJSON('userInfo');

const onOpenMenu = () => {

  store.commit("openMenu");
};

const router = useRouter();
const route = useRoute();

const toHome = () => {
  router.push('/system/');
};

const logout = () => {
  ElMessageBox.confirm(
    '是否要退出登录?',
    '退出登录',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '退出登录成功',
      });

      cookie.del('token');

      router.push('/');
    })
};

</script>

<template>
  <div class="header c-row">
    <div class="logo c-row-y-center" @click="toHome">
      <el-icon :size="35" color="#3861db">
        <ElementPlus />
      </el-icon>
      <span class="logo__title">后台管理系统</span>
    </div>
    <div class="flex-1 px-2 c-row-y-center">
      <div class="c-row-y-center">
        <el-icon class="openMenu" @click="onOpenMenu">
          <ArrowLeft v-if="store.state.isOpenMenu" />
          <ArrowRight v-else />
        </el-icon>

        <el-breadcrumb separator="/" class="ml-5">
          <el-breadcrumb-item v-for="(route_item, index) in route.meta.title" :key="index">{{ route_item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="flex-1 c-row-y-center header__info">
        <div class="header__info__item c-row-y-center">
          <el-button text>
            <!-- <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> -->
            <span>欢迎您! {{ userInfo.name }}</span>
          </el-button>

        </div>
        <div class="header__info__item">
          <el-button text @click="logout">退出登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 100%;
}

.logo {
  width: 220px;
}

.logo__img {
  width: 50px;
}

.logo__title {
  margin-left: 10px;
  font-size: 22px;
  font-weight: 600;
  color: #3861db;
  cursor: pointer;
}

.openMenu {
  border-radius: 100%;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.header__info {
  justify-content: flex-end;
}

.header__info__item {
  margin: 0 5px;
}
</style>
