const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification_active')
        })
        target.classList.add('qualification_active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification_active')
        })
        tab.classList.add('qualification_active')
    })
})


var firebaseConfig = {
    apiKey: "AIzaSyCZbOLUeJ7SrG1RIXNn5rJF3AMuSb-ubsM",
    authDomain: "fir-js-a0ffd.firebaseapp.com",
    databaseURL: "https://fir-js-a0ffd-default-rtdb.firebaseio.com",
    projectId: "fir-js-a0ffd",
    storageBucket: "fir-js-a0ffd.appspot.com",
    messagingSenderId: "431516565439",
    appId: "1:431516565439:web:0f442709b728d8856fab0a",
    measurementId: "G-376VVRGMHK"
};

// firebase.initializeApp(firebaseConfig);
var database = firebase.database()
var listCustomer = [];


window.onload = async function () {

    document.getElementById("profileLink").style.display = "none";
    document.getElementById("orderLink").style.display = "none";
    document.getElementById("LoginLink").style.display = "flex";
  

    announceSuccess("Let login to get some good-experience.");

    const ref = firebase.database().ref("/");
    const snapshot = await ref.limitToLast(20).once("value");

    snapshot.forEach((child) => {

        if (child.key == "listCustomer") {

            child.forEach(childSnapshot => {
                listCustomer.push(childSnapshot.val());
            });
        }        
    });
      
}


function SignUp() {
    var name = document.getElementById("inputName").value;
    var userName = document.getElementById("inputUserName").value;
    var password = document.getElementById("inputPassword").value;
    var cfPassword = document.getElementById("inputCfPassword").value;
    var email = document.getElementById("inputEmail").value;
    if (!isNullOrEmpty(name)) {
        if (!isNullOrEmpty(userName)) {
            if (!isNullOrEmpty(password)) {
                if (!isNullOrEmpty(cfPassword)) {
                    if (password == cfPassword) {
                        if (!isNullOrEmpty(email)) {
                            if (isValidEmail(email)) {
                                var CustommerAccount = {
                                    Id: generateUserId(10),
                                    Name: name,
                                    UserName: userName,
                                    Password: password,
                                    Email: email,
                                    Phone: "",
                                    Address: "",
                                    IsActive: true,
                                }
                                listCustomer.push(CustommerAccount);
                                listCustomer.forEach(element => {
                                    console.log(element.Name);
                                });                                
                                database.ref('listCustomer/').update(                                   
                                    listCustomer                            
                                )
                                announceSuccess("Sign-Up Success");
                            } else {
                                announceError("Email-Input is wrong format!")
                            }
                        } else {
                            announceError("Email-Input is null!")
                        }
                    } else {
                        announceError("Password and Confirm-Password is wrong!")
                    }
                } else {
                    announceError("Password-Confirm is null!")
                }
            } else {
                announceError("Password-Input is null!")
            }
        } else {
            announceError("UserName-Input is null!")
        }
    } else {
        announceError("Name-Input is null!")
    }
}

async function login(){
    var userName = document.getElementById("userNameInput").value;
    var password = document.getElementById("passwordInput").value;
    console.log(listCustomer);
    var TokenObject;
    for(var i = 0 ; i < listCustomer.length ; i++){
    if(userName == listCustomer[i].UserName){
        if(password == listCustomer[i].Password){
         TokenObject = {
            userId : listCustomer[i].Id,              
            }   
            break;
            }
        }
    }
    if(TokenObject != null){
        var url = "https://localhost:7236/api/Auth/Login";
            
            var repone = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',             
                },
                body: JSON.stringify(TokenObject)
            });
            if (repone.ok) {
                var temp = await repone.text();
                var token = temp; 
                localStorage.setItem("Token",token);
                location.replace("Index.html");
            }
        }else{
            announceError("Sorry UserName or Password is wrong!");
        }
}

function announceSuccess(content) {
    iziToast.success({
        title: 'Anounce: ',
        message: content,
        position: 'topCenter'
    });
};
function announceError(content) {
    iziToast.error({
        title: 'Error: ',
        message: content,
        position: 'topRight'
    });
};

function isNullOrEmpty(str) {
    return !str || str.length === 0;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



function generateUserId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}