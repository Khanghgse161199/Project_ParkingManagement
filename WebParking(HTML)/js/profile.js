var listCustomer = [];
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
window.onload = async function () {
    await CheckToken();
    const ref = firebase.database().ref("/");
    const snapshot = await ref.limitToLast(10).once("value");

    snapshot.forEach((child) => {
        if (child.key == "listCustomer") {
            child.forEach(childSnapshot => {
                listCustomer.push(childSnapshot.val());
            });
        }
    });
    console.log(listCustomer);
    if (listCustomer != null) {
        var idUser = localStorage.getItem("idUser");
        if (!isNullOrEmpty(idUser)) {
            listCustomer.forEach(element => {
                if (element.Id == idUser) {
                    document.getElementById("idUser").value = element.Id;
                    document.getElementById("fristnameUser").value = element.Name;
                    if (isNullOrEmpty(element.Address)) {
                        document.getElementById("addressUser").value = "";
                    } else {
                        document.getElementById("addressUser").value = element.Address;
                    }
                    if (isNullOrEmpty(element.Phone)) {
                        document.getElementById("phoneUser").value = "";
                    } else {
                        document.getElementById("phoneUser").value = element.Phone;
                    }
                    document.getElementById("usernameUser").value = element.UserName;
                    document.getElementById("emailUser").value = element.Email;
                }
            });
        }
    }
    console.log(listCustomer);
}

function updateProfile() { 
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnSave").style.display = "flex";
    document.getElementById("phoneUser").disabled = false;
    document.getElementById("fristnameUser").disabled = false;
    document.getElementById("usernameUser").disabled = false;
    document.getElementById("emailUser").disabled = false;
    document.getElementById("addressUser").disabled = false;

}
function saveProfile() {
    var phone = document.getElementById("phoneUser").value;
    var addrress = document.getElementById("addressUser").value;
    var fristnameUser = document.getElementById("fristnameUser").value;
    var emailUser = document.getElementById("emailUser").value;
    var count = 0;
    var idUser = localStorage.getItem("idUser");
    if (!isNullOrEmpty(phone) && isPhoneNumber(phone)) {
        if (!isNullOrEmpty(addrress)) {
            if (!isNullOrEmpty(idUser)) {
               if(!isNullOrEmpty(fristnameUser)){
                 if(!isNullOrEmpty(emailUser) && isValidEmail(emailUser)){
                    console.log(listCustomer);
                    listCustomer.forEach(element => {
                        if (element.Id == idUser) {
                            console.log("yes");
                            listCustomer[count].Address = addrress;
                            listCustomer[count].Email = document.getElementById("emailUser").value;
                            listCustomer[count].UserName = document.getElementById("usernameUser").value;
                            listCustomer[count].Name = document.getElementById("fristnameUser").value;
                            listCustomer[count].Phone = phone;                                                                                 
                        } else {
                            count++;
                        }
                    });              
                    database.ref('listCustomer/').update(
                        listCustomer
                    )
                    announceSuccess("Update Success");
                    document.getElementById("btnSave").style.display = "none";
                    document.getElementById("btnUpdate").style.display = "flex";
                }else{
                    announceError("Email-Input is null or Unvalid-Email");
                }
               }else{
                announceError("Name-Input is null");
               }
            } else {
                announceError("Id-User is null");
                delay(3000);
                location.replace("Login.html");
            }
        } else {
            announceError("Addrress-Input is null");
        }
    } else {
        announceError("Phone-Input is null or Unvalid-Phone");
    }

}
function isNullOrEmpty(str) {
    return !str || str.length === 0;
}

function announceSuccess(content) {
    iziToast.success({
        title: 'Anounce: ',
        message: content,
        position: 'topRight'
    });
};
function announceError(content) {
    iziToast.error({
        title: 'Error: ',
        message: content,
        position: 'topRight'
    });
};

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPhoneNumber(input) {
    const phoneNumberPattern = /^\d{10}$/; 
    return phoneNumberPattern.test(input);
  }