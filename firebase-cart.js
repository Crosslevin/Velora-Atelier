// ==========================================
// VELORA ATELIER
// firebase-cart.js
// Firestore Cart System
// ==========================================


import {

collection,

addDoc,

getDocs,

query,

where,

updateDoc,

deleteDoc,

doc,

serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



import {

db,

auth

}

from "./firebase-config.js";





// =============================
// CART COLLECTION
// =============================


const cartRef =
collection(
db,
"cart"
);






// =============================
// ADD TO CART
// =============================


async function addToCart(product){


const user =
auth.currentUser;



if(!user){

alert(
"Please Login First"
);

return;

}




// Check Existing Product


const q = query(

cartRef,

where(
"uid",
"==",
user.uid
),

where(
"productId",
"==",
product.id
)

);




const snapshot =
await getDocs(q);





if(!snapshot.empty){


const item =
snapshot.docs[0];



await updateDoc(

doc(

db,

"cart",

item.id

),

{


quantity:

item.data().quantity + 1


}

);



}

else{


await addDoc(

cartRef,

{


uid:user.uid,


productId:product.id,


name:product.name,


price:product.price,


image:product.image,


quantity:1,


createdAt:
serverTimestamp()


}

);



}



alert(
"Added To Cart 🛒"
);



}








// =============================
// GET CART
// =============================


async function getCart(){



const user =
auth.currentUser;



if(!user)
return [];





const q = query(

cartRef,

where(

"uid",

"==",

user.uid

)

);




const snapshot =

await getDocs(q);



let cart=[];



snapshot.forEach(item=>{


cart.push({

id:item.id,

...item.data()

});


});



return cart;



}








// =============================
// UPDATE QUANTITY
// =============================


async function updateQuantity(

id,

quantity

){



await updateDoc(

doc(

db,

"cart",

id

),

{


quantity:Number(quantity)


}

);



}








// =============================
// REMOVE CART ITEM
// =============================


async function removeCartItem(id){



await deleteDoc(

doc(

db,

"cart",

id

)

);



}







export {


addToCart,

getCart,

updateQuantity,

removeCartItem


};



console.log(
"Firebase Cart Ready ✔"
);
