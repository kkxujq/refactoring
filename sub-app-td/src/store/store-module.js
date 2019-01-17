import storeModules from './index';

export default {
  namespaced: true, // namespaced must be true in module app.
  state: { name: process.env.VUE_APP_NAME },
  mutations: {},
  actions: {},
  modules: {
    ...storeModules,
  },
};
