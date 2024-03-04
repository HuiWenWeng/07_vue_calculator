import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    createApp({ 
        data() {
        return { 
            input: "",
            copyInput: "",
            result: "",
            history: [],
            answer: "",
            openParenTracker: 0,
            closeParenTracker: 0,
            reverseStr: ""
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
            // make sure that the expression is valid (no letters, no number after sqrt)
            // squared --> must display num^2 instead of num x^2
            // % --> divide number by 100
            // modulo --> convert to % before eval
            // recursively check for ()
            // append the result to history, which displays all the computations done
            this.copyInput = this.input;
            if (this.input.includes("(")) {
                this.openParenTracker = this.input.indexOf("(")
                this.reverseString(this.input)
                this.closeParenTracker = this.input.indexOf(")")
                console.log(this.copyInput)
                this.copyInput.replace(this.input.substring(this.openParenTracker, this.closeParenTracker + 1), eval(this.input.substring(this.openParenTracker + 1, this.closeParenTracker)).toString())
                console.log(this.copyInput)
            }
        },
        reverseString(str) { 
            this.reverseStr +=  str.split('').reverse().join(''); 
        }
    } 

}).mount('#app')