import axios from 'axios';
import { createStore } from 'vuex';

const store = createStore({
    state: {
        categories: [],
        category: []
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        setCategory(state, category) {
            state.category = category;
        },
        addCategory(state, category) {
            state.categories.push(category);
        },
        updateCategory(state, category) {
            // state.categories.push(category);
            let c = state.categories.find(v => v._id == category._id)
            c = category
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
       async getById({ commit }, id) {
        const res = await axios.get(`http://localhost:4000/categories/${id}`);
        const category = await res.data;
        commit('setCategory', category)
       },
       async createCategory({ commit }, categoryData) {
        const res = await axios.post('http://localhost:4000/categories', categoryData)

        const newCategory = await res.data;
        commit('addCategory', newCategory);
       },
       async editCategory({ commit }, categoryData) {
        const res = await axios.put(`http://localhost:4000/categories/${categoryData._id}`, categoryData)
        
        const newCategory = await res.data;
        commit('updateCategory', newCategory);
       },
       async deleteCategory({ commit }, categoryId) {
            await axios.delete(`http://localhost:4000/categories/${categoryId}`)

            commit('removeCategoryById', categoryId)
       }
    },
    modules: {}
});

export default store;