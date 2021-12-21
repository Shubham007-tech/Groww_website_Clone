let productArr = JSON.parse(localStorage.getItem("itemData"));
console.log(productArr);
// console.log(productArr[0].id = 100);
// console.log(productArr);
let percentageOne = document.getElementById("percentageOne");
let percentageTwo = document.getElementById("percentageTwo");
percentageOne.innerHTML = productArr[0].percentage_interval[2];
percentageTwo.innerHTML = `+${productArr[0].percentage_interval[0]}`;
let titleDet = document.getElementById("titleDetails");
let navDet = document.getElementById("navValue");
let ratingDet = document.getElementById("ratingValue");
let fundSizeDet = document.getElementById("fundValue");

function showDescription(product){
    let divOne = document.createElement("div");
    let productImg = document.createElement("img");
    productImg.src = product[0].product_image;
    productImg.setAttribute("class", "proImg");

    let divTwo = document.createElement("div");
    let productTitle = document.createElement("div");
    productTitle.innerHTML = product[0].product_name;
    productTitle.setAttribute("class", "proName");

    let divThree = document.createElement("div");
    divThree.setAttribute("class", "divThree");
    let equityDet = document.createElement("div");
    equityDet.innerHTML = product[0].category;
    let riskDet = document.createElement("div");
    riskDet.innerHTML = product[0].risk;

    divOne.append(productImg);
    divTwo.append(productTitle);
    divThree.append(equityDet, riskDet);
    titleDet.append(divOne, divTwo, divThree);

    navDet.innerHTML = "₹" + product[0].nav;
    ratingDet.innerHTML = product[0].rating + "★";
    fundSizeDet.innerHTML = "₹" + product[0].fund_size;
}
showDescription(productArr);

if (localStorage.getItem("groww_cart") == null) {
    localStorage.setItem("groww_cart", JSON.stringify([]));
}

let monthlySip = document.getElementById("monthlySip");
let oneTime = document.getElementById("oneTime"); 
let inputLabel = document.getElementById("inputLabel");
let dateLabel = document.getElementById("dateLabel");
let dateInput = document.getElementById("sipCalInput");
let calIcon = document.getElementById("calendarIcon");
let sipInput = document.getElementById("sipAmountInput");
let paymentNote = document.getElementById("paymentNote");

function addToCart(){
    let cartArr = JSON.parse(localStorage.getItem("groww_cart")); 
    if(sipInput.value == "" || sipInput.value < 100 || sipInput.value > 50000){
        alert("Please enter minimum amount");
    }
    else{
        let flag = true;
        for(let i = 0; i < cartArr.length; i++){
            if(cartArr[i].id == productArr[0].id){
                flag = false;
            }
        }
        if(flag){
            productArr[0].price = sipInput.value;
            cartArr.push(productArr[0]);
            localStorage.setItem("groww_cart", JSON.stringify(cartArr));
            console.log(cartArr);
            alert("Product succesfully added to cart");
        }
        else{
            alert("Product is already added to cart");
        }
    }
}

function goToCart(){
    window.location.href = "groww_cart.html";
}

function showMonthlySip(){
    oneTime.setAttribute("class", "whenNotClicked");
    monthlySip.setAttribute("class", "whenClicked");
    dateLabel.setAttribute("class", "letDisplay");
    dateInput.setAttribute("class", "letDisplay");
    calIcon.setAttribute("class", "letDisplay");
    paymentNote.setAttribute("class", "letDisplay");
    inputLabel.innerHTML = "SIP Amount";
}

function showOneTime(){
    oneTime.setAttribute("class", "whenClicked");
    monthlySip.setAttribute("class", "whenNotClicked");
    dateLabel.setAttribute("class", "doNotDisplay");
    dateInput.setAttribute("class", "doNotDisplay");
    calIcon.setAttribute("class", "doNotDisplay");
    paymentNote.setAttribute("class", "doNotDisplay");
    inputLabel.innerHTML = "Amount";
}

function calendar(){
    let temp = dateInput.value;
    let newDate = temp.split("").map(Number);
    if(newDate[5] == 0 && newDate[6] == 9){
        newDate[5] = 1;
        newDate[6] = 0;
    }
    else if(newDate[5] == 0 && newDate[6] < 9){
        newDate[6] += 1;
    }
    else if((newDate[5] == 1 && newDate[6] == 0) || (newDate[5] == 1 && newDate[6] == 1)){
        newDate[6] += 1;
    }
    else if(newDate[5] == 1 && newDate[6] == 2){
        newDate[5] = 0;
        newDate[6] = 1;
        newDate[3] += 1;
    }  
    let date = [];
    let month = [];
    let year = [];
    date.push(newDate[8], newDate[9]);
    month.push(newDate[5], newDate[6]);
    year.push(newDate[0], newDate[1], newDate[2], newDate[3]);
    newDate = (`${date.join("")}-${month.join("")}-${year.join("")}`);
    paymentNote.innerHTML = "Next SIP Instalment on " + newDate;
}

//return calculation
let rangeValue = document.getElementById("rangeValue");
let totalInvest = document.getElementById("returnCalDetOne");
let interestReturn = document.getElementById("returnCalDetTwo");
let oneYear = document.getElementById('intervalOneYear');
let threeYear = document.getElementById('intervalThreeYear');
let fiveYear = document.getElementById('intervalFiveYear');
let flagOneYear = true;
let flagThreeYear = false;
let flagFiveYear = false;

oneYear.onclick = () => {
    flagOneYear = true;
    flagThreeYear = false;
    flagFiveYear = false;
    oneYear.setAttribute("class", "onclicked");
    threeYear.setAttribute("class", "onNotclicked");
    fiveYear.setAttribute("class", "onNotclicked");
    totalInvest.innerHTML = `Total investment of ₹60000`;
    interestReturn.innerHTML = "";
}

threeYear.onclick = () => {
    flagThreeYear = true;
    flagOneYear = false;
    flagFiveYear = false;
    oneYear.setAttribute("class", "onNotclicked");
    threeYear.setAttribute("class", "onclicked");
    fiveYear.setAttribute("class", "onNotclicked");
    totalInvest.innerHTML = `Total investment of ₹180000`;
    interestReturn.innerHTML = "";
}

fiveYear.onclick = () => {
    flagThreeYear = false;
    flagOneYear = false;
    flagFiveYear = true;
    oneYear.setAttribute("class", "onNotclicked");
    threeYear.setAttribute("class", "onNotclicked");
    fiveYear.setAttribute("class", "onclicked");
    totalInvest.innerHTML = `Total investment of ₹300000`;
    interestReturn.innerHTML = "";
}


let prin = document.getElementById('pr');
let retrunPercent = productArr[0].return_percentage;
retrunPercent = +retrunPercent;

prin.addEventListener('input', () => calculate(prin));

function calculate(prin) {
    let p = prin.value;

    if(flagOneYear){
        let totalInvestment = p * 12;
        let newReturn = (((retrunPercent/100) * totalInvestment) + totalInvestment).toFixed(2);

        rangeValue.innerHTML = `₹${p} per month`;
        totalInvest.innerHTML = `Total investment of ₹${totalInvestment}`;
        interestReturn.innerHTML = `Would have become ₹${newReturn} (+${retrunPercent})`
    }
    else if(flagThreeYear){
        let totalInvestment = p * 36;
        let newReturn = (((retrunPercent/100) * totalInvestment) + totalInvestment).toFixed(2);

        rangeValue.innerHTML = `₹${p} per month`;
        totalInvest.innerHTML = `Total investment of ₹${totalInvestment}`;
        interestReturn.innerHTML = `Would have become ₹${newReturn} (+${retrunPercent})`
    } 
    else if(flagFiveYear){
        let totalInvestment = p * 60;
        let newReturn = (((retrunPercent/100) * totalInvestment) + totalInvestment).toFixed(2);

        rangeValue.innerHTML = `₹${p} per month`;
        totalInvest.innerHTML = `Total investment of ₹${totalInvestment}`;
        interestReturn.innerHTML = `Would have become ₹${newReturn} (+${retrunPercent})`
    } 
}

export { showDescription, addToCart, goToCart, showMonthlySip, showOneTime, calendar };
