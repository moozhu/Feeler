import { Observable } from 'rxjs/Observable';
import fromEvent from 'rxjs/add/observable/fromEvent';

export default {
    name: 'v-modal',
    data() {
        return {
            show: false,
            type: '',
            message: '',
            title: '',
            callback: null,
            buttonText: {
                'ok': '确定',
                'cancel': '取消'
            }
        }
    },
    methods: {
        modal(message, title) {
            this.message = message;
            this.title = title;
            this.callback = null;
            this.show = true;
        },
        modalAlert(params = {}) {
            this.type = 'alert';
            this.modal(params.message, params.title == null ? '提示' : params.title);
            let observable = Observable.fromEvent(document.querySelector('#msg-ok'), 'click');
            return observable;
        },
        modalConfirm(params = {}) {
            this.type = 'confirm';
            if (params.options && params.options.buttonText) {
                this.buttonText = Object.assign({}, this.buttonText, params.options.buttonText);
            }
            this.modal(params.message, params.title || '确认');
            return {
                'ok': Observable.fromEvent(document.querySelector('#msg-ok'), 'click'),
                'cancel': Observable.fromEvent(document.querySelector('#msg-cancel'), 'click')
            }
        },
        close() {
            this.show = false;
            setTimeout(() => {
                this.buttonText = {
                    'ok': '确定',
                    'cancel': '取消'
                };
            }, 200);
        }
    }
}
