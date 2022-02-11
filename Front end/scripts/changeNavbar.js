let check = JSON.parse(localStorage.getItem('check_Login'));
// console.log(check[0].status);

if(check.length > 0){
    let loginBtn = document.getElementById("login-btn");
    let userAccount = document.getElementById("userAcc");
    loginBtn.setAttribute("class", "dontDisplay");
    userAccount.setAttribute("class", "afterLogin");
}

let user = document.getElementById("user");
let logout = document.getElementById("logOutDropDown");
let count = 0;

user.onclick = () => {
    if(count == 0){
        logout.setAttribute("class", "displayDropDown");
        logout.onclick = () => {
            console.log("log out working");
            check.pop();
            localStorage.setItem("check_Login", JSON.stringify(check));
            logout.setAttribute("class", "noDropDownDisplay");
            location.reload();
        }
        count++;
    }
    else if(count == 1){
        logout.setAttribute("class", "noDropDownDisplay");
        count = 0;
    }
}

