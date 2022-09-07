import { createStore } from "vuex";

interface IMenus {
  id: string | number;
  title: string;
  router: string;
  icon: string;
  parentId: string | number;
  isEnd: boolean;
  children?: IMenus[];
}

export default createStore({
  state: {
    isOpenMenu: true,
    meuns: [
      {
        id: 3,
        title: '视频管理',
        icon: 'VideoCamera',
        router: '/system/videos',
        parentId: 0,
        children: []
      },
    ],
  },
  getters: {},
  mutations: {
    openMenu(state): void {

      state.isOpenMenu = !state.isOpenMenu;
    }
  },
  actions: {},
  modules: {},
});
