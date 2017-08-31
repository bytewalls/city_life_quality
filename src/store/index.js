import Vue from 'vue';
import Vuex from 'vuex';
import { getCityData } from '../services/teleportAPI';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    city: {},
    teleportScores: {},
    weatherData: {},
  },
  actions: {
    async loadCity ({ commit }, link) {
      try {
        const city = await getCityData(link);
        commit('setCity', city);
      } catch (e) {
        Error(`Could not load city for ${link}`);
      }
    },
  },
  mutations: {
    setCity (state, payload) {
      state.city = payload;
    },
  },
});
