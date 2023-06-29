function initFunc() {

    return {

        small: 0,
        medium: 0,
        large: 0,
        total: 0,
        varVal: 0,
        closePay: true,
        isShowing: false,
        finalMessage: "",
        showMessage: false,
        userPrice: 0,
        apiInfo: {},
        addFirst: '',
         init() {
         
            this.apiInfo = axios.get('https://pizza-api.projectcodex.net/api/pizzas')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                    return {};
                })
        },

        increaseSmall: function () {
            if (this.varVal > 0) {
                this.small += this.varVal;
                this.total = this.small + this.medium + this.large;
            } else {
                this.addFirst = "Choose pizza before additions or subtractions";
                setTimeout(() => {
                    this.addFirst = '';
                }, 3000);

            }
        },

        increaseMedium: function () {
            if (this.varVal > 0) {
                this.medium += this.varVal;
                this.total = this.small + this.medium + this.large;
            } else {
                this.addFirst = "Choose pizza before additions or subtractions";
                setTimeout(() => {
                    this.addFirst = '';
                }, 3000);
            }
        },

        increaseLarge: function () {
            if (this.varVal > 0) {
                this.total = this.small + this.medium + this.large;
                this.large += this.varVal;
            } else {
                this.addFirst = "Choose pizza before additions or subtractions";
                setTimeout(() => {
                    this.addFirst = '';
                }, 3000);
            }
        },

        decreaseSmall: function () {
            if (this.varVal > 0) {
                if (this.small > 0) {
                    this.small -= this.varVal;
                    this.total = this.small + this.medium + this.large;
                }
            } else {
                this.addFirst = "Choose pizza before additions or subtractions";
                setTimeout(() => {
                    this.addFirst = '';
                }, 3000);
            }
        },

        decreaseMedium: function () {
            if (this.varVal > 0) {
                if (this.medium > 0) {
                    this.medium -= this.varVal;
                    this.total = this.small + this.medium + this.large;
                }
            } else {
                this.addFirst = "Choose pizza before additions or subtractions";
                setTimeout(() => {
                    this.addFirst = '';
                }, 3000);
            }
        },

        decreaseLarge: function () {
            if (this.varVal > 0) {
                if (this.large > 0) {
                    this.large -= this.varVal;
                    this.total = this.small + this.medium + this.large;
                }
            }
            else {
                this.addFirst = "Choose pizza before additions or subtractions";
                setTimeout(() => {
                    this.addFirst = '';
                }, 3000);
            }
        },

        checkOut: function () {
            this.isShowing = !this.isShowing;
            this.closePay = true;
        },

        pay: function () {
            this.showMessage = true;
            this.closePay = false;
            if (this.userPrice < this.total) {
                this.finalMessage = "Indequate funds";
            } else if (this.userPrice > this.total) {
                var p = this.userPrice - this.total;
                this.finalMessage = "Purchase Completed Sucessfully and your balance is R" + p.toFixed(2);
            } else {
                this.finalMessage = "Purchase Completed Sucessfully";
            }
        }

    };
}