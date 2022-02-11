let arr = document.querySelectorAll("form");
arr.forEach(x => x.addEventListener('submit', paymentMethod));
let i = 0;

let selectedType = 'upi';

let upi = document.getElementById('upi');
let creditCard = document.getElementById('creditCard');
let netBanking = document.getElementById('netBanking');

const options = [upi, netBanking, creditCard]

options.forEach((item, i, array) => {
    const currentItem = i;

    item.addEventListener('click', (e) => {

        const currentType = e.path.filter(ele => {
            const type = ele.dataset?.type;

            if (Boolean(type)) {
                selectedType = type
            }
        })

        if (selectedType === array[currentItem].id) {
            arr[currentItem].classList.add('open');


            options.filter((item, i) => i !== currentItem).forEach(element => {
                const elemntForm = element.querySelector('form')
                elemntForm.classList.remove('open')

            })
        }
    })
})

arr[0].classList.add('open')



function paymentMethod(e) {
    e.preventDefault();
    const curButton = e.target.id;
    const upicheck = /[a-zA-Z0-9\.\-]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/;
    const netBankingcheck = /^(?=[a-zA-Z0-9.]{8,20}$)(?!.*[.]{2})[^.].*[^.]$/;
    const creditCardcheck = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    // console.log('success!!!' + e.target.id);
    if(curButton=='upiData'){
        if(upicheck.test(e.target.vpa.value)){
            window.location.href = "groww_successPage.html";
        }
        else{
            alert("Enter a valid UPI Id");
        }
    }
    else if(curButton=='netBankingData'){
        if(netBankingcheck.test(e.target.username.value)){
            window.location.href = "groww_successPage.html";
        }
        else{
            alert('Enter a valid net banking username')
        }
    }
    else if(curButton=='creditCardData'){
        if(creditCardcheck.test(e.target.creditCardNumber)){
            window.location.href = "groww_successPage.html";
        }
        else{
            alert('Enter a valid credit card number');
        }
    }
   // window.location.href = "groww_successPage.html";
}