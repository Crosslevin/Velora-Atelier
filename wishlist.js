// ==========================================
// VELORA ATELIER
// wishlist.js
// Firebase Wishlist System
// ==========================================



import {

collection,

addDoc,

getDocs,

deleteDoc,

doc,

query,

where,

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
// WISHLIST COLLECTION
// =============================


const wishlistRef =
collection(
db,
"wishlist"
);







// =============================
// ADD WISHLIST
// =============================


async function addWishlist(product){



const user =
auth.currentUser;



if(!user){

alert(
"Please login first"
);

return;

}




await addDoc(

wishlistRef,

{


uid:user.uid,


productId:
product.id,


name:
product.name,


price:
product.price,


image:
product.image,


createdAt:
serverTimestamp()


}

);



alert(
"Added to Wishlist ❤️"
);



}








// =============================
// GET USER WISHLIST
// =============================


async function getWishlist(){



const user =
auth.currentUser;



if(!user)
return [];




const q =

query(

wishlistRef,

where(

"uid",

"==",

user.uid

)

);





const snapshot =

await getDocs(q);



let items=[];



snapshot.forEach(item=>{


items.push({

id:item.id,

...item.data()

});


});



return items;



}








// =============================
// REMOVE WISHLIST
// =============================


async function removeWishlist(id){



await deleteDoc(

doc(

db,

"wishlist",

id

)

);



console.log(
"Removed from Wishlist"
);


}








// =============================
// EXPORT
// =============================


export {


addWishlist,

getWishlist,

removeWishlist


};



console.log(
"Wishlist System Ready ✔"
);
