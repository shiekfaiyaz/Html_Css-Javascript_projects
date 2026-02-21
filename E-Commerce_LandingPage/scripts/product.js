const products = [

    {
        id: 1,
        tittle: "Nike Air-Max Stealth Edition",
        desc: "Experience ultimate comfort with our lightweight, breathable mesh sneakers featuring responsive cushioning technology for peak performance.",
        stars: "4.9 ⭐⭐⭐⭐⭐",
        price: "$10",
        img: "public/images/slider-shoe.png",
        colors: ["🟥", "⬛", "🟩"],
        imgColor: { red: "public/images/slider-shoe.png", blue: "public/images/shoe-6.jpg", green: "public/images/shoes-1.jpg" },
        sizes: ["S", "M", "XL", "XLL"]

    },
    {
        id: 2,
        tittle: "Elite Performance Match Jersey",
        desc: "Stay dry and focused with high-tech moisture-wicking fabric. Tailored for athletes who demand flexibility and style on the field.",
        stars: "4.8 ⭐⭐⭐⭐",
        price: "$15",
        img: "public/images/slider-jersey.png",
        colors: ["🟪", "🟩", "🟦"],
        imgColor: { purple: "public/images/jersey-7.jpg", green: "public/images/jersey-3.jpg", blue: "public/images/jersey-1.jpg" },
        sizes: ["S", "M", "XL"]

    },
    {
        id: 3,
        tittle: "Urban Voyager Multi-Purpose Bag",
        desc: "A rugged, water-resistant backpack featuring ergonomic straps and dedicated compartments for your gym gear and daily essentials.",
        stars: "4.8 ⭐⭐⭐⭐⭐",
        price: "$8",
        img: "public/images/slider-bag.png",
        colors: ["⬛", "🟨"],
        imgColor: { black: "public/images/slider-bag.png", yellow: "public/images/bag-6.jpg" },
        sizes: ["10In", "20In", "30In"]

    },
    {
        id: 4,
        tittle: "Essential Fleece Comfort Hoodie",
        desc: "Crafted from premium heavyweight cotton with a soft-brushed interior, providing superior warmth for both training and street style",
        stars: "4.7 ⭐⭐⭐⭐",
        price: "$12",
        img: "public/images/slider-hoodie.png",
        colors: ["🟪","⬛",, "🔲"],
        imgColor: { purple: "public/images/hoodie-7.jpg",black: "public/images/slider-hoodie.png", lightPurple: "public/images/hoodie-5.jpg" },
        sizes: ["SM", "S", "M", "XL"]

    },
    {
        id: 5,
        tittle: "Pro-Flight Match Football",
        desc: "Precision-engineered aerodynamic design with hand-stitched panels for superior air retention and flight control on any surface.",
        stars: "4.9 ⭐⭐⭐⭐⭐",
        price: "$5",
        img: "public/images/slider-ball.png",
        colors: ["⬛", "🟦", "🟥"],
        imgColor: { black: "public/images/ball-1.png", blue: "public/images/ball-5.jpg", red: "public/images/slider-ball.png" },
        sizes: ["4.2", "4.6", "29.5", "5.0"]

    },

    {
        id: 6,
        tittle: "Quantum Smart Fitness Tracker",
        desc: "Track your goals with precision. Features heart rate monitoring, GPS tracking, and an ultra-durable display for an active lifestyle",
        stars: "4.6 ⭐⭐⭐⭐",
        price: "$8",
        img: "public/images/slider-watch.png",
        colors: ["⚪", "⬛"],
        imgColor: { white: "public/images/watch-6.png", black: "public/images/slider-watch.png" },
        sizes: ["5.5incs", "6.5incs", "X.5incs"]

    },

]

const showProduct = document.querySelectorAll('.buy-now');
const ptittle = document.querySelector('.p-tittle');
const pprice = document.querySelector('.p-price');
const pstars = document.querySelector('.p-reviews');
const pdescr = document.querySelector('.p-desc');
const pimg = document.querySelector('.p-img');
const pcolors = document.querySelector('.product-colors');
// const psizes = document.querySelectorAll('.product-size');
// // const selectSize = document.querySelectorAll('.size1');

// //  console.log(psizes);


showProduct.forEach(function (product, index) {
    product.addEventListener('click', () => {

        // console.log(product, index);
        // console.log(products[0]);
        // chaning text product etc
        ptittle.innerHTML = products[index].tittle;
        pprice.innerHTML = products[index].price;
        pstars.innerHTML = products[index].stars;
        pdescr.innerHTML = products[index].desc;
        pimg.src = products[index].img;

        // change the image color boxes
        pcolors.innerHTML = "";
        products[index].colors.forEach((cls, i) => {
            pcolors.innerHTML += `<div class="color1"> ${cls}</div>`
        });
        const newColorBoxes = document.querySelectorAll('.color1');

        newColorBoxes.forEach((box, i) => {
            box.addEventListener('click', () => {
                const allImages = Object.values(products[index].imgColor);


                pimg.src = allImages[i];

            });
        });



        //    changing sizes text in product section
        const sizeContainer = document.querySelector('.product-size'); // Parent container
        sizeContainer.innerHTML = "";

        products[index].sizes.forEach(size => {
            sizeContainer.innerHTML += `<div class="size1">${size}</div>`;
        });

        // 2 change backgound of selected sizes
        const newSizeBoxes = document.querySelectorAll('.size1');

        newSizeBoxes.forEach((elsize) => {
            elsize.addEventListener('click', () => {

                newSizeBoxes.forEach(s => s.classList.remove('active-size'));

                elsize.classList.add('active-size');

            });
        });


    });

});


//  wishlist products 
const heartBtn = document.querySelector('.heart-icon');
const heartIcon = document.querySelector('.bi-bag-heart-fill');

heartBtn.addEventListener('click', () => {
    // Icon color toggle
    heartIcon.classList.toggle('active-heart');

    // Get current product data
    const productToSave = {
        title: document.querySelector('.p-tittle').innerText,
        price: document.querySelector('.p-price').innerText,
        img: document.querySelector('.p-img').src,
        quantity: 1
    };



    // 1. Pehle puraani list uthao LocalStorage se
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];

    // 2. Check karo agar pehle se hai toh hatao, nahi toh add karo (Toggle)
    const index = wishlist.findIndex(item => item.title === productToSave.title);
    if (index === -1) {
        wishlist.push(productToSave);
        alert("Added to SaveList!");
    } else {
        wishlist.splice(index, 1);
        alert("Removed from SaveList!");
    }

    // 3. Wapas save kar do
    localStorage.setItem('myWishlist', JSON.stringify(wishlist));
});



// more products section6 showing products cards

const moreProducts = [
    {
        category: "shoe",
        title: "Nike Air Max 270",
        price: "$20",
        img: "public/images/shoe-2.jpg"
    },
    {
        category: "shoe",
        title: "Adidas Ultraboost",
        price: "$10",
        img: "public/images/shoe-3.jpg"
    },
    {
        category: "shoe",
        title: "Puma RS-X Sport",
        price: "$30",
        img: "public/images/shoe-4.jpg"
    },
    {
        category: "shoe",
        title: "Reebok Classic White",
        price: "$15",
        img: "public/images/shoe-5.jpg"
    },
    {
        category: "shoe",
        title: "Nike Jordan Low",
        price: "$12",
        img: "public/images/shoe-6.jpg"
    },
    {
        category: "shoe",
        title: "Vans Old Skool",
        price: "$120",
        img: "public/images/shoe-7.avif"
    },
    {
        category: "shoe",
        title: "New Balance 574",
        price: "$14",
        img: "public/images/shoes-1.jpg"
    },

    {
        category: "jersey",
        title: "Real Madrid Home",
        price: "$8",
        img: "public/images/jersey-3.jpg"
    },
    {
        category: "jersey",
        title: "Chelsea Away Kit",
        price: "$15",
        img: "public/images/slider-jersey.png"
    },
    {
        category: "jersey",
        title: "Man City Training",
        price: "$8",
        img: "public/images/jersey-1.jpg"
    },
    {
        category: "jersey",
        title: "PSG Special Edition",
        price: "$18",
        img: "public/images/jersey-2.jpg"
    },
    {
        category: "jersey",
        title: "Arsenal Third Kit",
        price: "$16",
        img: "public/images/jersey-3.jpg"
    },
    {
        category: "jersey",
        title: "Argentina World Cup",
        price: "$8",
        img: "public/images/jersey-4.jpg"
    },

    {
        category: "jersey",
        title: "Argentina new",
        price: "$10",
        img: "public/images/jersey-5.jpg"
    },
    {
        category: "jersey",
        title: "Liverpool FC Red",
        price: "$20",
        img: "public/images/jersey-6.jpg"
    },

    {
        category: "bag",
        title: "Nike Heritage Bag",
        price: "$10",
        img: "public/images/bag-1.png"
    },
    {
        category: "bag",
        title: "Adidas Gym Sack",
        price: "$10",
        img: "public/images/bag-6.jpg"
    },
    {
        category: "bag",
        title: "Puma Phase Backpack",
        price: "$10",
        img: "public/images/bag-2.jpg"
    },
    {
        category: "bag",
        title: "Under Armour Duffel",
        price: "$10",
        img: "public/images/bag-3.jpg"
    },
    {
        category: "bag",
        title: "North Face Mini",
        price: "$10",
        img: "public/images/bag-4.jpg"
    },
    {
        category: "bag",
        title: "Reebok Active Bag",
        price: "$10",
        img: "public/images/bag-5.jpg"
    },
    {
        category: "bag",
        title: "Jordan School Bag",
        price: "$10",
        img: "public/images/bag-6.jpg"
    },
    {
        category: "bag",
        title: "Everest Daily Pack",
        price: "$10",
        img: "public/images/slider-bag.png"
    },
    {
        category: "hoodies",
        title: "Essential Gray Hoodie",
        price: "$14",
        img: "public/images/hoodie-1.png"
    },
    {
        category: "hoodies",
        title: "Nike Tech Fleece",
        price: "$15",
        img: "public/images/hoodie-2.jpg"
    },
    {
        category: "hoodies",
        title: "Adidas 3-Stripes",
        price: "$11",
        img: "public/images/hoodie-3.jpg"
    },
    {
        category: "hoodies",
        title: "Puma Graphic Hoodie",
        price: "$21",
        img: "public/images/hoodie-4.jpg"
    },
    {
        category: "hoodies",
        title: "Oversized Black Fit",
        price: "$22",
        img: "public/images/hoodie-5.jpg"
    },
    {
        category: "hoodies",
        title: "Reebok Warm Up",
        price: "$18",
        img: "public/images/hoodie-6.jpg"
    },
    {
        category: "hoodies",
        title: "Champion Classic",
        price: "$20",
        img: "public/images/hoodie-7.jpg"
    },
    {
        category: "hoodies",
        title: "Urban Street Hoodie",
        price: "$10",
        img: "public/images/slider-hoodie.png"
    },

    {
        category: "ball",
        title: "FIFA Pro Ball",
        price: "$30",
        img: "public/images/ball-6.jpg"
    },
    {
        category: "ball",
        title: "Premier League Match",
        price: "$20",
        img: "public/images/ball-7.jpg"
    },
    {
        category: "ball",
        title: "UEFA Finale Ball",
        price: "$15",
        img: "public/images/ball-8.jpg"
    },
    {
        category: "ball",
        title: "Street Soccer Special",
        price: "$5",
        img: "public/images/ball-9.jpg"
    },
    {
        category: "ball",
        title: "Training Rubber Ball",
        price: "$10",
        img: "public/images/ball-1.png"
    },
    {
        category: "ball",
        title: "Gold Edition Ball",
        price: "$12",
        img: "public/images/ball-2.png"
    },
    {
        category: "ball",
        title: "Indoor Futsal Ball",
        price: "$15",
        img: "public/images/ball-3.jpg"
    },
    {
        category: "ball",
        title: "Classic Pitch Ball",
        price: "$25",
        img: "public/images/slider-ball.png"
    },

    {
        category: "watch",
        title: "Casio Digital G-7",
        price: "$10",
        img: "public/images/slider-watch.png"
    },
    {
        category: "watch",
        title: "Smart Fitness Band",
        price: "$15",
        img: "public/images/watch-1.png"
    },
    {
        category: "watch",
        title: "Apple Watch Sport",
        price: "$20",
        img: "public/images/watch-2.png"
    },
    {
        category: "watch",
        title: "Fossil Chronograph",
        price: "$25",
        img: "public/images/watch-3.png"
    },
    {
        category: "watch",
        title: "Mi Smart Band 6",
        price: "$30",
        img: "public/images/watch-4.png"
    },
    {
        category: "watch",
        title: "Rolex Sub-Style",
        price: "$35",
        img: "public/images/watch-5.png"
    },
    {
        category: "watch",
        title: "Titan Quartz Classic",
        price: "$20",
        img: "public/images/watch-6.png"
    },
    {
        category: "watch",
        title: "Samsung Gear Pro",
        price: "$10",
        img: "public/images/watch-7.png"
    },


];


const sec6container = document.querySelector('.sec6-main');
const viewMorebtns = document.querySelectorAll('.view-more');
// changing cards when viewmore btn is clicked




viewMorebtns.forEach((btns, index) => {
    btns.addEventListener('click', () => {


        switch (index) {
            case 0:
                choice = "shoe";
                break;
            case 1:
                choice = "jersey";
                break;
            case 2:
                choice = "bag";
                break;
            case 3:
                choice = "hoodies";
                break;
            case 4:
                choice = "ball";
                break;
            case 5:
                choice = "watch";
                break;


            default:
                break;
        }

        sec6container.innerHTML = "";
        moreProducts.forEach(function (productCard, i) {
            const show = productCard.category;

              

            if (productCard.category === choice) {

                sec6container.innerHTML += ` <div class="card1">
                <div class="card-img">
                    <img src=${productCard.img} alt=${productCard.title}>
                </div>
                <div class="card-tittle">
                    <p>${productCard.title}</p>
                    <span>${productCard.price}</span>
                </div>`


            }

        });



    });
});










