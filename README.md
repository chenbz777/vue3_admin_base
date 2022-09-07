# Vue3 + Ts + Vite + Element plus

## # 项目截图

后台管理页
![image-20220907113253202](https://img.chenbz.com/image-20220907113253202.png)

## # 预览地址
[🚀 点击访问预览地址](https://chenbz777.github.io/vue3_admin_base/)

## # 功能

1. axios封装
2. 集成element-ui plus
3. 集成vuex
4. 集成vue-router
5. 全局路由守卫
6. 集成markdown编辑器
7. 集成富文本编辑器
8. 封装表单组件
9. 封装表格组件
10. 封装树形控件
11. 自定义404页面
12. 封装axios请求



## # 目录详情

```
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   │   ├── 404.vue  // 自定义404页面
│   │   ├── Form.vue  // 封装form表单
│   │   ├── MdEditor.vue  // markdown编辑器
│   │   ├── Table.vue  // 封装表格组件
│   │   ├── Tag.vue  // 分钟标签组件
│   │   ├── Tree.vue  // 封装树形控件
│   │   └── WangEditor.vue  // 富文本编辑器
│   ├── main.ts
│   ├── router
│   │   └── index.ts  // 全局路由
│   ├── store
│   │   └── index.ts  // vuex
│   ├── style.css
│   ├── styles
│   │   ├── base.css  // 自定义base.css
│   │   └── global.css
│   ├── utils
│   │   ├── cookie.ts  // 封装cookie.js
│   │   ├── index.ts
│   │   ├── object.ts  // 封装对象操作js
│   │   ├── request.ts  // 封装axios请求
│   │   └── tree.ts  // 封装树形js
│   ├── views
│   │   ├── login  // 登录
│   │   │   └── index.vue
│   │   └── system
│   │       ├── components  // 组件
│   │       │   ├── LeftMenu.vue  // 侧边栏
│   │       │   └── TopHeader.vue  // 顶部
│   │       ├── editor
│   │       │   └── index.vue
│   │       ├── form
│   │       │   └── index.vue
│   │       ├── home
│   │       │   └── index.vue
│   │       ├── index.vue
│   │       ├── markdown
│   │       │   └── index.vue
│   │       ├── table
│   │       │   └── index.vue
│   │       └── tree
│   │           └── index.vue
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```
