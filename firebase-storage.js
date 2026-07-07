// ==========================================
// VELORA ATELIER
// firebase-storage.js
// Image Upload System
// ==========================================


import {

ref,

uploadBytes,

getDownloadURL

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";



import {

storage

}

from "./firebase-config.js";





// =============================
// UPLOAD IMAGE
// =============================


async function uploadProductImage(file){



try{


const imageRef =

ref(

storage,

"products/" +

Date.now() +

"-" +

file.name

);





await uploadBytes(

imageRef,

file

);





const url =

await getDownloadURL(

imageRef

);



return url;



}

catch(error){


console.log(
error.message
);


}



}





export {

uploadProductImage

};



console.log(
"Firebase Storage Ready ✔"
);
