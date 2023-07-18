function initFunc() {

    return {
        homePage: false,
        loginPage: true,
        closePay: true,
        isShowing: false,
        purchaseMessage: "",
        userPrice: 0,
        apiInfo: {},
        addFirst: '',
        cartButton: true,
        openCart: false,
        userName: "",
        passWord: "",
        cartCode: "",
        cartPizzas: [],
        featuredPizzas: [],
        id: 0,
        status: "",
        cartTotal: 0.00,
        change: 0,

        getFeaturedPizzas() {

            axios.post('https://pizza-api.projectcodex.net/api/pizzas/featured',
                {
                    "username": localStorage["userName"],
                    "pizza_id": 7
                })

            axios.get(`https://pizza-api.projectcodex.net/api/pizzas/featured?username=${localStorage["userName"]}`)
                .then(result => {
                    this.featuredPizzas = result.data.pizzas;
                })
        },

        pay() {
            axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/pay',
                {
                    "cart_code": localStorage['cartCode'],
                    "amount": this.userPrice
                })
                .then(result => {

                    this.change = (this.userPrice - this.cartTotal).toFixed(2);
                    if (this.change > 0) {
                        this.purchaseMessage = `Transaction was successsful and your Balance is R${this.change}`
                        this.cartPizzas=[];
                        
                    } else {
                        this.purchaseMessage = result.data.message;
                        if(this.purchaseMessage =="Cart payment successfull!"){
                            this.cartPizzas=[];
                        }
                    }
                })

        },

        addToCart(currentPizzaId) {
            axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/add',
                {
                    cart_code: localStorage['cartCode'],
                    pizza_id: currentPizzaId
                })
                .then(result => {
                    this.getCart()
                })


        },

        removeFromCart(currentPizzaId) {
            axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/remove',
                {
                    cart_code: localStorage['cartCode'],
                    pizza_id: currentPizzaId
                }).then(result => {
                    this.getCart()
                })

        },

        createCart() {
            axios.get(`https://pizza-api.projectcodex.net/api/pizza-cart/create?username=${this.userName}`)
                .then(result => {
                    this.cartCode = result.data.cart_code;
                    localStorage['cartCode'] = this.cartCode;
                })
        },

        getCart() {
            let currentCode = localStorage["cartCode"]
            const getCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/${currentCode}/get`
            this.cartData = axios.get(getCartURL).then(result => {
                let cartData = result.data;
                this.cartPizzas = cartData.pizzas;
                this.cartTotal = cartData.total;
                this.id = cartData.id;
                this.status = cartData.status;
            })

            this.openCart = true;
            this.cartButton = false;
        },

        getLeastFeaturedItem(ary, size) {
            var id = 0;
            var featurePiz = {};
            for (let i = 0; i < ary.length; i++) {
                if ((ary[i].id > id) && (size == ary[i].size)) {
                    id = ary[i].id;
                    featurePiz = ary[i];
                }
            }

            this.featuredPizzas.push(featurePiz);
            
            axios.post('https://pizza-api.projectcodex.net/api/pizzas/featured',
                {
                    "username": localStorage["userName"],
                    "pizza_id": id
                })
        },

        init() {
            this.apiInfo = axios.get('https://pizza-api.projectcodex.net/api/pizzas')
                .then(result => {
                    this.getLeastFeaturedItem(result.data.pizzas, "large")
                    this.getLeastFeaturedItem(result.data.pizzas, "medium")
                    this.getLeastFeaturedItem(result.data.pizzas, "small")
                    return result.data;

                })
                .catch(function (error) {
                    console.log(error);
                    return {};
                })
        },

        loggedin: function () {
            this.homePage = true;
            this.loginPage = false;
            localStorage["userName"] = this.userName;
            localStorage["passWord"] = this.passWord;
            this.createCart();
        },

        logout() {
            this.homePage = "";
            this.loginPage = "";
            localStorage["userName"] = "";
            localStorage["cartCode"] = "";
        },

        checkOut: function () {
            this.isShowing = !this.isShowing;
            this.closePay = true;
        },

    };
}