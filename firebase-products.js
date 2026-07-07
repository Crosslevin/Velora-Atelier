// ==========================================
// VELORA ATELIER
// firebase-products.js
// Firestore Product System
// ==========================================



import {

collection,

addDoc,

getDocs,

doc,

updateDoc,

deleteDoc,

onSnapshot,

serverTimestamp


}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



import {

db

}

from "./firebase-config.js";





// =============================
// PRODUCTS COLLECTION
// =============================


const productsRef =
collection(
db,
"products"
);





// =============================
// ADD PRODUCT
// =============================


async function addProduct(
product
){


try{


await addDoc(

productsRef,

{


name:
product.name,


category:
product.category,


price:
Number(product.price),


image:
product.image,


createdAt:
serverTimestamp()


}

);



console.log(
"Product Added ✔"
);



}


catch(error){


console.log(
error.message
);


}


}







// =============================
// GET PRODUCTS
// =============================


function loadProducts(
callback
){



onSnapshot(

productsRef,

(snapshot)=>{


let products=[];



snapshot.forEach(

(item)=>{


products.push({

id:item.id,

...item.data()

});


});



callback(products);



});


}







// =============================
// UPDATE PRODUCT
// =============================


async function updateProduct(
id,
data
){


try{


const productDoc =
doc(

db,

"products",

id

);



await updateDoc(

productDoc,

data

);



console.log(
"Product Updated ✔"
);



}


catch(error){


console.log(
error.message
);


}



}







// =============================
// DELETE PRODUCT
// =============================


async function deleteProduct(
id
){


try{


await deleteDoc(

doc(

db,

"products",

id

)

);



console.log(
"Product Deleted ✔"
);



}


catch(error){


console.log(
error.message
);


}



}







// =============================
// EXPORT
// =============================


export {

addProduct,

loadProducts,

updateProduct,

deleteProduct

};



console.log(
"Firebase Product System Ready ✔"
);
