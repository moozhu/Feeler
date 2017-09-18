import Vue from "vue";
import VueRouter from "vue-router";
import utils from 'utils';

VueRouter.prototype.goBack = function(n) {
    let i;
    if (typeof n === 'undefined') {
        i = -1;
    } else {
        i = n
    }

    this.isJavascript = true;
    window.history.go(i);
}
VueRouter.prototype.skip = function(path) {
    this.isJavascript = true;

    let isBack = false;

    if (!isBack) {
        window.location.hash = '#' + path;
    }
}
VueRouter.prototype.switch = function(path) {
    this.isJavascript = true;
    this.replace(path);
}

Vue.use(VueRouter);

if (window.location.hash == '') {
    window.location.hash = '/home';
}

//定义路由
const routes = [{
    path: '/',
    name: 'root',
    component: resolve => {
        require.ensure([], () => {
            resolve(require('root'));
        }, 'root');
    },
    children: [
        {
            path: '/home',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('home'));
                }, 'home');
            }
        }
    ]
}];
const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    
    next();
});
router.afterEach(router => {
    
});

export default router;