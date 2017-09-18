var path = require('path');
module.exports = {
    port: 8082,
    assetsPath: {
        rootDirectory: 'dist',
        jsDirectory: 'js',
        cssDirectory: 'css'
    },
    alias: {
        /* js */
        'utils': path.resolve(__dirname, 'src/js/utils.js'), //工具模块
        'animate': path.resolve(__dirname, 'src/js/animate.js'), //动画
        'validator': path.resolve(__dirname, 'src/js/validator.js'), //变量验证
        'setRem': path.resolve(__dirname, 'src/js/setRem.js'), //设置rem

        /* mixins */
        

        /* plugins */


        /* directive */
        'directive': path.resolve(__dirname, 'src/directive'),
        

        /* components */
        'fe-header': path.resolve(__dirname, 'src/components/header/index.vue'),
        'loading': path.resolve(__dirname, 'src/components/loading/index.vue'),
        'message-box': path.resolve(__dirname, 'src/components/message-box/init.js'),

        /* demo */
        'root': path.resolve(__dirname, 'src/demos/root/index.vue'), //根组件
        'home': path.resolve(__dirname, 'src/demos/home/index.vue'), //首页
    },
    vendor: [
        "es6-promise",
        "vue",
        "vue-router"
    ],
    copy: [ //type => js css img
        
    ],
    pages: [
        {
            name: 'app',
            template: 'src/index.html',
            entry: 'src/index.js',
            // separate: ['mock.js']
        }
    ]
};