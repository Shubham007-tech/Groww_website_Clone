let container = document.getElementById('container');
let data = JSON.parse(localStorage.getItem('groww_cart'));
console.log(data);

let parent = document.getElementById('left_view_cart');
console.log(parent);










function showProduct(data){
    if ( data.length == 0){
        container.innerHTML = null
        container.style.flexDirection = 'column';

        let h1 = document.createElement('h1');
        h1.id = 'heading';
        h1.textContent = 'Uh-oh! Your Cart is Empty'


        let img = document.createElement('img');
        img.src = '//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/build/client/images/cart-empty.5f55a0d3.svg';
         
        let btnFund = document.createElement('button');
        btnFund.id = 'explore_fund';

        
        btnFund.innerHTML = `Explore Funds`
        btnFund.onclick = () => {
         window.location.href = `http://127.0.0.1:5502/Front%20end/groww_products.html`;
        }

        container.append(h1,img,btnFund);

    }
    parent.innerHTML = null;
    let total_amount = 0;

    let cart_item= document.createElement('h3')
    cart_item.id = 'cart_item';
cart_item.innerHTML = `My Cart (${data.length})`;
parent.append(cart_item);


    data.forEach(({product_name,price,product_image},index) => {
      
        total_amount += Number(price);


         

        let div = document.createElement('div');
        div.id = 'cart_view';

        let subdiv = document.createElement('div');
        subdiv.id = 'top_view';

        let sub_sub_div = document.createElement('div');
        sub_sub_div.id = 'left_top_view';

    let img = document.createElement('img');
    img.src = product_image;

    let name = document.createElement('h4');
    name.textContent = product_name;

let del = document.createElement('div');
del.id = 'icon';
del.innerHTML = `<i class="material-icons">delete</i>`

  

   let bottom = document.createElement('div');
   bottom.id = 'bottom_view';
    let amount = document.createElement('p');
    amount.textContent = `Amount  `;

    let dis = document.createElement('span');
     dis.innerHTML = `<span>&#8377;</span>${price}`;

    bottom.append(amount,dis);

  
    
    sub_sub_div.append(img,name);
 subdiv.append(sub_sub_div,del);
    div.append(subdiv,bottom);
    parent.append(div);

    del.addEventListener('click',() => {
        remove(index);
    });
let tml = document.getElementById('total_amount');
tml.textContent = '₹'+ total_amount;

})
appendbtn();

}
showProduct(data);



function appendbtn(){
    let btnFund = document.createElement('button');
    btnFund.id = 'explore_fund';

    
    btnFund.innerHTML = `ADD MORE FUNDS`
    btnFund.onclick = () => {
     window.location.href = `http://127.0.0.1:5502/Front%20end/groww_products.html`;
    }
   parent.append(btnFund);
}




function remove(index){
        if ( index == 0){
            data.shift();
        }
        else {
        data.splice(index,index);  
       }  
     console.log(data);
     showProduct(data); 
     localStorage.setItem('groww_cart',JSON.stringify(data));
       
}


function payment_page(){
       let pay = document.getElementById('pay');
    
    pay.onclick = () => {

        window.location.href = 'http://127.0.0.1:5502/Front%20end/groww_payment.html';
    }
    
}
payment_page();