import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    createApp({ 
        data() {
        return { 
            operand: "",
            number: "",
            expression: "",
        }; 
    },

    methods: { 
        appendInput(button) {
            this.expression + button;
        },
        deleteInput() {
            this.expression = this.expression.slice();
        }
    } 

}).mount('#app')