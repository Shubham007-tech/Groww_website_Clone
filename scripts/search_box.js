
let timerId;
let dropdownBox = document.getElementById("dropDown");
let searchInput = document.getElementById("search");
searchInput.oninput = () => {
    deBounce(showData, 1000);
};

function showData(){
    let inputValue = document.getElementById("search").value;
    fetch("http://localhost:3000/api/products")
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log("For Search: ", res);
        let productArr = [];
        res.forEach(function(data){
            let temp = "";
            for(let i = 0; i < data.product_name.length; i++){
                temp += data.product_name[i];
                let tempLower = temp.toLowerCase();
                if(inputValue == temp || inputValue == tempLower){
                    console.log(data.product_name);
                    productArr.push(data);
                }
            }
            dropDown(productArr);
        });

    })
    .catch((err) => {
        console.log(err);
    })
}

function dropDown(product){
    dropdownBox.innerHTML = null;
    dropdownBox.setAttribute("class", "dropDown");
    product.forEach((el) => {
        let div = document.createElement("div");
        div.setAttribute("class", "dropDownDiv");
        let prodName = document.createElement("div");
        prodName.innerHTML = el.product_name;
        prodName.setAttribute("class", "dropDownName");

        div.onclick = () => {
            goToProduct(el);
        }

        div.append(prodName);
        dropdownBox.append(div);
    });
}

let productArr = JSON.parse(localStorage.getItem("itemData"));

function goToProduct(el){
    productArr[0] = el;
    localStorage.setItem("itemData", JSON.stringify(productArr));
    console.log(productArr);
    window.location.href = "groww_product_description.html";
}

function deBounce(func, delay){
    if(timerId){
        clearTimeout(timerId);
    }
    timerId = setTimeout(function(){
        func();
    }, delay);
}

// export { showData, deBounce }; 