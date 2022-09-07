import { log } from "console";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import cookie from '../utils/cookie';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login/index.vue"),
    meta: { title: ['登录'] }
  },
  {
    path: "/system",
    name: "system",
    component: () => import("../views/system/index.vue"),
    meta: { title: ['系统管理'] },
    children: [
      {
        path: '',
        name: 'home',
        meta: { title: ['主页'] },
        component: () => import("../views/system/home/index.vue"),
      },
      {
        path: 'form',
        name: 'form',
        meta: { title: ['主页', '封装表单'] },
        component: () => import("../views/system/form/index.vue"),
      },
      {
        path: 'table',
        name: 'table',
        meta: { title: ['主页', '封装表格'] },
        component: () => import("../views/system/table/index.vue"),
      },
      {
        path: 'tree',
        name: 'tree',
        meta: { title: ['主页', '封装树形控件'] },
        component: () => import("../views/system/tree/index.vue"),
      },
      {
        path: 'markdown',
        name: 'markdown',
        meta: { title: ['主页', 'markdown编辑器'] },
        component: () => import("../views/system/markdown/index.vue"),
      },
      {
        path: 'editor',
        name: 'editor',
        meta: { title: ['主页', '富文本编辑器'] },
        component: () => import("../views/system/editor/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: "404",
    component: () => import("../components/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {

  // 路由守卫逻辑
  if (to.path === '/') {
    return true
  }


  // 通过 return turn;
  // 不通过 return false;
  if (cookie.get('token')) {
    return true;
  } else {
    return '/';
  }
});

export default router;
