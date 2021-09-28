let dishes = [
  new Dish('Mastava', '15000 so\'m ', 20, './images/foto1.svg', 0),
  new Dish('Sho\'rva', '18000 so\'m ', 15, './images/foto2.svg', 0),
  new Dish('Qaynatma sho\'rva', '15 000 so\'m', 4, './images/foto2.svg', 0),
  new Dish('To\'y osh', '25000 so\'m', 20, './images/foto3.svg', 1),
  new Dish('Zig\'ir osh', '25000 so\'m', 4, './images/foto2.svg', 1),
  new Dish('Manti', '18000 so\'m', 4, './images/foto3.svg', 2),
  new Dish('Svejiy salat', '8000 so\'m', 4, './images/foto2.svg', 3),
  new Dish('Norin', '20000 so\'m', 4, './images/foto2.svg', 2),
  new Dish('Chuchvara', '22000 so\'m', 4, './images/foto3.svg', 2),
  new Dish('Achchi chuchuk', '8000 so\'m', 4, './images/foto2.svg', 3),
];

let dishTypes = [ 'Sho\'rva', 'Osh', 'Xamirli taomlar', 'Salatlar'];

function Dish(name, price, count, photo, dishType) {
  this.name = name;
  this.price = price;
  this.count = count;
  this.photo = photo;
  this.dishType = dishType;
}

const boxesEl = document.getElementById('boxes'); 


const cardEl = document.getElementsByClassName('cards')[0];
const totalEl = document.querySelector('#total');

const contentEl = document.getElementsByClassName('content')[0];
const oppenEl = document.getElementsByClassName('oppenchik')[0];
const iconEl = document.getElementsByClassName('iconimg')[0];

oppenEl.addEventListener('click',function(){
  contentEl.style.display = 'block';
})

iconEl.addEventListener('click',function(){
  contentEl.style.display = 'none';
})


let storageCartArr = localStorage.getItem('cardArr');

let cartProducts = storageCartArr ? JSON.parse(storageCartArr) : [];

function createDishDiv(el, index) {
  let dish = document.createElement('div');
  dish.className = 'box';

  let button = document.createElement('button');
  button.className = 'btn';
  button.innerText = 'Add to cart';

  let image = document.createElement('img');
  image.src = el.photo;
  image.className = 'images'

  let name = document.createElement('h3');
  name.className = 'main-title';
  name.innerText = el.name;

  let price = document.createElement('h4');
  price.className = 'main-text';
  price.innerText = el.price;

  let count = document.createElement('p');
  count.className = 'main-texts';
  count.innerText = el.count;

  dish.appendChild(image);
  dish.appendChild(name);
  dish.appendChild(price);
  dish.appendChild(count);
  dish.appendChild(button);

  boxesEl.appendChild(dish);

  button.addEventListener('click', function(){
    button.innerText = 'In cart!'
    if(!cartProducts.includes(index)){
      cartProducts.push(index);
    } 
    let arr = JSON.stringify(cartProducts);
    console.log(cartProducts);
    localStorage.setItem('cardArr', arr);
    fillCard(cartProducts);
    if(totalEl) {
      setTotalPrice();
    }
  })
}

function createCardDiv(el, index) {
  let card = document.createElement('div');
  card.className = 'card';



  let img = document.createElement('img');
  img.className = 'cardimg';
  img.src = el.photo;
  card.appendChild(img);

  let price = document.createElement('div');
  price.className = 'price';
  card.appendChild(price);

  let name = document.createElement('h2');
  name.className = 'main-text';
  name.innerText = el.name;
  price.appendChild(name);

  let priceP = document.createElement('p');
  priceP.className = 'main-text';
  priceP.innerText = el.price;
  price.appendChild(priceP);

  let deleteImg = document.createElement('img');
  deleteImg.className = 'deleteimg';
  deleteImg.setAttribute('data-index', index);
  deleteImg.src = './images/delete.svg';
  card.appendChild(deleteImg);
  
  cardEl.appendChild(card);
}

if(totalEl) {
  setTotalPrice();
}



function fillCard(arr) {
  cardEl.innerHTML = '';
  for(let i = 0; i < arr.length; i++) {
    createCardDiv(dishes[arr[i]], arr[i]);
  }
}



cardEl.addEventListener('click', (event) => {
  if(event.target.className == 'deleteimg') {
      let productI = event.target.getAttribute('data-index');
      let cartArr = JSON.parse(localStorage.getItem('cardArr'));

      const index = cartArr.indexOf(productI);
      cartArr.splice(index, 1);
      cartProducts = cartArr;

      localStorage.setItem('cardArr', JSON.stringify(cartArr));

      fillCard(cartArr);
  }
  if(totalEl) {
    setTotalPrice();
  }
});

// ovqatlar turgan massiv qabul qilib, shu ovqatlarning hammasini html ga chiqarib beruvchi funksiya
function funksiya(arr) { // ovqatlar turgan massiv qabul qiladi
  boxesEl.innerHTML = ''; // html da ovqatlar turgan katta divning ichini tozalash
  for(let i = 0; i < arr.length; i++) { // massivdagi har bir ovqatni olib
      createDishDiv(arr[i], i); // shu ovqatni html ga qo'shish
  }
}

const mainheaderEl = document.getElementsByClassName('mainheader')[0]; // link lar turgan element

mainheaderEl.addEventListener('click', function(e) { // link lar bosilganda
  let type = e.target.getAttribute('data-type'); // shu linkning data-type attributini qiymatini olamiz 

  const links = document.getElementsByClassName('link'); // link elementlarini tanlab olamiz

  for(let i=0; i < links.length; i++) { // har bir link dan
    links[i].classList.remove('activ-link'); // active class ni o'chiramiz
  }

  e.target.classList.add('activ-link'); // bosilgan link ga active class qo'shamiz

  if(type == -1) { // agar all bosilsa
    funksiya(dishes); // funksiya ga barcha ovqatlar turgan massiv berish
  } else { // aks holda

    // ovqatlarni bosilgan link type i bo'yicha filter qilamiz
    let filteredDishes = dishes.filter(function(el) {
        return el.dishType == type;
    });

    funksiya(filteredDishes); // funksiya ga filter qilingan ovqatlar turgan massiv berish
  }
});

const inputEl = document.getElementById('input');

inputEl.addEventListener('input',function(event) {
  let filteredDishes = dishes.filter(function(el) {
    return el.name.includes(event.target.value);
  });

  funksiya(filteredDishes); 
})

function setTotalPrice() {
  let totalPrice = 0;
  let cartArr = JSON.parse(localStorage.getItem('cardArr'));

  if (cartArr) {
    for(let i = 0; i < cartArr.length; i++) {
      const index = cartArr[i];
      const price = Number.parseFloat(dishes[index].price);
      totalPrice += price;
    }
  
    totalEl.innerHTML = totalPrice + ' sum';
  }
}





funksiya(dishes);
fillCard(cartProducts);