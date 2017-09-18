import utils from 'utils';

export default {
    created() {
        this.history.push(this.$route.path);
    },
    beforeRouteUpdate(to, from, next) {
        let isBack = false;
        for (let i = 0; i < this.history.length; i++) {
            if (this.history[i] === to.path) {
                isBack = true;
                this.history = this.history.slice(0, i + 1);
                break;
            }
        }
        if (!isBack) {
            this.history.push(to.path);
            this.$router.isJavascript = true;
        }

        let isNative = !this.$router.isJavascript;

        if (isBack) {
            this.routerDirection = (!isNative) ? 'back' : '';
            if (this.platform !== 'iOS') {
                this.routerDirection = 'bad-back';
            }
        } else {
            this.routerDirection = (!isNative) ? 'forward' : '';
            if (this.platform !== 'iOS') {
                this.routerDirection = 'bad-forward';
            }
        }

        this.$router.isJavascript = false;

        next();
    },
    data() {
        return {
            routerDirection: 'forward',
            history: []
        }
    },
    mounted() {
        
    }
};