import axios from 'axios';
import { createStore } from 'vuex';

const store = createStore({
    state: {
        categories: [],
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        addCategory(state, category) {
            state.categories.push(category);
        },
        removeCategoryById(state, categoryId) {
            state.categories = state.categories.filter((category) => category._id !== categoryId)
        }
    },
    actions: {
       async fetchCategories({ commit }) {
        const res = await axios.get('http://localhost:4000/categories');
        const categories = await res.data;
        commit('setCategories', categories)
       },
       async createCategory({ commit }, categoryData) {
        const res = await axios.post('http://localhost:4000/categories', categoryData)

        const newCategory = await res.data;
        console.log(newCategory);
        commit('addCategory', newCategory);
       },
       async deleteCategory({ commit }, categoryId) {
            await axios.delete(`http://localhost:4000/categories/${categoryId}`)

            commit('removeCategoryById', categoryId)
       }
    },
    modules: {}
});

export default store;