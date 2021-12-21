let container = document.getElementById('container');
let data = JSON.parse(localStorage.getItem('groww_cart'));
console.log(data);

let parent = document.getElementById('left_view_cart');
console.log(parent);












function showProduct(data){
    let total_amount = 0;

    let cart_item= document.createElement('h3')
    cart_item.id = 'cart_item';
cart_item.innerHTML = `Total Items (${data.length})`;
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



  

   let bottom = document.createElement('div');
   bottom.id = 'bottom_view';
    let amount = document.createElement('p');
    amount.textContent = `Amount  `;

    let dis = document.createElement('span');
     dis.innerHTML = `<span>&#8377;</span>${price}`;

    bottom.append(amount,dis);

  
    
    sub_sub_div.append(img,name);
 subdiv.append(sub_sub_div);
    div.append(subdiv,bottom);

    div.style.opacity = '0.6';
    parent.append(div);
    console.log(div);
 

})
let tml = document.getElementById('total_amount');
tml.textContent = '₹'+ total_amount;

}
showProduct(data);







