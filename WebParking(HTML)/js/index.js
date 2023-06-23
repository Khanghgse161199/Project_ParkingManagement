async function CheckToken() {
    var url = "https://localhost:7236/api/Auth/CheckToken";
    var Token = localStorage.getItem("Token");
    var TokenObject = {
        accessToken : Token
    }
    if (Token != null || Token != "") {
        var repone = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',             
            },
            body: JSON.stringify(TokenObject)
        });
        if (repone.ok) {
            var temp = await repone.text();
            var tokenObject = JSON.parse(temp); 
            if(tokenObject != null || tokenObject != ""){
               if(tokenObject.role == "User"){
                localStorage.setItem("idUser",tokenObject.idUser)
               }else{
                location.replace("Login.html");
            }
            }else{
                location.replace("Login.html");
            }
        } else {
            location.replace("Login.html");
        }
    } else {
        location.replace("Login.html");
    }
}

async function logOut(){
    console.log("read")
    var url = "https://localhost:7236/api/Auth/LogOut";
    var userId = localStorage.getItem("idUser");
    var token = localStorage.getItem("Token");
    if(userId != null && token != null){
        var objTmp = {
            userId: userId,
            accessToken: token
        }
        var respone = await fetch(url,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',             
            },
            body: JSON.stringify(objTmp)
        });

        if(respone.ok){
            localStorage.setItem("idUser",null);
            localStorage.setItem("Token",null);
            location.replace("Login.html");
        }else{
            announceError("LogOut Error!")
        }

    }else{
        location.replace("Login.html");
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