document.getElementById("login-btn").addEventListener("click",()=>{

    const userId = document.getElementById("loginId");
    const userVal =userId.value ;

    const userPass = document.getElementById("loginPass");
    const passVal = userPass.value;

    if (userVal =="admin" && passVal == "admin123" ){
        
        alert("login Success")
        window.location.assign("home.html")

    } else {
        
        alert("login failed")
        userId.value = "";
        userPass.value = "";
        return
    }

})