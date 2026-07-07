// ==========================================
// VELORA ATELIER SHOP.JS
// PART 1A
// ==========================================


// DOM Elements

const productCards =
document.querySelectorAll(".product-card");

const searchInput =
document.getElementById("searchInput");

const categoryFilter =
document.getElementById("categoryFilter");

const sortProducts =
document.getElementById("sortProducts");

const productCount =
document.getElementById("productCount");

const cartCount =
document.getElementById("cartCount");

const wishlistCount =
document.getElementById("wishlistCount");


// Data

let cart = JSON.parse(
localStorage.getItem("cart")
) || [];

let wishlist = JSON.parse(
localStorage.getItem("wishlist")
) || [];


// Initialize

updateCounts();


// =============================
// Update Counter
// =============================

function updateCounts(){

cartCount.textContent =
cart.length;

wishlistCount.textContent =
wishlist.length;

}



// =============================
// Product Count
// =============================

function updateProductCount(){

const visibleProducts =
document.querySelectorAll(
".product-card:not(.hide)"
).length;

productCount.textContent =
`Showing ${visibleProducts} Products`;

}



// =============================
// Price Function
// =============================

function getPrice(card){

return Number(
card.dataset.price
);

}



// =============================
// Category Function
// =============================

function getCategory(card){

return card.dataset.category;

}



// =============================
// Product Name
// =============================

function getName(card){

return card.querySelector("h3")
.textContent
.trim();

}



// =============================
// Product Image
// =============================

function getImage(card){

return card.querySelector("img").src;

}



// =============================
// Save Data
// =============================

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}



function saveWishlist(){

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

}



// =============================
// Console
// =============================

console.log(
"Velora Shop Part 1A Loaded"
);
// ==========================================
// VELORA ATELIER SHOP.JS
// PART 1B
// Search + Filter + Sorting
// ==========================================


// =============================
// FILTER PRODUCTS
// =============================

function filterProducts(){

const searchValue =
searchInput.value
.toLowerCase()
.trim();

const selectedCategory =
categoryFilter.value;

productCards.forEach(card=>{

const name =
getName(card).toLowerCase();

const category =
getCategory(card);

const matchSearch =
name.includes(searchValue);

const matchCategory =
selectedCategory==="all" ||
category===selectedCategory;

if(matchSearch && matchCategory){

card.classList.remove("hide");

}else{

card.classList.add("hide");

}

});

updateProductCount();

}



// =============================
// SEARCH
// =============================

if(searchInput){

searchInput.addEventListener(
"input",
filterProducts
);

}



// =============================
// CATEGORY FILTER
// =============================

if(categoryFilter){

categoryFilter.addEventListener(
"change",
filterProducts
);

}



// =============================
// SORT PRODUCTS
// =============================

if(sortProducts){

sortProducts.addEventListener(
"change",
()=>{

const grid =
document.getElementById("productGrid");

const cards =
Array.from(productCards);

switch(sortProducts.value){

case "low-high":

cards.sort((a,b)=>
getPrice(a)-getPrice(b)
);

break;

case "high-low":

cards.sort((a,b)=>
getPrice(b)-getPrice(a)
);

break;

default:

cards.sort((a,b)=>0);

}

cards.forEach(card=>{

grid.appendChild(card);

});

});

}



// =============================
// RESET FILTERS
// =============================

function resetFilters(){

searchInput.value="";

categoryFilter.value="all";

sortProducts.value="default";

productCards.forEach(card=>{

card.classList.remove("hide");

});

updateProductCount();

}



// Initial Count

updateProductCount();

console.log("Search & Filter Ready");
// ==========================================
// VELORA ATELIER SHOP.JS
// PART 1C
// Cart + Wishlist
// ==========================================


// =============================
// Add To Cart
// =============================

document.querySelectorAll(".cart-btn").forEach((button)=>{

button.addEventListener("click",()=>{

const card =
button.closest(".product-card");

const product={

name:getName(card),

price:getPrice(card),

image:getImage(card),

quantity:1

};

const existing=
cart.find(item=>item.name===product.name);

if(existing){

existing.quantity++;

}else{

cart.push(product);

}

saveCart();

updateCounts();

alert(product.name+" added to cart.");

});

});



// =============================
// Wishlist
// =============================

document.querySelectorAll(".wishlist-btn").forEach((button)=>{

button.addEventListener("click",()=>{

const card=
button.closest(".product-card");

const product={

name:getName(card),

price:getPrice(card),

image:getImage(card)

};

const already=
wishlist.find(item=>item.name===product.name);

if(already){

alert("Already in wishlist");

return;

}

wishlist.push(product);

saveWishlist();

updateCounts();

alert(product.name+" added to wishlist.");

});

});



// =============================
// Restore Counts
// =============================

updateCounts();

console.log("Cart & Wishlist Ready");
// ==========================================
// VELORA ATELIER SHOP.JS
// PART 2A.1
// Cart Sidebar + Render
// ==========================================

// =============================
// DOM Elements
// =============================

const cartSidebar = document.getElementById("cartSidebar");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// =============================
// Open / Close Sidebar
// =============================

cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    renderCart();
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// =============================
// Render Cart
// =============================

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your Cart is Empty</h3>
                <p>Add products to start shopping.</p>
            </div>
        `;

        cartTotal.textContent = "₹0";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        html += `
        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <div class="quantity-controls">

                    <button class="minus-btn"
                        data-index="${index}">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button class="plus-btn"
                        data-index="${index}">
                        +
                    </button>

                </div>

            </div>

            <button class="remove-btn"
                data-index="${index}">
                🗑️
            </button>

        </div>
        `;
    });

    cartItems.innerHTML = html;

    cartTotal.textContent = `₹${total}`;

}
// ==========================================
// VELORA ATELIER SHOP.JS
// PART 2A.2
// Quantity Controls
// ==========================================


// =============================
// Quantity Events
// =============================

cartItems.addEventListener("click", (e) => {

    // Increase Quantity
    if (e.target.classList.contains("plus-btn")) {

        const index = Number(
            e.target.dataset.index
        );

        cart[index].quantity++;

        saveCart();

        updateCounts();

        renderCart();

    }


    // Decrease Quantity
    if (e.target.classList.contains("minus-btn")) {

        const index = Number(
            e.target.dataset.index
        );

        if (cart[index].quantity > 1) {

            cart[index].quantity--;

        } else {

            cart.splice(index, 1);

        }

        saveCart();

        updateCounts();

        renderCart();

    }

});


// =============================
// Auto Render on Load
// =============================

renderCart();

console.log("Quantity Controls Ready");
