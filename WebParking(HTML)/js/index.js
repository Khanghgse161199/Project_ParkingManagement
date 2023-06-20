async function CheckToken() {
    var url = "https://localhost:7236/api/Token/CheckToken";
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

