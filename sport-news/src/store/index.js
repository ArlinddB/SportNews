import { createStore } from 'vuex';
import category from './modules/category'

const store = createStore({
    modules: {
        category
    }
});

export default store;