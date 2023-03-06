import { createStore } from 'vuex';
import category from './modules/category'
import post from './modules/post';
import user from './modules/user';
import standings from './modules/standings';

const store = createStore({
    modules: {
        category,
        post,
        user,
        standings,
    },
});

export default store;