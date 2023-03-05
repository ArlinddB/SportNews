import { createStore } from 'vuex';
import category from './modules/category'
import post from './modules/post';
import user from './modules/user';

const store = createStore({
    modules: {
        category,
        post,
        user
    },
});

export default store;