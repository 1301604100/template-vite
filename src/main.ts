import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import './assets/styles/reset.css';

createApp(App).use(store).use(router).mount('#app');
