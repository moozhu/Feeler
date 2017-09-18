import Vue from 'vue';
Vue.component('message-box', require('./index.vue'));

export default {
    install(Vue, comp) {
        let messageBox = comp,
            ok_subscription = null,
            cancel_subscription = null;

        Vue.prototype.MessageBox = {};

        Vue.prototype.MessageBox.alert = function (message, title) {
            if (ok_subscription) {
                ok_subscription.unsubscribe();
                ok_subscription = null;
            }

            return new Promise(function (resolve, reject) {
                let observable = messageBox.modalAlert({ message: message, title: title });
                ok_subscription = observable.subscribe(function () {
                    messageBox.close();
                    resolve();
                });
            });
        }

        Vue.prototype.MessageBox.confirm = function (message, title, options) {
            if (ok_subscription) {
                ok_subscription.unsubscribe();
                ok_subscription = null;
            }
            if (cancel_subscription) {
                cancel_subscription.unsubscribe();
                cancel_subscription = null;
            }

            return new Promise(function (resolve, reject) {
                let observableMap = messageBox.modalConfirm({ message: message, title: title, options: options });
                ok_subscription = observableMap.ok.subscribe(function () {
                    messageBox.close();
                    resolve();
                });
                cancel_subscription = observableMap.cancel.subscribe(function () {
                    messageBox.close();
                    reject();
                });
            });
        }
    }
};