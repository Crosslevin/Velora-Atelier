// ==========================================
// VELORA ATELIER
// firebase-auth.js
// Firebase Authentication
// ==========================================


// Firebase Imports

import {

signInWithEmailAndPassword,

signOut,

onAuthStateChanged


}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";



import {

auth

}

from "./firebase-config.js";





// =============================
// LOGIN
// =============================


async function adminLogin(
email,
password
){


try{


const result =

await signInWithEmailAndPassword(

auth,

email,

password

);



console.log(
"Login Success:",
result.user.email
);



window.location.href =
"admin.html";



}


catch(error){



console.log(
error.message
);



alert(
"Invalid Login Details"
);



}


}





// =============================
// LOGOUT
// =============================


async function adminLogout(){


try{


await signOut(auth);



window.location.href =
"admin-login.html";



}

catch(error){


console.log(
error.message
);


}


}





// =============================
// AUTH CHECK
// =============================


function checkAdminAuth(){



onAuthStateChanged(

auth,

(user)=>{


const page =
window.location.pathname;



if(

page.includes("admin.html")

&&

!user

){


window.location.href =
"admin-login.html";


}



if(user){


console.log(

"Admin Active:",

user.email

);


}


});


}





// =============================
// INITIALIZE
// =============================


checkAdminAuth();





// Export

export {

adminLogin,

adminLogout

};


console.log(
"Firebase Auth Ready ✔"
);
