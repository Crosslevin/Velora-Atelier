// ==========================================
// VELORA ATELIER
// admin-orders.js
// Order Management System
// ==========================================



// =============================
// DOM ELEMENTS
// =============================


const recentOrders =
document.getElementById(
"recentOrders"
);



const totalOrders =
document.getElementById(
"totalOrders"
);



const totalRevenue =
document.getElementById(
"totalRevenue"
);



const totalCustomers =
document.getElementById(
"totalCustomers"
);




// =============================
// LOAD ORDERS
// =============================


let orders =
JSON.parse(
localStorage.getItem("orders")
)
|| [];




// =============================
// RENDER ORDERS
// =============================


function renderOrders(){


    if(!recentOrders)
    return;



    if(orders.length===0){


        recentOrders.innerHTML=`

        <tr>

        <td colspan="5">

        No Orders Found

        </td>

        </tr>

        `;


        return;

    }




    recentOrders.innerHTML="";



    orders
    .slice()
    .reverse()
    .forEach(order=>{


        recentOrders.innerHTML += `


        <tr>


        <td>

        ${order.id}

        </td>



        <td>

        ${order.customer?.name || "Guest"}

        </td>



        <td>

        ₹${order.total.toLocaleString("en-IN")}

        </td>



        <td>

        ${order.paymentStatus || "Pending"}

        </td>



        <td>


        <select 
        onchange="updateOrderStatus('${order.id}',this.value)">


        <option
        ${order.status==="Order Confirmed"?"selected":""}>

        Order Confirmed

        </option>


        <option
        ${order.status==="Processing"?"selected":""}>

        Processing

        </option>



        <option
        ${order.status==="Shipped"?"selected":""}>

        Shipped

        </option>



        <option
        ${order.status==="Delivered"?"selected":""}>

        Delivered

        </option>



        <option
        ${order.status==="Cancelled"?"selected":""}>

        Cancelled

        </option>


        </select>



        <button
        onclick="deleteOrder('${order.id}')">

        Delete

        </button>


        </td>



        </tr>


        `;



    });


}




// =============================
// UPDATE ORDER STATUS
// =============================


window.updateOrderStatus =
function(id,status){



orders =
orders.map(order=>{


    if(order.id===id){


        order.status=status;


    }


    return order;


});



saveOrders();


renderOrders();



};




// =============================
// DELETE ORDER
// =============================


window.deleteOrder =
function(id){



const confirmDelete =
confirm(
"Delete this order?"
);



if(confirmDelete){



orders =
orders.filter(
order=>order.id!==id
);



saveOrders();


renderOrders();


updateStats();


}



};





// =============================
// SAVE ORDERS
// =============================


function saveOrders(){


localStorage.setItem(

"orders",

JSON.stringify(orders)

);


}




// =============================
// DASHBOARD STATS
// =============================


function updateStats(){



if(totalOrders){


totalOrders.textContent =
orders.length;


}




if(totalRevenue){


const revenue =
orders.reduce(

(total,order)=>

total + Number(order.total || 0),

0

);



totalRevenue.textContent =
"₹"+revenue.toLocaleString("en-IN");


}





if(totalCustomers){


const customers =
new Set(

orders.map(
order=>
order.customer?.email
)

);



totalCustomers.textContent =
customers.size;


}



}



// =============================
// INITIALIZE
// =============================


renderOrders();

updateStats();



console.log(
"Admin Orders Module Loaded ✔"
);
