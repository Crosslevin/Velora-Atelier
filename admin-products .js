// ==========================================
// VELORA ATELIER
// admin-products.js
// Product Management System
// ==========================================


// =============================
// DOM ELEMENTS
// =============================

const productModal = document.getElementById("productModal");

const addProductBtn = document.getElementById("addProductBtn");

const closeModalBtn = document.getElementById("closeModalBtn");

const saveProductBtn = document.getElementById("saveProductBtn");

const productList = document.getElementById("productList");


const productName = document.getElementById("productName");

const productCategory = document.getElementById("productCategory");

const productPrice = document.getElementById("productPrice");

const productImage = document.getElementById("productImage");



// =============================
// LOAD PRODUCTS
// =============================

let products = JSON.parse(
    localStorage.getItem("products")
) || [];


let editProductId = null;



// =============================
// OPEN ADD PRODUCT MODAL
// =============================

if(addProductBtn){

addProductBtn.addEventListener(
"click",
()=>{

    clearProductForm();

    productModal.classList.add("active");

});

}



// =============================
// CLOSE MODAL
// =============================

if(closeModalBtn){

closeModalBtn.addEventListener(
"click",
()=>{

    productModal.classList.remove(
        "active"
    );

});

}



// =============================
// SAVE PRODUCT
// =============================

if(saveProductBtn){

saveProductBtn.addEventListener(
"click",
()=>{


    if(
    productName.value.trim()==="" ||
    productPrice.value.trim()===""
    ){

        alert(
        "Please enter product name and price"
        );

        return;

    }



    const product = {

        id:
        editProductId ||
        Date.now(),


        name:
        productName.value.trim(),


        category:
        productCategory.value.trim(),


        price:
        Number(productPrice.value),


        image:
        productImage.value.trim(),


        date:
        new Date()
        .toISOString()

    };




    if(editProductId){


        products =
        products.map(
        item=>{

            return item.id===editProductId
            ?
            product
            :
            item;

        });


    }

    else{


        products.push(product);


    }




    saveProducts();

    renderProducts();

    updateProductCount();


    productModal.classList.remove(
        "active"
    );


    clearProductForm();



});

}




// =============================
// SAVE TO LOCAL STORAGE
// =============================

function saveProducts(){


    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );


}




// =============================
// DISPLAY PRODUCTS
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


productList.innerHTML += `


<tr>


<td>

<img 
src="${product.image}"
alt="${product.name}"
width="60"
height="60">

</td>



<td>

${product.name}

</td>



<td>

${product.category}

</td>



<td>

₹${product.price.toLocaleString("en-IN")}

</td>



<td>


<button 
class="edit-btn"
onclick="editProduct(${product.id})">

Edit

</button>



<button 
class="delete-btn"
onclick="deleteProduct(${product.id})">

Delete

</button>


</td>


</tr>


`;


});


}




// =============================
// EDIT PRODUCT
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
// DELETE PRODUCT
// =============================

window.deleteProduct=function(id){


const confirmDelete =
confirm(
"Are you sure you want to delete this product?"
);



if(confirmDelete){


products =
products.filter(
item=>item.id!==id
);



saveProducts();


renderProducts();


updateProductCount();


}



};




// =============================
// CLEAR FORM
// =============================

function clearProductForm(){


productName.value="";

productCategory.value="";

productPrice.value="";

productImage.value="";


editProductId=null;


}




// =============================
// PRODUCT COUNTER
// =============================

function updateProductCount(){


const totalProducts =
document.getElementById(
"totalProducts"
);



if(totalProducts){


totalProducts.textContent =
products.length;


}


}



// =============================
// INITIAL LOAD
// =============================

renderProducts();

updateProductCount();


console.log(
"Admin Products Module Loaded ✔"
);
