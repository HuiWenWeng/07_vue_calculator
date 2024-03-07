import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    createApp({ 
        data() {
        return { 
            input: "",
            copyInput: "",
            result: "",
            answer: "",
            history: [],
            inputValid: true,
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

            //checking for edge cases
            // checks division by 0
            if (this.copyInput.includes ("÷0")) {
                alert("Error! Cannot divide by zero.");
                inputValid = false;
            }
        
            // checks to make sure there are no letters in the input
            if (/[a-zA-Z]/g.test(this.copyInput)) {
                alert("Error! Unknown variable detected.");
                inputValid = false;
            }

            //changes the operations by making a copy
            this.copyInput = this.input;
            if (this.copyInput.includes("x")) {
                this.copyInput = this.copyInput.replaceAll(/x/g, "*");
            }
            if (this.copyInput.includes("÷")) {
                this.copyInput = this.copyInput.replaceAll(/÷/g, "/");
            }
            // must place % before mod or else mod -> % -> /100
            if (this.copyInput.includes("%")) {
                this.copyInput = this.copyInput.replaceAll(/%/g, "/100");
            }
            if (this.copyInput.includes("mod")) {
                this.copyInput = this.copyInput.replaceAll("mod", "%");
                console.log(this.copyInput)
            }
            if (this.copyInput.includes("π")) {
                this.copyInput = this.copyInput.replaceAll(/π/g, "3.14159265359");
            }
            if (this.copyInput.includes("²")) {
                this.copyInput = this.copyInput.replaceAll(/²/g, "**2");
            }
            if (this.copyInput.includes("√")) {
                // radicand
                this.copyInput = this.copyInput.replaceAll(/√/g, "Math.sqrt()");
            }

            if (this.inputValid == true) {
                this.answer = eval(this.copyInput)
                this.history.push(this.input + " = " + this.answer)
            }
        },
    } 

}).mount('#app')