// ==========================================
// VELORA ATELIER
// checkout.js
// Firebase Checkout System
// ==========================================


import {

createOrder

}

from "./firebase-orders.js";




// =============================
// ELEMENTS
// =============================


const checkoutForm =
document.getElementById(
"checkoutForm"
);




// =============================
// CART LOAD
// =============================


let cart =
JSON.parse(
localStorage.getItem("cart")
)
|| [];




// =============================
// TOTAL CALCULATION
// =============================


function calculateTotal(){


return cart.reduce(

(sum,item)=>

sum +

Number(item.price) *

Number(item.quantity || 1),


0

);


}






// =============================
// PLACE ORDER
// =============================


if(checkoutForm){



checkoutForm.addEventListener(

"submit",

async(e)=>{


e.preventDefault();



const customer = {



name:

document.getElementById(
"customerName"
).value,



email:

document.getElementById(
"customerEmail"
).value,



phone:

document.getElementById(
"customerPhone"
).value,



address:

document.getElementById(
"customerAddress"
).value



};






const orderData = {


customer,


products:cart,


subtotal:

calculateTotal(),



shipping:

0,



total:

calculateTotal()



};





const orderId =

await createOrder(

orderData

);





if(orderId){



alert(

"Order Placed Successfully"

);




localStorage.removeItem(
"cart"
);




window.location.href =
"success.html";



}




}

);

}
