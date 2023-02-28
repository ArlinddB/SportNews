import { createStore } from 'vuex';
import category from './modules/category'
import post from './modules/post';

const store = createStore({
    modules: {
        category,
        post
    },
});

export default store;