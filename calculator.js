import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    createApp({ 
        data() {
        return { 
            input: "",
            copyInput: "",
            result: "",
            answer: "",
            history: [],
            copyHistory: [],
            inputValid: true,
            undoTracker: 0,
            edgeCase: [],
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
                this.copyInput = this.copyInput.replaceAll(/x/g, "*");
            }
            if (this.copyInput.includes("÷")) {
                this.copyInput = this.copyInput.replaceAll(/÷/g, "/");
            }
            if (this.copyInput.includes("π")) {
                this.copyInput = this.copyInput.replaceAll(/π/g, "3.14159265359");
            }
            if (this.copyInput.includes("%")) {
                this.copyInput = this.copyInput.replaceAll(/%/g, "/100");
            }
            if (this.copyInput.includes("mod")) {
                this.copyInput = this.copyInput.replaceAll(/mod/g, "%");
            }
            if (this.copyInput.includes("²")) {
                this.copyInput = this.copyInput.replaceAll(/²/g, "**2");
            }

            //the edge cases where a number appears before a parentheses (it's multiplication)
            if (this.copyInput.includes("(")) {
                this.edgeCase = []
                for (var i=0; i<this.input.length; i++) {
                    if (this.input.charAt(i) == "(") {
                        this.edgeCase.push(i)
                    }
                }
                console.log(this.edgeCase)
                for (var i=0; i<this.edgeCase.length; i++) {
                    if (this.input[this.edgeCase[i] - 1]>='0' && this.input[this.edgeCase[i] - 1]<='9') {
                        this.copyInput = this.copyInput.replace("(", "*(");
                    }
                }
            }
            if (this.copyInput.includes(")")) {
                this.edgeCase = []
                for (var i=0; i<this.input.length; i++) {
                    if (this.input.charAt(i) == ")") {
                        this.edgeCase.push(i)
                    }
                }
                console.log(this.edgeCase)
                for (var i=0; i<this.edgeCase.length; i++) {
                    if (this.input[this.edgeCase[i] + 1]>='0' && this.input[this.edgeCase[i] - 1]<='9') {
                        this.copyInput = this.copyInput.replace(")", ")*");
                    }
                }
            }

            // checks to make sure there are no letters in the input
            if (/[a-zA-Z]/g.test(this.copyInput)) {
                alert("Error! Unknown variable detected.");
                this.inputValid = false;
            }

            //you need to check square root last for our sakes
            if (this.copyInput.includes("√")) {
                this.edgeCase = []
                for (var i=0; i<this.input.length; i++) {
                    if (this.input.charAt(i) == "√") {
                        this.edgeCase.push(i)
                    }
                }
                console.log(this.edgeCase)
                for (var i=0; i<this.edgeCase.length; i++) {
                    if (this.input[this.edgeCase[i] - 1]>='0' && this.input[this.edgeCase[i] - 1]<='9') {
                        this.copyInput = this.copyInput.replace(/√/g, "*Math.sqrt");
                    }
                }
                this.copyInput = this.copyInput.replaceAll(/√/g, "Math.sqrt");
            }

            //checking for edge cases
            // checks division by 0
            if (this.copyInput.includes ("/0")) {
                alert("Error! Cannot divide by zero.");
                inputValid = false;
            }

            if (this.inputValid == true) {
                console.log(this.copyInput)
                this.answer = eval(this.copyInput)
                this.copyHistory.push(this.input)
                this.history.push(this.input + " = " + this.answer)
                this.input = "";
                this.undoTracker = this.history.length;
            }
        },
        undo() {
            if (this.undoTracker > 0) {
                this.input = this.copyHistory[this.undoTracker - 1];
                this.undoTracker -= 1;
            }
            else (
                this.input = ""
            )
        }
    } 

}).mount('#app')