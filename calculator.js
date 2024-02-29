import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
createApp({ 
    data() {
    return { 
        operand: "",
        result: "",
        part1_value: 0,
        part2_value: 0,
    }; 
},

methods: { 
    calculate() {
        // this.operand = event.target.options[event.target.options.selectedIndex].value;
        if (this.operand == "+") {
            this.result = this.part1_value + this.part2_value;
        } else if (this.operand == "-") {
            this.result = this.part1_value - this.part2_value;
        } else if (this.operand == "*") {
            this.result = this.part1_value * this.part2_value;
        } else if (this.operand == "/") {
            this.result = this.part1_value / this.part2_value;
        }
    },
} 

}).mount('#app')