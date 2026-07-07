import {db}

from "./firebase.js";



import {

collection,

addDoc,

getDocs

}

from 

"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";






// Add Collection


const addBtn=document.getElementById("add");



addBtn.onclick=async()=>{


let title=
document.getElementById("title").value;


let category=
document.getElementById("category").value;


let image=
document.getElementById("image").value;



await addDoc(

collection(db,"collections"),

{

title:title,

category:category,

image:image,

createdAt:new Date()

}

);



alert(
"Collection Added Successfully"
);



};








// Load Appointment Data


async function loadAppointments(){


const box=
document.getElementById("appointments");



const snapshot=
await getDocs(
collection(db,"appointments")
);



box.innerHTML="";



snapshot.forEach(doc=>{


let data=doc.data();



box.innerHTML+=`

<div>

<h3>${data.name}</h3>

<p>${data.email}</p>

<p>${data.message}</p>

</div>

<hr>

`;


});


}



loadAppointments();
