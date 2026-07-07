// ==========================================
// VELORA ATELIER
// cart.js
// Firebase Cart Display
// ==========================================


import {

getCart,

updateQuantity,

removeCartItem

}

from "./firebase-cart.js";





const cartBox =
document.getElementById(
"cartItems"
);



const totalBox =
document.getElementById(
"cartTotal"
);





// =============================
// LOAD CART
// =============================


async function loadCart(){



const cart =

await getCart();





if(cart.length===0){


cartBox.innerHTML=`

<div class="empty-cart">

<h2>

Your Cart Is Empty

</h2>


<p>
Add luxury products to continue
</p>

</div>

`;



totalBox.innerText="₹0";

return;

}





cartBox.innerHTML="";

let total=0;




cart.forEach(item=>{



total +=

item.price *

item.quantity;





cartBox.innerHTML += `



<div class="cart-card">



<img

src="${item.image}"

>



<div>


<h3>

${item.name}

</h3>



<p>

₹${item.price}

</p>




<div class="quantity">


<button

onclick="changeQty('${item.id}',${item.quantity-1})">

-

</button>



<span>

${item.quantity}

</span>



<button

onclick="changeQty('${item.id}',${item.quantity+1})">

+

</button>



</div>



</div>




<button

onclick="removeItem('${item.id}')">

🗑️

</button>




</div>



`;



});





totalBox.innerText =

"₹"+total.toLocaleString("en-IN");



}







// =============================
// QUANTITY UPDATE
// =============================


window.changeQty = async(

id,

qty

)=>{



if(qty<=0)

return;



await updateQuantity(

id,

qty

);



loadCart();


};







// =============================
// REMOVE ITEM
// =============================


window.removeItem = async(id)=>{


await removeCartItem(id);


loadCart();


};







loadCart();



console.log(
"Firebase Cart Page Ready ✔"
);
