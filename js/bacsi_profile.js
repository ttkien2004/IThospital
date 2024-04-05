// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP_0hKxMychNVPfFeozLAytkurhZ6B8Cg",
  authDomain: "ithopital.firebaseapp.com",
  databaseURL: "https://ithopital-default-rtdb.firebaseio.com",
  projectId: "ithopital",
  storageBucket: "ithopital.appspot.com",
  messagingSenderId: "513901096082",
  appId: "1:513901096082:web:449e1809ecbf7c7d860a4b",
  measurementId: "G-WDFCQQ7JX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { 
    getDatabase, ref, set, child, update, remove, get
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js"

const db = getDatabase()

function insertData(id_of_patient){
    let id_ = id_of_patient[0]
    const fullname = document.querySelector(`.fullname${id_}`)
    const sex = document.querySelector(`.sex${id_}`)
    const contact = document.querySelector(`.contact${id_}`)
    const bhyt = document.querySelector(`.bhyt${id_}`)

    set(ref(db, "Long-term-treatment/" + id_of_patient) ,{
        name: fullname.innerHTML,
        sex: sex.innerHTML,
        contact: contact.innerHTML,
        bhyt: bhyt.innerHTML
    })
    .then(() => {
        console.log('Add data successfully!')
    })							
    .catch(err => {
        console.log(err.message)
    })    
}					
function findData(id_of_patient){
    const dbRef = ref(db)
    
    get(child(dbRef, "Doctor/" + id_of_patient))
    .then((snapshot) => {
        if(snapshot.exists()){            
            // const treatButton = document.querySelector(`.${id_of_patient}`)
            const doctorFirstName = document.querySelector('.name-content')
            const doctorLastName = document.querySelector('.last-name')            
            const doctorDegree = document.querySelector('.degree')
            const doctorNumber = document.querySelector('.number-contact')
            const doctorEmail = document.querySelector('.email-contact')

            doctorFirstName.innerHTML = snapshot.val().firstName 
            doctorLastName.innerHTML = snapshot.val().lastName             
            doctorDegree.innerHTML = snapshot.val().degree 
            doctorNumber.innerHTML = '0909000009'
            doctorEmail.innerHTML = snapshot.val().email 
        }else{
            console.log("ID does not exist")
        }
    })
    .catch(err => {
        console.log(err.message)
    })
}
function findPatientData(id_of_patient){     
    const dbRef1 = ref(db, `Doctor/${id_of_patient}`)
    get(child(dbRef1, "patientList/" + id_of_patient))
    .then((snapshot) => {
        if(snapshot.exists()){
            console.log("yes")
            const patient = document.querySelector('.patients1')
            patient.innerHTML = snapshot.val().name 
        }else{
            console.log("no")
        }
    })
    .catch(err => {
        console.log(err.message)
    })
    // get(child(dbRef, "Doctor/" + id_of_patient))
    // .then((snapshot) => {
    //     if(snapshot.exists()){
    //         console.log("yes")            
            
    //     }else{
    //         console.log("id not exist")
    //     }
    // })
    // .catch(err => {
    //     console.log(err.message)
    // })
}
function removeData(id_of_patient){
    remove(ref(db, "booking/" + id_of_patient))
    .then(() => {
        console.log('Remove successfully')
    })
    .catch(err => {
        console.log(err.message)
    })
}

findData("0")
findPatientData("0")
const myProfile = document.querySelector('.self-profile')
myProfile.addEventListener('click', () => {
    location.href='../html/bacsi_profile.html'    
})

