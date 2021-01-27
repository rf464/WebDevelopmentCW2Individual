

new Vue({

    el: '#app',

    data: {

        title: "After School Club",
        showProduct: true,
        
        order: {
            fullName: "",
            phoneNumber: "",
            address: "",
            city: "",
            postcode: ""
        },
        cities: {
            London: "London",
            Luton: "Luton",
            Watford: "Watford",
            Birmingham: "Birmingham",
            Liverpool: "Liverpool"
        },

        lessons: lessons,
        // lesson: {

        //     id: 1001,
        //     spacesLeft: 10,
        //     image: './images/maths.png',
        //     subject: "Math",
        //     location: "London",
        //     price: "Price: 100",
        //     numberOfSpaces: "Number of spaces: ",
        //     rating: 3
        // },

        cart: []


    },

    
    methods: {
        
        showCheckout() {
            this.showProduct = false;
        },
        
        goBack() {
            this.showProduct = true;
        },
        
        canAddToCart: function (lesson) {
            return lesson.spacesLeft != 0;
        },
        
        addToCart(lesson) {//function that decrements the counter if it is bigger than 5


            this.cart.push(lesson);
            lesson.spacesLeft--;


        },
        removeFromCheckout: function (lesson) {
            this.cart.pop(lesson);
            lesson.spacesLeft++;
        },

        
        placeOrder() {
            alert("Order Submited")
        },
        
        
        // compare() {
        //         if (this.lessons.length > 0) {
        //                 let lessonsArray = this.lessons.slice(0);
        //                 function compare(a, b) {
        //                         if (a.title.toLowerCase() < b.title.toLowerCase())
        //                             return -1;
        //                         if (a.title.toLowerCase() > b.title.toLowerCase())
        //                             return 1;
        //                     }
        //                 }
                    
                    
        //             },

    },
                    computed: {
                        cartItemCount: function () {
                            return this.cart.length || '';
                        },
                    },
                    
                
                
            })
            
