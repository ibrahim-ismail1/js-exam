let HomeROW=document.querySelector('.home-defult-row')
let visBtn=document.getElementById('vis-bars')
let linksDiv=document.querySelector('.nav-links')
let linksLi=document.querySelectorAll('.nav-links-content ul li a')
let CategROW=document.querySelector('.home-catg-row')
let AreaROW=document.querySelector('.home-area-row')
let IngeROW=document.querySelector('.home-inge-row')
let HomeDefult=document.querySelector('.home-defult')
let searchROW=document.querySelector('.home-search-row')
let NameSearch=document.getElementById('NameSearch')
let LetterSearch=document.getElementById('letterSearch')
var HomeRowCOL;
var GetMeal;
var getMealName;
var fKey='';
var fValue='';
var API='';
var current;
var deatilsRow=document.querySelector('.deatils-row')
var deatilsDiv=document.querySelector('.deatils')



//we want to let none is defualt and smooth move(jquary)
visBtn.addEventListener('click',function(){
    linksDiv.classList.toggle('d-none')
})
for(let i=0;i<linksLi.length;i++)
{
    linksLi[i].addEventListener('click',function(){
      
        current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        var divID=this.getAttribute('href')
        var divE=document.querySelector(`${divID}`)
        divE.className+=" active";
        fKey=this.getAttribute('key')
        fValue=this.getAttribute('value')
        API=this.getAttribute('API')
        display(fKey,fValue,API).then(getId)
        
    })
    
}
async function getHome(key1,value,API)
{
    var  HomeA= await fetch(`https://themealdb.com/api/json/v1/1/${API}.php${key1}${value}`)
    var HomeArespose=await HomeA.json()
    return HomeArespose;
    
    
}


function displayHome(resp3)
{
    var resp1=resp3.meals;
    var cartona=``
    for(let i=0;i<resp1.length;i++)
    {
        cartona+=` <div class="col-md-3" MealId="${resp1[i].idMeal}" >
        <div class="item position-relative">
            <img src="${resp1[i].strMealThumb}" class="w-100" alt="">
            <div class="overlay d-flex justify-content-start align-items-center">
                <p class="px-2 fs-4 ">${resp1[i].strMeal}</p>
            </div>
        </div>
       
    </div>`
   
    }
   
    HomeROW.innerHTML=cartona;
  
   
    

}
function displayCateg(resp3)
{   var resp1=resp3.categories;
    var cartona=``
    for(let i=0;i<resp1.length;i++)
    {
        cartona+=`  <div sectionName="?c" class="col-md-3 get-meal ">
        <div class="item position-relative w-100">
            <img src="${resp1[i].strCategoryThumb}" class="w-100" alt="">
            <div class="overlay  text-center w-100  ">
                <h2 class="fs-2 category " categoryName="${resp1[i].strCategory}">${resp1[i].strCategory}</h2>
                <p class=" fs-6" >${resp1[i].strCategoryDescription}</p>
            </div>
        </div>
       
    </div>
  `
    }
    CategROW.innerHTML=cartona;
    
    
}
function displayArea(resp3)
{
    var resp1=resp3.meals;
    var cartona=``
    for (let i = 0; i < resp1.length; i++) {
      
        cartona+=` <div sectionName="?a" class="col-md-3 text-center get-meal">
        <div class="area text-white">
            <i class="fa-solid  fa-house-laptop fa-4x"></i>
            <h3 class="category" categoryName="${resp1[i].strArea}" >${resp1[i].strArea}</h3>
        </div>
    </div>`
    }
    AreaROW.innerHTML=cartona;
}
function displayInge(resp3)
{
    var resp1=resp3.meals;
    var cartona=``
    for(let i=0;i<20;i++)
    {
        cartona+=`<div sectionName="?i" class="col-md-3 text-center get-meal">
        <div class="inge text-white">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class="category" categoryName="${resp1[i].strIngredient}" >${resp1[i].strIngredient}</h3>
            <p>${resp1[i].strDescription}</p>
        </div>
    </div>
   `
    }
    IngeROW.innerHTML=cartona;

}
async function display(key1,value,API)
{
  
    
  if(key1!=null){
    let resp2= await getHome(key1,value,API)
   
   if (key1=='?s'&&value=='='){
    displayHome(resp2)
    
    
   
  
   }
   else if(API=='categories')
   {
    displayCateg(resp2)
   

   
   }
   else if(key1=='?a')
   {
    displayArea(resp2)
   }
   else if(key1=='?i')
   {
    displayInge(resp2)
   }
   
  
   displayCtegoryMeals()
  }

}

function displayCtegoryMeals()
{

    GetMeal=document.querySelectorAll('.get-meal')
    getMealName=document.querySelectorAll('.category')
 for(let i=0 ; i<GetMeal.length;i++)
{ 
    
    GetMeal[i].addEventListener('click',async function(){
        getSectionName=GetMeal[i].getAttribute('sectionName')
        var x= await getHome(getSectionName,'='+getMealName[i].getAttribute('categoryName'),'filter'); 
        current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        HomeDefult.className+=' active';
        displayHome(x);
        getId()
        
    }

        ) 
}
}
function displaySearch(resp3)
{
    var resp1=resp3.meals;
    var cartona=``
    for(let i=0;i<resp1.length;i++)
    {
        cartona+=` <div class="col-md-3 "MealId="${resp1[i].idMeal}">
        <div class="item position-relative">
            <img src="${resp1[i].strMealThumb}" class="w-100" alt="">
            <div class="overlay d-flex justify-content-start align-items-center">
                <p class="px-2 fs-4 ">${resp1[i].strMeal}</p>
            </div>
        </div>
    </div>`
    }
    searchROW.innerHTML=cartona;
    getId()
}
function displaySearchCall()
{
   
    NameSearch.addEventListener('keyup',async function(){
        var y=await getHome('?s','='+NameSearch.value,'search')
        if(y.meals!=null)
        {
             displaySearch(y)
        }
        else{
            console.log('error');
        }
    })
    LetterSearch.addEventListener('keyup',async function(){
        
       if(LetterSearch.value!='')
       {
        var z=await getHome('?f','='+LetterSearch.value,'search')
        displaySearch(z)
       }
       
      
    })
    

}
function DisplayDeatils(deatils)
{
    let cartona=`
    <div class="col-md-4 text-white text-center">
    <div class="deatils-img">
        <img src="${deatils[0].strMealThumb}" class="w-100" alt="">
        <h2>${deatils[0].strMeal}</h2>
    </div>
</div>
<div class="col-md-8">
    <div class="deatils-content text-white">
        <h2 class="m-2">Instraction</h2>
        <p class="m-2">${deatils[0].strInstructions}</p>
             <h3 class="m-2">Area: ${deatils[0].strArea}</h3>
             <h3 class="m-2">category: ${deatils[0].strCategory}
             </h3>
             <ul class="list-unstayled d-flex flex-wrap g-3 m-2">
  
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure1} ${deatils[0].strIngredient1}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure2} ${deatils[0].strIngredient2}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure3} ${deatils[0].strIngredient3}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure4} ${deatils[0].strIngredient4}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure5} ${deatils[0].strIngredient5}Lorem, ipsum.</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure6} ${deatils[0].strIngredient6}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure7} ${deatils[0].strIngredient7}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure8} ${deatils[0].strIngredient8}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure9} ${deatils[0].strIngredient9}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure10} ${deatils[0].strIngredient10}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure11} ${deatils[0].strIngredient11}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure12} ${deatils[0].strIngredient12}</li>
                <li class="alert alert-info p-1 m-2">${deatils[0].strMeasure13} ${deatils[0].strIngredient13}</li>
             </ul>
             <h3 class="m-2">Tags:</h3>
             <a href="${deatils[0].strSource}"><button class="btn btn-success m-2">suorce</button></a>
             <a href="${deatils[0].strYoutube}"><button class="btn btn-danger m-2">Youtube</button></a>
    </div>
    `
    deatilsRow.innerHTML=cartona;
}

displaySearchCall()
function getId()
{
    HomeRowCOL=document.querySelectorAll('[MealId]')
    for(let i=0 ;i<HomeRowCOL.length;i++)
    {
        HomeRowCOL[i].addEventListener('click', async function(){
            x=await getHome('?i','='+HomeRowCOL[i].getAttribute('MealId'),'lookup')
            current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            deatilsDiv.className+=' active';
            DisplayDeatils(x.meals)
            
        })
    }
}
// async function test()
// {
//     x=await getHome('?i','='+'53065','lookup')
//     let obj= Object.entries(x.meals[0])
    
//         for (let i = 9; i < 21; i++) {
//             if(obj[i][1]!='')
//             {
//                 console.log(obj[i]);
//             }
            
//         }
 
// }
// test()
