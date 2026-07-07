// ==========================================
// VELORA ATELIER
// wishlist-page.js
// Wishlist Display System
// ==========================================



import {

getWishlist,

removeWishlist

}

from "./wishlist.js";





const wishlistBox =

document.getElementById(

"wishlistProducts"

);







// =============================
// LOAD WISHLIST
// =============================


async function loadWishlist(){



const items =

await getWishlist();





if(items.length===0){


wishlistBox.innerHTML = `


<div class="empty-wishlist">


<h2>

Wishlist Empty

</h2>


<p>

Save your favourite luxury products

</p>


</div>


`;


return;


}





wishlistBox.innerHTML="";





items.forEach(item=>{



wishlistBox.innerHTML += `



<div class="wishlist-card">



<img

src="${item.image}"

alt="${item.name}"

>




<h3>

${item.name}

</h3>



<p>

₹${item.price}

</p>




<button

onclick="removeItem('${item.id}')">

Remove

</button>




<button

onclick="addCart('${item.id}')">

Add To Cart

</button>



</div>



`;



});



}






// =============================
// REMOVE ITEM
// =============================


window.removeItem = async(id)=>{


await removeWishlist(id);


loadWishlist();


};





// =============================
// INIT
// =============================


loadWishlist();



console.log(
"Wishlist Page Ready ✔"
);
