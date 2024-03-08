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

    computed: {
        invalidInput() {
            if (this.input.includes ("/0")) {
                this.input = "";
                this.inputValid = false;
                alert("Error! Cannot divide by zero.");
            }
        } 
    },

    watch: {
        history: {
            deep: true,
            handler: function() {
                // console.log("working")
                this.$nextTick(() => {
                    // console.log(this.$refs.resultScroll);
                    this.$refs.resultScroll.scrollTop = this.$refs.resultScroll.scrollHeight;
                });
            }
        },
    },
    // my lords and saviors:
    // https://stackoverflow.com/questions/59378814/vue-js-watch-not-triggering-when-object-is-modified
    // https://stackoverflow.com/questions/40730116/scroll-to-bottom-of-div-with-vue-js
    
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
            if (this.copyInput.includes("×")) {
                this.copyInput = this.copyInput.replaceAll(/×/g, "*");
            }
            if (this.copyInput.includes("÷")) {
                this.copyInput = this.copyInput.replaceAll(/÷/g, "/");
            }
            if (this.copyInput.includes("π")) {
                this.copyInput = this.copyInput.replaceAll(/π/g, "3.14159265359");
            }
            // must be placed before mod
            if (this.copyInput.includes("%")) {
                this.copyInput = this.copyInput.replaceAll(/%/g, "/100");
            }
            if (this.copyInput.includes("mod")) {
                this.copyInput = this.copyInput.replaceAll(/mod/g, "%");
            }
            if (this.copyInput.includes("²")) {
                this.copyInput = this.copyInput.replaceAll(/²/g, "**2");
            }
            if (this.copyInput.includes("√")) {
                this.copyInput = this.copyInput.replaceAll(/√/g, "Math.sqrt");
            }

            // checks for letters in the input
            if (/[a-zA-Z]/g.test(this.input)) {
                this.input = "";
                this.inputValid = false;
                alert("Error! Unknown variable detected.");
            }

            //the edge cases where a number appears before a parentheses (it's multiplication)
            if (this.copyInput.includes("(")) {
                this.edgeCase = []
                for (var i=0; i<this.input.length; i++) {
                    if (this.input.charAt(i) == "(") {
                        this.edgeCase.push(i)
                    }
                }
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
                for (var i=0; i<this.edgeCase.length; i++) {
                    if (this.input[this.edgeCase[i] + 1]>='0' && this.input[this.edgeCase[i] - 1]<='9') {
                        this.copyInput = this.copyInput.replace(")", ")*");
                    }
                }
            }

            // if (this.inputValid == true) {
            this.answer = eval(this.copyInput)
            this.copyHistory.push(this.input)
            this.history.push(this.input + " = " + this.answer)
            this.input = "";
            this.undoTracker = this.history.length;
            // }
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