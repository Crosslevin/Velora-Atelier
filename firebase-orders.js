// ==========================================
// VELORA ATELIER
// firebase-orders.js
// Firestore Order System
// ==========================================



import {

collection,

addDoc,

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
// ORDERS COLLECTION
// =============================


const ordersRef =
collection(
db,
"orders"
);






// =============================
// CREATE ORDER
// =============================


async function createOrder(
orderData
){


try{


const order = {


...orderData,


status:
"Order Confirmed",


paymentStatus:
"Pending",


createdAt:
serverTimestamp()


};




const result =

await addDoc(

ordersRef,

order

);



console.log(

"Order Created:",
result.id

);



return result.id;



}

catch(error){


console.log(
error.message
);


}


}







// =============================
// LOAD ORDERS LIVE
// =============================


function loadOrders(
callback
){



onSnapshot(

ordersRef,

(snapshot)=>{


let orders=[];



snapshot.forEach(

(item)=>{


orders.push({

id:item.id,

...item.data()

});


});



callback(orders);



});


}








// =============================
// UPDATE ORDER STATUS
// =============================


async function updateOrderStatus(

id,

status

){



try{


await updateDoc(

doc(

db,

"orders",

id

),

{


status:status


}

);



console.log(

"Status Updated ✔"

);



}


catch(error){


console.log(
error.message
);


}



}







// =============================
// UPDATE PAYMENT STATUS
// =============================


async function updatePaymentStatus(

id,

paymentStatus

){



try{


await updateDoc(

doc(

db,

"orders",

id

),

{


paymentStatus:

paymentStatus


}

);



}


catch(error){


console.log(
error.message
);


}



}








// =============================
// DELETE ORDER
// =============================


async function deleteOrder(

id

){



try{


await deleteDoc(

doc(

db,

"orders",

id

)

);



console.log(

"Order Deleted ✔"

);



}

catch(error){


console.log(
error.message
);


}



}







// =============================
// REVENUE CALCULATOR
// =============================


function calculateRevenue(
orders
){


return orders.reduce(

(total,order)=>


total +

Number(order.total || 0),


0

);


}








// =============================
// EXPORT
// =============================


export {


createOrder,

loadOrders,

updateOrderStatus,

updatePaymentStatus,

deleteOrder,

calculateRevenue


};



console.log(
"Firebase Order System Ready ✔"
);
