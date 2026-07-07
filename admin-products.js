// ==========================================
// VELORA ATELIER
// admin-products.js
// Product Management System
// ==========================================



// =============================
// Elements
// =============================

const productModal =
document.getElementById("productModal");


const addProductBtn =
document.getElementById("addProductBtn");


const closeModalBtn =
document.getElementById("closeModalBtn");


const saveProductBtn =
document.getElementById("saveProductBtn");


const productList =
document.getElementById("productList");



const productName =
document.getElementById("productName");


const productCategory =
document.getElementById("productCategory");


const productPrice =
document.getElementById("productPrice");


const productImage =
document.getElementById("productImage");



// =============================
// Product Storage
// =============================

let products =
JSON.parse(
localStorage.getItem("products")
)
|| [];



let editProductId = null;



// =============================
// Open Modal
// =============================

if(addProductBtn){

addProductBtn.onclick=()=>{


    productModal.classList.add(
    "active"
    );


    clearForm();


};

}



// =============================
// Close Modal
// =============================

if(closeModalBtn){

closeModalBtn.onclick=()=>{


    productModal.classList.remove(
    "active"
    );


};

}



// =============================
// Clear Form
// =============================

function clearForm(){


    productName.value="";

    productCategory.value="";

    productPrice.value="";

    productImage.value="";


    editProductId=null;


}



// =============================
// Save Product
// =============================

if(saveProductBtn){

saveProductBtn.onclick=()=>{


    const product={


        id:
        editProductId ||
        Date.now(),


        name:
        productName.value,


        category:
        productCategory.value,


        price:
        Number(productPrice.value),


        image:
        productImage.value,


        createdAt:
        new Date()
        .toISOString()


    };



    if(
    !product.name ||
    !product.price
    ){

        alert(
        "Please fill required fields"
        );

        return;

    }



    if(editProductId){


        products =
        products.map(item=>

            item.id===editProductId
            ?
            product
            :
            item

        );


    }

    else{


        products.push(
        product
        );


    }



    saveProducts();


    renderProducts();


    productModal.classList.remove(
    "active"
    );


    clearForm();



};

}



// =============================
// Save Products
// =============================

function saveProducts(){


    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );


}



// =============================
// Render Products
// =============================

function renderProducts(){


    if(!productList)
    return;



    if(products.length===0){


        productList.innerHTML=`

        <tr>

        <td colspan="5">

        No Products Added

        </td>

        </tr>

        `;


        return;

    }




    productList.innerHTML="";



    products.forEach(product=>{


        productList.innerHTML +=`


        <tr>


        <td>

        <img 
        src="${product.image}"
        width="60">

        </td>



        <td>

        ${product.name}

        </td>



        <td>

        ${product.category}

        </td>



        <td>

        ₹${product.price}

        </td>



        <td>


        <button
        onclick="editProduct(${product.id})">

        Edit

        </button>



        <button
        onclick="deleteProduct(${product.id})">

        Delete

        </button>


        </td>



        </tr>


        `;


    });


}



// =============================
// Edit Product
// =============================

window.editProduct=function(id){


    const product =
    products.find(
    item=>item.id===id
    );



    if(product){


        productName.value =
        product.name;


        productCategory.value =
        product.category;


        productPrice.value =
        product.price;


        productImage.value =
        product.image;



        editProductId =
        id;



        productModal.classList.add(
        "active"
        );


    }


};




// =============================
// Delete Product
// =============================

window.deleteProduct=function(id){


    if(
    confirm(
    "Delete this product?"
    )
    ){


        products =
        products.filter(
        item=>item.id!==id
        );



        saveProducts();


        renderProducts();


    }


};



// =============================
// Product Counter
// =============================

function updateProductCount(){


    const counter =
    document.getElementById(
    "totalProducts"
    );


    if(counter){

        counter.textContent =
        products.length;

    }


}



// =============================
// Initialize
// =============================

renderProducts();

updateProductCount();


console.log(
"Admin Product System Loaded ✔"
);
