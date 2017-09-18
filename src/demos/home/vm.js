import utils from 'utils';

export default {
    name: 'home',
    created() {
        
    },
    data() {
        return {
            
        }
    },
    methods: {
        confirm() {
            this.MessageBox.confirm('这是一条确认信息', '友情提示').then(() => {
                console.log('你点击了确认按钮');
            }).catch(() => {
                console.log('你点击了取消按钮');
            });
        }
    },
    mounted() {
        
    }
};