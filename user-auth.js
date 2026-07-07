// ==========================================
// VELORA ATELIER
// user-auth.js
// Customer Authentication
// ==========================================



import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";



import {

GoogleAuthProvider,

signInWithPopup

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";



import {

doc,

setDoc

}

from

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";





// =============================
// USER SIGNUP
// =============================


async function signupUser(

name,

email,

password

){


try{


const result =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const user =
result.user;



await setDoc(

doc(

db,

"users",

user.uid

),

{


name:name,


email:email,


createdAt:

new Date()


}

);



alert(
"Account Created Successfully"
);



window.location.href =
"shop.html";



}


catch(error){


alert(
error.message
);


}



}







// =============================
// USER LOGIN
// =============================


async function loginUser(

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



localStorage.setItem(

"userEmail",

result.user.email

);



window.location.href =
"shop.html";



}


catch(error){


alert(
"Invalid Login Details"
);



}



}








// =============================
// LOGOUT
// =============================


async function logoutUser(){


await signOut(auth);


localStorage.removeItem(
"userEmail"
);



window.location.href =
"login.html";



}







// =============================
// SESSION CHECK
// =============================


onAuthStateChanged(

auth,

(user)=>{


if(user){


console.log(

"User Active:",

user.email

);



}


else{


console.log(
"No User Login"
);


}



});







export {


signupUser,

loginUser,

logoutUser


};



console.log(
"User Authentication Ready ✔"
);
// =============================
// GOOGLE LOGIN
// =============================


async function googleLogin(){


try{


const provider =

new GoogleAuthProvider();



const result =

await signInWithPopup(

auth,

provider

);



const user =
result.user;



await setDoc(

doc(

db,

"users",

user.uid

),

{


name:

user.displayName,


email:

user.email,


photo:

user.photoURL,


loginType:

"Google",


createdAt:

new Date()


},


{

merge:true

}

);





localStorage.setItem(

"userEmail",

user.email

);





window.location.href =
"shop.html";



}



catch(error){


console.log(
error.message
);


alert(
"Google Login Failed"
);


}



}
