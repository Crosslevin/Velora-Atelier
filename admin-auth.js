// ==========================================
// VELORA ATELIER
// admin-auth.js
// Admin Authentication System
// ==========================================



// =============================
// ADMIN DETAILS
// (Demo Mode)
// =============================


const ADMIN_EMAIL =
"admin@veloraatelier.com";


const ADMIN_PASSWORD =
"admin123";




// =============================
// LOGIN ELEMENTS
// =============================


const loginForm =
document.getElementById(
"adminLoginForm"
);



const emailInput =
document.getElementById(
"adminEmail"
);



const passwordInput =
document.getElementById(
"adminPassword"
);




// =============================
// LOGIN FUNCTION
// =============================


if(loginForm){


loginForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const email =
emailInput.value.trim();



const password =
passwordInput.value.trim();





if(
email === ADMIN_EMAIL &&
password === ADMIN_PASSWORD
){



localStorage.setItem(
"adminLogin",
"true"
);



localStorage.setItem(
"adminUser",
email
);



alert(
"Login Successful"
);



window.location.href =
"admin.html";



}

else{


alert(
"Invalid Email or Password"
);


}



});


}




// =============================
// PROTECT ADMIN PAGE
// =============================


function protectAdminPage(){


const isAdmin =
localStorage.getItem(
"adminLogin"
);



const page =
location.pathname;



if(

page.includes(
"admin.html"
)

&&

!isAdmin

){


window.location.href =
"admin-login.html";


}



}




// =============================
// LOGOUT FUNCTION
// =============================


function adminLogout(){


localStorage.removeItem(
"adminLogin"
);



localStorage.removeItem(
"adminUser"
);



window.location.href =
"admin-login.html";


}




// =============================
// CHECK LOGIN
// =============================


protectAdminPage();



console.log(
"Admin Authentication Loaded ✔"
);
