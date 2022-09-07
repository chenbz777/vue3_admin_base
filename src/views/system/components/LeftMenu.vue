<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const route = useRoute();

interface IMenu {
  id: string | number;
  title: string;
  router: string;
  icon: string;
  parentId: string | number;
  isEnd: boolean;
  children?: IMenu[];
}

interface Props {
  menus: IMenu[];
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {});

</script>

<template>
  <el-menu :default-active="route.path" class="el-menu-vertical" :collapse="!store.state.isOpenMenu" :router="true">

    <template v-for="menu in props.menus" :key="menu.id">
      <el-sub-menu :index="menu.router" v-if="menu.children?.length">
        <template #title>
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item :index="menu_item.router" v-for="menu_item in menu.children">
          <!-- <el-icon>
                        <component :is="menu_item.icon"></component>
                    </el-icon> -->
          <template #title>
            <span class="sub-menu__item-title">{{ menu_item.title }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item :index="menu.router" v-else>
        <el-icon>
          <component :is="menu.icon"></component>
        </el-icon>
        <template #title>
          {{ menu.title }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.el-menu-item.is-active,
.el-menu-item:hover {
  background-color: #ecf1fb;
  color: #3861db;
  border-radius: 10px;
}

:deep(.el-sub-menu__title:hover) {
  background-color: #ecf1fb;
  color: #3861db;
  border-radius: 10px;
}

.el-menu-item {
  margin: 3px 0;
}

.el-menu {
  border-right: 0;
  height: calc(100% - 16px) !important;
  background-color: transparent;
}

:deep(.el-menu) {
  border-right: 0;
  height: calc(100% - 16px) !important;
  background-color: transparent;
}

.sub-menu__item-title {
  padding-left: 10px;
}
</style>
