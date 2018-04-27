import Vue from 'vue';

import Hello from './Hello.vue';

new Vue({
    el: '#root',
    template: '<Hello/>',
    components: {
        Hello
    }
})