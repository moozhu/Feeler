import Vue from "vue";
import router from "./router.js";

import './css/fonts/iconfont.css';
import './index.scss';

//设置rem
import setRem from 'setRem';
setRem();

//组件
import loading from 'loading';
Vue.component('loading', loading);
import header from 'fe-header';
Vue.component('fe-header', header);

//插件
import MessageBox from 'message-box';

//自定义指令
import 'directive/fastclick.js';

//根实例
const app = new Vue({
    router,
    mounted() {
        Vue.use(MessageBox, this.$refs.messageBox);
    }
}).$mount("#view");
