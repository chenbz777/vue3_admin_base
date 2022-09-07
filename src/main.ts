import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router";

import store from "./store";

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import Form from './components/Form.vue';
import Table from './components/Table.vue';
import Tree from './components/Tree.vue';

import request from './utils/request';
import cookie from './utils/cookie';
import utils from './utils';


const app = createApp(App);

// 添加element-plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
};

app.provide('$request', request);
app.provide('$cookie', cookie);
app.provide('$utils', utils);

app.component('Form', Form);
app.component('Table', Table);
app.component('Tree', Tree);


app.use(store);

app.use(router);

app.use(ElementPlus);

app.mount('#app');
