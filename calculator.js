import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    createApp({ 
        data() {
        return { 
            input: "",
            copyInput: "",
            result: "",
            answer: "",
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
            //changes the operations by making a copy
            this.copyInput = this.input;
            if (this.copyInput.includes("x")) {
                this.copyInput.replace(/x/g, "*")
            }
            if (this.copyInput.includes ("÷")) {
                this.copyInput.replace(/÷/g, "/")
            }
            if (this.copyInput.includes ("mod")) {
                this.copyInput.replace(/mod/g, "%")
            }
            this.answer = eval(this.copyInput)
            
            // checks to make sure there are no letters in the input
            if (/[a-zA-Z]/g.test(this.copyInput)) {
                alert("Error! Unknown variable detected.")
            }

            this.answer = eval(this.copyInput)
            console.log(this.answer)
        },
    } 

}).mount('#app')