import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    createApp({ 
        data() {
        return { 
            input: "",
            copyInput: "",
            result: "",
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
            this.copyInput = this.input;
            // while (this.copyInput.includes("(")) {
            //     this.openParenTracker = this.input.indexOf("(")
            //     this.reverseString(this.input)
            //     this.closeParenTracker = this.input.indexOf(")")
            //     console.log(this.copyInput)
            //     console.log(this.openParenTracker)
            //     console.log(this.closeParenTracker)
            //     const replacement = (eval(this.input.substring(this.openParenTracker + 1, this.closeParenTracker)))
            //     this.copyInput = this.copyInput.replace((this.input.substring(this.openParenTracker, this.closeParenTracker + 1)), replacement)
            //     console.log(this.copyInput)
            // }
            this.answer = eval(this.input)
            console.log(this.answer)
        },
        reverseString(str) { 
            this.reverseStr +=  str.split('').reverse().join(''); 
        }
    } 

}).mount('#app')