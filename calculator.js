import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    createApp({ 
        data() {
        return { 
            input: "",
            result: "",
            history: [],
        }; 
    },

    methods: { 
        appendInput(button) {
            this.input += button;
        },
        deleteInput() {
            this.input = this.input.substring(0, this.input.length - 1);
        },
        calculate() {
            this.result = this.input;
            this.history.push(this.result)
            // make sure that the expression is valid (no letters, no number after sqrt)
            // squared --> must display num^2 instead of num x^2
            // % --> divide number by 100
            // modulo --> convert to % before eval
            // recursively check for ()
            // append the result to history, which displays all the computations done
        },
    } 

}).mount('#app')