import axios from "axios";

export default {
    namespaced: true,

    state: {
        count: [],
        isLoading: null,
    },

    getters: {
        count: (state) => state.count,
        isLoading: (state) => state.isLoading
    },

    mutations: {
        setCount(state, number){
            state.count = number;
        },
        setIsLoading(state, isLoading){
            state.isLoading = isLoading;
        }
    },

    actions: {
        async index({commit}) {
            commit('setIsLoading', true);

            const res = await axios.get(`${process.env.VUE_APP_API}dashboard`);

            const { data } = res

            console.log(data);

            commit('setCount', data);

            commit('setIsLoading', false);
        }
    }
}