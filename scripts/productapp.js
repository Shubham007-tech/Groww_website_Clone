let prodContainer = document.getElementById("container");
let data ;
    //To GET data from server
    fetch("https://shubham007-tech.github.io/GrowwDatabase/db.json")
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log("res: ", res);
        viewMf(res)
        data = res;
        
    })
    .catch((err) => {
        console.log(err);
    })


   


var valuelist = document.getElementById('valueList')
var text ='<span> selected are: </span>';
var listArray = []

var amcData=[] ;
var CategoryData=[] ;
var RiskData=[];
var FundData=[];




var checkboxes = document.querySelectorAll('.amctick');
var amc_tick=0;

for( let checkbox of checkboxes){

    checkbox.addEventListener('click' , function(){
        if(this.checked == true){
            ++amc_tick;
            amc(this.value);
           // console.log(data)
        }else{
            console.log("you unchecked" , this.value)
           // No_amc(this.value)
           N_amc(this.value);
        }

    })
}


var c_boxes = document.querySelectorAll('.c_tick');
var catagory_tick=0;


for( let checkbox of c_boxes){

    checkbox.addEventListener('click' , function(){
        
        if(this.checked == true && amc_tick<=0){
            ++catagory_tick;
            console.log("first C invoke" , this.value)
            first_C_filter(this.value);   
                                  
        }
        else if(this.checked == true && amc_tick>=1){
            ++catagory_tick;
            C_filter(this.value);
            // console.log("Cfilter" ,this.value)
        }else{
            console.log("you unchecked" , this.value)
             N_C_filter(this.value)
          
           // No_amc(this.value)
        }

    })
}


function first_C_filter(x){
    let arr = data.filter(function(a) {
                       
        var name = x;
    return  a.category == name ;

    } );
   // amcData = arr;
   CategoryData.push(...arr);
  
  view_after_Catagory(arr)                                   
}





var R_boxes = document.querySelectorAll('.R_tick');
var risk_tick=0

for( let checkbox of R_boxes){

    checkbox.addEventListener('click' , function(){
        if(this.checked == true && (amc_tick<=0 && catagory_tick<=0) )
        {   
            ++risk_tick;
            first_R_filter(this.value);
        }
        else if(this.checked == true){
            ++risk_tick;
            R_filter(this.value);
            // console.log("Catadataaa" ,this.value)
        }else{
            console.log("you unchecked" , this.value)
            N_R_filter(this.value)
           // No_amc(this.value)
        }

    })
}


function first_R_filter(x){
    let arr = data.filter(function(a) {
                    
        var name = x;
    return  a.risk == name ;

    } );
   // amcData = arr;
   RiskData.push(...arr)
  
   view_after_Risk(arr)
}




var F_boxes = document.querySelectorAll('.F_tick');

for( let checkbox of F_boxes){

    checkbox.addEventListener('click' , function(){
        if(this.checked == true && (amc_tick<=0 && catagory_tick<=0 && risk_tick<=0) )
        {
            first_Fund_filter(this.value)

        }
       else if(this.checked == true){
            Fund_filter(Number(this.value));
            // console.log("Catadataaa" ,this.value)
        }else{
            console.log("you unchecked" , this.value)
            N_Fund_filter(Number(this.value));
           // No_amc(this.value)
        }

    })
}


function first_Fund_filter(x){
    let arr = data.filter(function(a) {
    
        var name = x;
    return  a.fund_Category <= name ;

    } );
   // amcData = arr;
   FundData.push(...arr)
  // console.log("afteCfilte" , CategoryData)
  parent.innerHTML = null;
  view_after_Fund(arr)
}



function N_Fund_filter(x){
    let arr = FundData.filter(function(a) {
                      
        var name = x;
    return  a.fund_Category >= name ;

    } );
   
   fund_cont=0;
   FundData.push(...arr)
   
  // console.log("afteCfilte" , CategoryData)
  view_after_Fund(arr)
}






function clear_Tick(){
    
    location.reload();
}


function Fund_filter(x){
    let arr = RiskData.filter(function(a) {
    
        var name = x;
    return  a.fund_Category <= name ;

    } );
   // amcData = arr;
   FundData.push(...arr)
  // console.log("afteCfilte" , CategoryData)
  parent.innerHTML = null;
  view_after_Fund(arr)
}

let fund_cont=0;


function view_after_Fund( d){

   
    
    /*if(fund_cont==0)
    {
        
        fund_cont++;

    } */
   
    d.forEach( function ( el)
    {
       // console.log("im in" , el)
    let div = document.createElement('div');
    div.setAttribute("class" , "MFdiv")

    let img = document.createElement('img');
    img.src= el.product_image;
    img.setAttribute("class" , "icon")

    let amc = document.createElement('p');
    amc.textContent = el.amc;
   

    let name = document.createElement('p');
    name.textContent= el.product_name;
    name.setAttribute("class" , "MFtext");

    let intervalOne = document.createElement("div");
    intervalOne.innerHTML = el.percentage_interval[0];
    intervalOne.setAttribute("class" , "returns" )

    let intervalTwo = document.createElement("div");
    intervalTwo.innerHTML = el.percentage_interval[1];
    intervalTwo.setAttribute("class" , "returns" )

    let intervalThree = document.createElement("div");
    intervalThree.innerHTML = el.percentage_interval[2];
    intervalThree.setAttribute("class" , "returns" )

    
    let subdiv = document.createElement('div')
    subdiv.setAttribute("class" , "sub")

    let risk = document.createElement('div')
    risk.innerHTML= el.risk + "· " + el.category + "· " + el.rating + "★" ;
    risk.setAttribute("class" , "MFsub_text")

    let day = document.createElement('div');
    day.innerHTML= "1D"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"1Y"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"3Y";
    day.setAttribute("class" , "MFsub_text2")

    subdiv.append(risk , day)


    
      div.append( img , name , intervalOne, intervalTwo, intervalThree , subdiv)
    
     

      div.onclick = function () {
        referData(el)
    }
    
      parent.append(div);
    
    
    
     } );


}



function R_filter(x){
    let arr = CategoryData.filter(function(a) {
                    
        var name = x;
    return  a.risk == name ;

    } );
   // amcData = arr;
   RiskData.push(...arr)
  
   view_after_Risk(arr)
}

function N_R_filter(x){
    let arr = RiskData.filter(function(a) {
                    
        var name = x;
    return  a.risk != name ;

    } );
   // amcData = arr;
   RiskData.push(...arr)
  
   viewMf(arr)
}


let risk_cont=0;


function view_after_Risk( d){
    
    if(risk_cont==0)
    {
        parent.innerHTML = null;
        risk_cont++;

    }
    
   
   
    d.forEach( function ( el)
    {
       // console.log("im in" , el)
    let div = document.createElement('div');
    div.setAttribute("class" , "MFdiv")

  
    let img = document.createElement('img');
    img.src= el.product_image;
    img.setAttribute("class" , "icon")
    

    let amc = document.createElement('p');
    amc.textContent = el.amc;
   

    let name = document.createElement('p');
    name.textContent= el.product_name;
    name.setAttribute("class" , "MFtext");

    let intervalOne = document.createElement("div");
    intervalOne.innerHTML = el.percentage_interval[0];
    intervalOne.setAttribute("class" , "returns" )

    let intervalTwo = document.createElement("div");
    intervalTwo.innerHTML = el.percentage_interval[1];
    intervalTwo.setAttribute("class" , "returns" )

    let intervalThree = document.createElement("div");
    intervalThree.innerHTML = el.percentage_interval[2];
    intervalThree.setAttribute("class" , "returns" )

    
    let subdiv = document.createElement('div')
    subdiv.setAttribute("class" , "sub")

    let risk = document.createElement('div')
    risk.innerHTML= el.risk + "· " + el.category + "· " + el.rating + "★" ;
    risk.setAttribute("class" , "MFsub_text")

    let day = document.createElement('div');
    day.innerHTML= "1D"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"1Y"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"3Y";
    day.setAttribute("class" , "MFsub_text2")

    subdiv.append(risk , day)


    
      div.append( img , name , intervalOne, intervalTwo, intervalThree , subdiv)
    
     

      div.onclick = function () {
        referData(el)
    }
    
      parent.append(div);
    
    
    
     } );


}





function C_filter(x){
    let arr = amcData.filter(function(a) {
                       
        var name = x;
    return  a.category == name ;

    } );
   // amcData = arr;
   CategoryData.push(...arr);
  // console.log("afteCfilte" , CategoryData)
  view_after_Catagory(arr)                                   
}



function  N_C_filter(x){
    let arr = CategoryData.filter(function(a) {
       
        var name = x;
    return  a.category != name ;

    } );
   // amcData = arr;
   CategoryData.push(...arr);
  // console.log("afteCfilte" , CategoryData)
  viewMf(arr)                                
}



let catagory_cont=0;

function view_after_Catagory( d){
    
    if(catagory_cont==0)
    {
        parent.innerHTML = null;
        catagory_cont++;

    }
   
   
    d.forEach( function ( el)
    {
       // console.log("im in" , el)
    let div = document.createElement('div');
    div.setAttribute("class" , "MFdiv")

  
    let img = document.createElement('img');
    img.src= el.product_image;
    img.setAttribute("class" , "icon")
    
    let amc = document.createElement('p');
    amc.textContent = el.amc;
   
    let name = document.createElement('p');
    name.textContent= el.product_name;
    name.setAttribute("class" , "MFtext");

    let intervalOne = document.createElement("div");
    intervalOne.innerHTML = el.percentage_interval[0];
    intervalOne.setAttribute("class" , "returns" )

    let intervalTwo = document.createElement("div");
    intervalTwo.innerHTML = el.percentage_interval[1];
    intervalTwo.setAttribute("class" , "returns" )

    let intervalThree = document.createElement("div");
    intervalThree.innerHTML = el.percentage_interval[2];
    intervalThree.setAttribute("class" , "returns" )

    
    let subdiv = document.createElement('div')
    subdiv.setAttribute("class" , "sub")

    let risk = document.createElement('div')
    risk.innerHTML= el.risk + "· " + el.category + "· " + el.rating + "★" ;
    risk.setAttribute("class" , "MFsub_text")

    let day = document.createElement('div');
    day.innerHTML= "1D"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"1Y"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"3Y";
    day.setAttribute("class" , "MFsub_text2")

    subdiv.append(risk , day)


    
      div.append( img , name , intervalOne, intervalTwo, intervalThree , subdiv)
    
     

      div.onclick = function () {
        referData(el)
    }
    
      parent.append(div);
    
    
    
     } );


}




function N_amc(x){
    let arr = amcData.filter(function(a) {
       // console.log("filte", x)
        var name = x;
    return  a.amc != name ;

    } );
   // amcData = arr;
    amcData=[];
    amcData .push(...arr);
  // console.log("arrdata" , amcData)
    viewMf(arr)
}



function amc(x){
    let arr = data.filter(function(a) {
       // console.log("filte", x)
        var name = x;
    return  a.amc == name ;

    } );
   // amcData = arr;
    amcData .push(...arr);
  // console.log("arrdata" , amcData)
    viewMff(arr)
}



function Sorting(){
    let temp = document.getElementById("Sort")
     let name= temp.value;

     if(name=="Rat")
     sortHL();
     else if(name=="Ret")
     Ret_sortHL()
         
}


  function sortHL() {
    
  let arr = data.sort(function(a,b){
   
   return b.rating - a.rating;

  });

  viewMf(arr)

  }
 

  function Ret_sortHL() {
    
  let arr = data.sort(function(a,b){
   
   return b.return_percentage - a.return_percentage;

  });

  viewMf(arr)

  }





let cont=0;

let parent = document.getElementById("right") ;



// this function will Run only when we invoke the tickmark 
function viewMff( d){
    
    if(cont==0)
    {
        parent.innerHTML = null;
        cont++;

    }
   
   
    d.forEach( function ( el)
    {
       // console.log("im in" , el)
    let div = document.createElement('div');
    div.setAttribute("class" , "MFdiv")

  
    
    
    let img = document.createElement('img');
    img.src= el.product_image;
    img.setAttribute("class" , "icon")
    
    

    let amc = document.createElement('p');
    amc.textContent = el.amc;
   


    let name = document.createElement('p');
    name.textContent= el.product_name;
    name.setAttribute("class" , "MFtext");

    let intervalOne = document.createElement("div");
    intervalOne.innerHTML = el.percentage_interval[0];
    intervalOne.setAttribute("class" , "returns" )

    let intervalTwo = document.createElement("div");
    intervalTwo.innerHTML = el.percentage_interval[1];
    intervalTwo.setAttribute("class" , "returns" )

    let intervalThree = document.createElement("div");
    intervalThree.innerHTML = el.percentage_interval[2];
    intervalThree.setAttribute("class" , "returns" )

    
    let subdiv = document.createElement('div')
    subdiv.setAttribute("class" , "sub")

    let risk = document.createElement('div')
    risk.innerHTML= el.risk + "· " + el.category + "· " + el.rating + "★" ;
    risk.setAttribute("class" , "MFsub_text")

    let day = document.createElement('div');
    day.innerHTML= "1D"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"1Y"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"3Y";
    day.setAttribute("class" , "MFsub_text2")

    subdiv.append(risk , day)

      div.append( img , name , intervalOne, intervalTwo, intervalThree , subdiv)
    
     
      div.onclick = function () {
        referData(el)
    }
    
      parent.append(div);
     
    
     } );


}


   

// this function will Run first to load all the funds name and details
function viewMf( d){

    parent.innerHTML = null;
   
    d.forEach( function ( el)
    {
       // console.log("im in" , el)
    let div = document.createElement('div');
    div.setAttribute("class" , "MFdiv")

  
    
    
    let img = document.createElement('img');
    img.src= el.product_image;
    img.setAttribute("class" , "icon")
    


    let name = document.createElement('p');
    name.textContent= el.product_name;
    name.setAttribute("class" , "MFtext");


    let intervalOne = document.createElement("div");
    intervalOne.innerHTML = el.percentage_interval[0];
    intervalOne.setAttribute("class" , "returns" )

    let intervalTwo = document.createElement("div");
    intervalTwo.innerHTML = el.percentage_interval[1];
    intervalTwo.setAttribute("class" , "returns" )

    let intervalThree = document.createElement("div");
    intervalThree.innerHTML = el.percentage_interval[2];
    intervalThree.setAttribute("class" , "returns" )

    let subdiv = document.createElement('div')
    subdiv.setAttribute("class" , "sub")

    let risk = document.createElement('div')
    risk.innerHTML= el.risk + "· " + el.category + "· " + el.rating + "★" ;
    risk.setAttribute("class" , "MFsub_text")

    let day = document.createElement('div');
    day.innerHTML= "1D"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"1Y"+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+"3Y";
    day.setAttribute("class" , "MFsub_text2")

    subdiv.append(risk , day)


    
      div.append( img , name , intervalOne, intervalTwo, intervalThree , subdiv)

      div.onclick = function () {
        referData(el)
    }
    
      parent.append(div);
    
    
    
     } );


}

if (localStorage.getItem("itemData") == null) {
    localStorage.setItem("itemData", JSON.stringify([]));
}


function referData(p) {

    var ProductDes = JSON.parse(localStorage.getItem("itemData"));

    ProductDes = [];

    ProductDes.push(p);
    console.log("pushed" , p)

    localStorage.setItem("itemData", JSON.stringify(ProductDes));

    window.location.href = "groww_product_description.html";
}


