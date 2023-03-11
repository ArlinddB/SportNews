import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import VueAwesomePaginate from "vue-awesome-paginate";
import VueSelect from "vue-select";
import './assets/style.css';
import './assets/tailwind.css'
import './firebase';

const app = createApp(App);

app.use(router);

app.use(store);

app.use(VueAwesomePaginate);

app.component("v-select", VueSelect)

app.mount('#app');