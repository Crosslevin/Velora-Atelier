
// ===============================
// Velora Atelier Script
// ===============================


// Page Loading Animation

window.addEventListener("load",()=>{

    const loader = document.getElementById("loader");

    if(loader){

        setTimeout(()=>{

            loader.style.display="none";

        },1200);

    }

});




// ===============================
// Mobile Menu
// ===============================


const menuBtn = document.querySelector(".menu-btn");

const nav = document.querySelector("nav");


if(menuBtn){

menuBtn.addEventListener("click",()=>{


    nav.classList.toggle("active");


});

}





// ===============================
// Smooth Navigation
// ===============================


document.querySelectorAll("nav a").forEach(link=>{


link.addEventListener("click",(e)=>{


let target=document.querySelector(
link.getAttribute("href")
);


if(target){

e.preventDefault();


target.scrollIntoView({

behavior:"smooth"

});


}


});


});






// ===============================
// Scroll Reveal Animation
// ===============================


const revealElements=document.querySelectorAll(
".fashion-card, .service-card, .review-box, .gallery img"
);



const observer=new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";


}


});


},{

threshold:0.2

});



revealElements.forEach(el=>{


el.style.opacity="0";

el.style.transform="translateY(40px)";

el.style.transition="0.7s";


observer.observe(el);


});






// ===============================
// Appointment Form
// ===============================


const form=document.querySelector("form");


if(form){


form.addEventListener("submit",(e)=>{


e.preventDefault();



alert(
"Thank you! Your appointment request has been received."
);



form.reset();



});


}






// ===============================
// Current Year Footer
// ===============================


const year=new Date().getFullYear();


const footerText=document.querySelector("footer p:last-child");


if(footerText){


footerText.innerHTML=
`© ${year} Velora Atelier. All Rights Reserved.`;


}







// ===============================
// Future Firebase Connection
// ===============================


// Firebase Authentication
// Firestore Database
// Image Upload
// Admin Dashboard
// Booking Management
//
// Add firebase.js connection here







console.log(
"Velora Atelier Website Loaded Successfully ✨"
);
