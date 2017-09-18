import Vue from 'vue';
import Fastclick from 'fastclick';

Vue.directive('fastclick', {
    inserted: function (el) {
        Fastclick.attach(el);
    }
});

