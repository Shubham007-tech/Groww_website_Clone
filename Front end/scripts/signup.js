
function setFormMessage(formElement, type, message){

    var messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    // messageElement.classList.remove("form__message--error");
    messageElement.classList.add(`form__message--${type}`)
}



function signUp(e){

    e.preventDefault()
    

    let signup_form = document.getElementById("signup");

    let firstName = signup_form.firstName.value;
    let lastName = signup_form.lastName.value;
    let email = signup_form.email.value;
    let password = signup_form.password.value;
    let mobileNumber = signup_form.mobileNumber.value;

    if(localStorage.getItem('users') === null){
        localStorage.setItem('users', JSON.stringify([]))
    }



    let user = {
        firstName,
        lastName,
        email,
        password,
        mobileNumber
    }

    if(user.mobileNumber.length === 10){
        let arr = JSON.parse(localStorage.getItem('users'))
        let exist = arr.length && JSON.parse(localStorage.getItem("users")).some(user => user.email === email || user.mobileNumber === mobileNumber);
        
        if(!exist){
            arr.push(user)
            localStorage.setItem('users', JSON.stringify(arr));
            window.location.href = "../Front end/groww_login.html"
            
        }else{
                signup_form.addEventListener("submit", e => {
                    setFormMessage(signup_form, 'error', "User alerady exist...! Please Login")
                    signup_form.classList.remove("form__message--error")
                })
            }
            
    }else{
        signup_form.addEventListener("submit", e => {
            setFormMessage(signup_form, 'error', "Please enter 10 Digit Mobile Number")
            signup_form.classList.remove("form__message--error")
        })
    }
}