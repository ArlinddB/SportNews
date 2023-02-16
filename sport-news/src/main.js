import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import VueAwesomePaginate from "vue-awesome-paginate";
import './assets/style.css';
import './assets/tailwind.css'

const app = createApp(App);

app.use(router);

app.use(store);

app.use(VueAwesomePaginate);

app.mount('#app');