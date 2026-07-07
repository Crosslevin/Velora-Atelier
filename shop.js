// ==========================================
// VELORA ATELIER
// shop.js
// Firebase Product Loader
// ==========================================


import {

loadProducts

}

from "./firebase-products.js";





const shopContainer =
document.getElementById(
"productContainer"
);




// =============================
// DISPLAY PRODUCTS
// =============================


function displayProducts(products){



if(!shopContainer)
return;



shopContainer.innerHTML="";



products.forEach(product=>{



shopContainer.innerHTML += `


<div class="product-card">


<img

src="${product.image}"

alt="${product.name}"

>


<h3>

${product.name}

</h3>



<p>

${product.category}

</p>



<strong>

₹${product.price}

</strong>




<button

onclick="addToCart('${product.id}')">

Add To Cart

</button>


</div>


`;



});



}





// =============================
// LOAD FIRESTORE PRODUCTS
// =============================


loadProducts(

(products)=>{


displayProducts(products);


}

);





console.log(
"Shop Firebase Connected ✔"
);
