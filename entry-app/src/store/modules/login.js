import * as types from '../types/login-types';
import accountService from '@/services/login-service';
import Vue from 'vue';
import CONF from '@/config/';
// import errorCode from '../../services/xhr/errorCode';

// initial state
const state = {
  userInfo: {},
  auth: [],
  config: { ...CONF },
};

// getters
const getters = {
  userInfo: state => state.userInfo,
  auth: state => state.auth,
  config: state => state.config,
};

// actions
const actions = {
  [types.LOGIN_REQUEST](info, formData) {
    return accountService.login(formData);
  },

  [types.LOGOUT_REQUEST]() {
    return accountService.logout();
  },

  [types.GET_LOGIN_INFO_REQUEST]({ commit }) {
    return accountService
      .getLoginInfo()
      .then(async ({ data = {} }) => {
        const session = Object.assign(
          {},
          {
            ...Vue.session,
            ...data,
            ...CONF,
            privileges: undefined,
          },
        );

        const { privileges = [] } = data;

        const { default: authProcess } = await import('@/store/authProcess');

        session.auth = await authProcess(privileges);

        commit(`${types.USER_INFO}`, session);
        commit(`${types.AUTH}`, session.auth);

        return session;
      })
      .catch(() => {
        // this.$router.push({ name: 'login' })
      });
  },

  [types.GET_VCODE_REQUEST]() {
    return accountService.getVcode();
  },
};

// mutations
const mutations = {
  [types.USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  [types.AUTH](state, auth) {
    state.auth = auth;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
