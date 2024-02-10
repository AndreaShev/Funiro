//определяем на чем открыт сайт 

var isMobile = {
Android: function (){
  return navigator.userAgent.match(/Android/i);
},
BlackBerry: function (){
  return navigator.userAgent.match(/BlackBerry/i);
},
iOS: function (){
  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
},
Opera: function (){
  return navigator.userAgent.match(/Opera Mini/i);
},
Windows: function (){
  return navigator.userAgent.match(/IEMobile/i);
},
any: function (){
  return(
    isMobile.Android() ||
    isMobile.BlackBerry() || 
    isMobile.iOS() || 
    isMobile.Opera() ||  
    isMobile.Windows());              
}
};

//if (isMobile.any()){
 // document.body.classList.add('_touch');
//}


window.onload = function() {// Функция - обработчик события: она вызывается, когда документ будет загружен
  document.addEventListener("click", documentActions);//Метод addEventListener() принимает три аргумента. 
  //Первый - тип события, для которого регистрируется обработчик. 
 // Тип (или имя) события должен быть строкой и не должен включать префикс «on», используемый при установке свойств обработчиков событий. 
 // Вторым аргументом методу addEventListener() передается функция, которая должна вызываться при возникновении события указанного типа.
//В последнем аргументе методу addEventListener() передается логическое значение. Обычно в этом аргументе передается значение false. 
//Если передать в нем значение true, функция будет зарегистрирована как перехватывающий обработчик и будет вызываться в другой фазе распространения события.
//Спецификация со временем может измениться так, что будет допустимо опускать третий аргумент вместо того, чтобы явно передавать в нем значение false, но на момент написания этих строк отсутствие третьего аргумента в некоторых текущих браузерах приводила к ошибке.

  //Actions (делегирование событий click )
  function documentActions(e){
    const targetElement = e.target;//присваиваем в константу нажатый объект
 if (window.innerWidth > 768 && isMobile.any()) {//окно шире 768 и на тачскрине (если тачскрин функция isMobile.any вернет тру) 
if (targetElement.classList.contains('menu_arrow')){//слушаем класс menu_arrow
targetElement.closest('.menu_item').classList.toggle('_hover');//идем к родителю и добавляем класс _hover, а при повторно убираем
} //закрытие  меню при на клике пустого пространства
if (!targetElement.closest('.menu_item') && document.querySelectorAll('.menu_item._hover').length > 0){//определяем что нажали не на меню и подменю и есть ли хавер который нужно убирать
 _removeClasses(document.querySelectorAll('.menu_item._hover'), "_hover" );//функции скармливаем коллекцию объектов и говорим какой класс убрать  у '.menu_item._hover' забирает hover (функция у фрилансера (цикл))
}
 }
 //обработчик который добавляет класс _active при клике на значок поиска
if (targetElement.classList.contains('search-form_icon')) {//если у объекта есть класс соответствующий иконке поиска
document.querySelector('.search-form').classList.toggle('_active');//тогда находим объект '.search-form' и к списку классов добавляем или убираем _active'
//закрытие формы при клике на пустое пространство
} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {//нажатый объект не должен содержать родителей объекта search-form и должен быть объект search-form с классом _active' 
document.querySelector('.search-form').classList.remove('_active');
}
if (targetElement.classList.contains('products_more')) {//отправляем кнопку в функцию getProducts
  getProducts(targetElement);
  e.preventDefault();//отмена действия по умолчанию (действие кнопка)
 }
  if (targetElement.classList.contains('actions-product_button')) {
  //отлавливаем клик по нашей кнопке
    const productId = targetElement.closest('.item-product').dataset.pid;   
       //в константу получаем сожержимое дата-атрибута ищем среди родителей нажатой кнопки объект item-product и получаем его data-set
    addToCart(targetElement, productId);
    //кнопку и pid отправляем в функцию
    e.preventDefault();
    //обнуление стандартного поведения кнопки страница не должна перегрузиться
  }
  //Показ по клику на корзину списка товаров
  if (targetElement.classList.contains('cart-header_icon') || targetElement.closest('.cart-header_icon')) {
    //определяем нажатый объект по клику на корзину или если у нажатого объекта корзина родитель (span) 
  if (document.querySelector('.cart-list').children.length > 0) {
    //проверяем есть ли товары в списке
    document.querySelector('.cart-header').classList.toggle('_active');
  }//если есть то добавляем или убираем класс _active 
  e.preventDefault();
} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product_button')){
  //если нажали не на корзину и не на кнопку добавления товара, а на другой объект то класс _active  убираем
  document.querySelector('.cart-header').classList.remove('_active');
  }  
  //удаление товара
  if (targetElement.classList.contains('cart-list_delele')) {
  //отлавливаем нажатие по ссылке cart-list_delete  
    const productId = targetElement.closest('.cart-list_item').dataset.cartPid;//проверить значение константы
    //обращаемся к нажатому элементу к его родителю cart-list_item и получаем его Id это li с этим уникальным атрибутом
    updateCart(targetElement, productId, false);
    //в существующую функцию не добавляем товар в корзину, а удаляем товар
    e.preventDefault();
  }

}//documentActions закрывашка
/*  
*/


//HEADER убираем наезжание хедера
const headerElement = document.querySelector('.header');

const callback = function (entries, observer) {
if (entries[0].isIntersecting) {
  headerElement.classList.remove('_scroll');
} else {
  headerElement.classList.add('_scroll');//если шапка уехал то добавляем скрол
}
};

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);

//load more products
async function getProducts(button) {//асинхронная функция для фетча
  //получаем нажатую кнопку show more
  if(!button.classList.contains('_hold')) {
    //проверка на отсутствие класса холд
    button.classList.add('_hold');
    //класс нужен чтобы избежать повторных запросов
    const file = "json/products.json";
    //в реальном запросе адрес сервера
    let response = await fetch(file, {
      //GET запрос при помощи fetch
      method: "GET"
    });
    if (response.ok) {
      //проверка если ок
      let result = await response.json();
      //подгружаем содержимое файла в json формате
      loadProducts(result);
      //результат отправляем в функцию  loadProducts 
      button.classList.remove('_hold');
      button.remove();
      //удаляем кнопку потому что запрос фейковый (в реальном проекте адрес)
    } else {
      alert("Ошибка");
    }
    }
  }

/*  
function loadProducts(data) {
  const productsItems = document.querySelector('.products_items');

data.products.forEach(item => {
const productId = item.id; 
const productUrl = item.url;
const productImage = item.image;
const productTitle = item.title;
const productText = item.text;
const productPrice = item.price;
const productOldPrice = item.priceOld;
const productShareUrl = item.shareUrl;
const productLikeUrl = item.likeUrl;
const productLabels = item.labels;

let template = `
<article data-pid="${productId}" class="products_item item-product">
  <div class="item-product_labels">
<div class="item-product_label item-product_label_sale">-30%</div>
<div class="item-product_label item-product_label_new">New</div>
  </div>
  <a href="" class="item-product_image _ibg">
<img src="img/img1.jpg" alt="Image">
  </a>
  <div class="item-product_body">
<div class="item-product_content">
<h5 class="item-product_title">Syltherine</h5>
<div class="item-product_text">Stylish</div>
</div>
<div class="item-product_prices">
<div class="item-product_price">Rp2500</div>
<div class="item-product_price item-product_price_old">Rp 3500</div>
</div>
<div class="item-product_actions actions-product">
<div class="actions-product_body">
<a href="" class="actions-product_button btn btn_white">Add to cart</a>
<a href="" class="actions-product_link _icon-share">Share</a>
<a href="" class="actions-product_link _icon-favorite">Like</a>
</div>
</div>
  </div>
</article>
 ` 


});
}
*/


function loadProducts(data) {
  const productsItems = document.querySelector('.products_items');


data.products.forEach(item => {
const productId = item.id; 
const productUrl = item.url;
const productImage = item.image;
const productTitle = item.title;
const productText = item.text;
const productPrice = item.price;
const productOldPrice = item.priceOld;
const productShareUrl = item.shareUrl;
const productLikeUrl = item.likeUrl;
const productLabels = item.labels;



//переменная получает начало и конец карточки
let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
      let productTemplateEnd = `</article>`;
//переменная проверяет существование и получает начало, контент и конец лейблов
      let productTemplateLabels = '';
      if (productLabels) {
        let productTemplateLabelsStart = `<div class="item-product__labels">`;
        let productTemplateLabelsEnd = `</div>`;
        let productTemplateLabelsContent = '';

        productLabels.forEach(labelItem => {
          productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
        });
//сбор лейблов
        productTemplateLabels += productTemplateLabelsStart;
        productTemplateLabels += productTemplateLabelsContent;
        productTemplateLabels += productTemplateLabelsEnd;
      }
//формирование картинки
      let productTemplateImage = `
    <a href="${productUrl}" class="item-product__image _ibg">
      <img src="img/products/${productImage}" alt="${productTitle}">
    </a>
  `;
//блок боди с контектом, тайтлом и текстом
      let productTemplateBodyStart = `<div class="item-product__body">`;
      let productTemplateBodyEnd = `</div>`;

      let productTemplateContent = `
    <div class="item-product__content">
      <h3 class="item-product__title">${productTitle}</h3>
      <div class="item-product__text">${productText}</div>
    </div>
  `;

      let productTemplatePrices = '';
      let productTemplatePricesStart = `<div class="item-product__prices">`;
      let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
      let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
      let productTemplatePricesEnd = `</div>`;

      productTemplatePrices = productTemplatePricesStart;
      productTemplatePrices += productTemplatePricesCurrent;
      if (productOldPrice) { //проверяем есть ли старая цена
        productTemplatePrices += productTemplatePricesOld;
      }
      productTemplatePrices += productTemplatePricesEnd;
//блок с корзиной и соц сетями
      let productTemplateActions = `
    <div class="item-product__actions actions-product">
      <div class="actions-product__body">
        <a href="" class="actions-product__button btn btn_white">Add to cart</a>
        <a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
        <a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
      </div>
    </div>
  `;
//сбор всех элементов тела
      let productTemplateBody = '';
      productTemplateBody += productTemplateBodyStart;
      productTemplateBody += productTemplateContent;
      productTemplateBody += productTemplatePrices;
      productTemplateBody += productTemplateActions;
      productTemplateBody += productTemplateBodyEnd;
//сбор всех элементов
      let productTemplate = '';
      productTemplate += productTemplateStart;
      productTemplate += productTemplateLabels;
      productTemplate += productTemplateImage;
      productTemplate += productTemplateBody;
      productTemplate += productTemplateEnd;

 //добавление карточек в конец элемента   
productsItems.insertAdjacentHTML('beforeend', productTemplate);

    });
}//loadProducts закрывашка
//}

//addToCart добавление в корзину
function addToCart(productButton, productId) {
  //в функцию получаем нажатую кнопку и Id

if(!productButton.classList.contains('_hold')) {

  //проверяем на несуществование у кнопки класс hold 
  //избежать множественных нажатий
  productButton.classList.add('_hold');
  //если класса нет, то добавляем его
  productButton.classList.add('_fly');
//добавляет класс fly

  const cart = document.querySelector('.cart-header_icon');
  //содержит объект в шапке с иконкой (туда выводиться количество товаров)
  const product = document.querySelector(`[data-pid="${productId}"]`);//`обратные кавычки`Как видно, при помощи ${…} можно вставлять как и значение переменной ${productId}, так и более сложные выражения, которые могут включать в себя операторы, вызовы функций и т.п. Такую вставку называют «интерполяцией».

  //содержит объект у которого есть нужный pid 
  const productImage = product.querySelector('.item-product_image');
//картинка того товара у которого мы нажали кнопку addToCart

  const productImageFly = productImage.cloneNode(true);
//создаем клон картинки которая в данном товаре находится

//получаем размеры и координаты картинки товара
const productImageFlyWidth = productImage.offsetWidth;
const productImageFlyHeight = productImage.offsetHeight;
const productImageFlyTop = productImage.getBoundingClientRect().top;
const productImageFlyLeft = productImage.getBoundingClientRect().left;

//применение этих размеров для клона
productImageFly.setAttribute('class','_flyImage _ibg');
productImageFly.style.cssText =
 `
left: ${productImageFlyLeft}px;
top: ${productImageFlyTop}px;
width: ${productImageFlyWidth}px;
height: ${productImageFlyHeight}px;
`;

document.body.append(productImageFly);
//выводим клон в конец боди

//отправляем клон в корзину
//получаем координаты иконки корзины
const cartFlyLeft = cart.getBoundingClientRect().left;
const cartFlyTop = cart.getBoundingClientRect().top;

//клону присваиваем значение корзины
productImageFly.style.cssText =
`
left: ${cartFlyLeft}px;
top: ${cartFlyTop}px;
width: 0px;
height: 0px;
opacity: 0;
`;
//картинка летит в корзину уменьшается и исчезает


//вывод количества в корзине
productImageFly.addEventListener('transitionend', function() {
//после окончания полета запускается функция
if(productButton.classList.contains('_fly')) {
    //проверяем на существование у нажатой кнопки класса fly чтобы не было повторного нажатия
  productImageFly.remove();
  //удаляем клон после полета в корзину
  updateCart(productButton, productId);
  //кнопку и id передаем в функцию которая будет отслеживать количество товаров и список товаров
  productButton.classList.remove('_fly');
//убираем класс fly у кнопки
}
});


}//hold закрывашка
}//addToCart закрывашка



//в функцию получаем кнопку и id и параметр productAdd который по умолчанию true
//  функция  будет универсальна как добавление так и удаление товаров из корзины)
function updateCart(productButton, productId, productAdd = true) {

//получаем необходимые константы
const cart = document.querySelector('.cart-header');
//общая оболочка корзины
const cartIcon = cart.querySelector('.cart-header_icon');//сделать дом запрос на правильность константы
//иконка
const cartQuantity = cartIcon.querySelector('span');
//количество товаров у иконки в спане
const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);//проверить апострофы и data-cart-pid 
//товар находящийся в списке внутри корзины
const cartList = document.querySelector('.cart-list');
//оболочка списка товаров


//добавление товара
if (productAdd) {
  if (cartQuantity) {
    //если есть span
    cartQuantity.innerHTML = ++cartQuantity.innerHTML;
    //увеличиваем его количествр на единицу
  } else {
    //если не существует создаем span
  cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);  //проверть апостроф
  }
  
  //список добавленных товаров
  if (!cartProduct) {
    //проверяем существует ли добавленный товар если товар не существует, то его формируем
  const product = document.querySelector(`[data-pid="${productId}"]`);//интерполяция прикрепляемый объект в {}
  //получаем объект оригинального товара
  const cartProductImage = product.querySelector('.item-product_image').innerHTML;
  //получаем картинка оригинального товара 
  const cartProductTitle = product.querySelector('.item-product_title').innerHTML;
  //получаем название оригинального товара
  const cartProductContent = `
  <a href="" class="cart-list_image _ibg">${cartProductImage}</a>
<div class="cart-list_body">
<a href="" class="cart-list_title">${cartProductTitle}</a>
<div class="cart-list_quantity">Quantity: <span>1</span></div>
<a href="" class="cart-list_delele">Delete</a>  
</div>`;
//в константу cartProductContent формируем хтмл код который будем добавлять в шапку в блок с корзиной
//ссылка с изображением, названием, количеством, ссылка на удаление
cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list_item">${cartProductContent}</li>`);
  //интегрируем в хтмл код  
  //(это вариант когда товара в корзине нет)
  } else {
    const cartProductQuantity = cartProduct.querySelector('.cart-list_quantity span');
    cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
  //(это вариант когда товара в корзине есть и мы увеличиваем количество товара на единицу)
}

productButton.classList.remove('_hold');
//после всех действий отбираем класс _hold у кнопки добавления в корзину чтобы мы могли добавлять товар в корзину повторно

} else {

  //удаление товара из корзины

  const cartProductQuantity = cartProduct.querySelector('.cart-list_quantity span');
    //получаем количество добавленного в корзину товара
  cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
  //уменьшаем это количество на 1
  if (!parseInt(cartProductQuantity.innerHTML)) {
    //(Логическое НЕ) Возвращает false, если операнд может быть преобразован в true; в противном случае возвращает true.
    //Функция parseInt() принимает строку в качестве аргумента и возвращает целое число в соответствии с указанным основанием системы счисления.
  //это фрилансер сделал чтобы в нашем случаем если после работы функции не целое число, а 0.
  cartProduct.remove();
   //то товар находящийся в списке внутри корзины удаляем  
  }

  const cartQuantityValue = --cartQuantity.innerHTML;
//уменьшаем на 1 общее количество товара

  if (cartQuantityValue) {
  cartQuantity.innerHTML = cartQuantityValue;
   //если общее количество товара > 0 то изменяем значение в кружке span
  } else {
  cartQuantity.remove();
  //если товаров нет то удаляем span
  cart.classList.remove('_active');
   //убираем класс active у списка чтобы он закрылся
  }
}
}
/*


//после всех действий отбираем класс _hold у кнопки добавления в корзину чтобы мы могли добавлять товар в корзину повторно
productButton.classList.remove('_hold');
} else {
  //удаление товара из корзины
  const cartProductQuantity = cartProduct.querySelector('cart-list_quantity span');
  //получаем количество добавленного в корзину товара
  cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
  
  //уменьшаем это количество на 1
  if(!parseInt(cartProductQuantity.innerHTML)) {
  //если результат 0 то товар удаляем  
    cartProduct.remove();
  }

  const cartQuantityValue = --cartQuantity.innerHTML;
//уменьшаем на 1 общее количество товара
if (cartQuantityValue) {
  cartQuantity.innerHTML = cartQuantityValue;
  //если >0 то изменяем значение в кружке span
} else {
  cartQuantity.remove();
  cart.classList.remove('_active');
  //если товаров не то удаляем span и закрываем список
}
}
}*/

//furniture gallery
const furniture = document.querySelector('.furniture_body');
//получили тело галереи
if (furniture && !isMobile.any()) {
  //проверка на существовании и то что не тачскрин
const furnitureItems = document.querySelector('.furniture_items');
//объект который будет двигаться
const furnitureColumn = document.querySelector('.furniture_column');  
//коллекция всех колонок

//скорость анимации
const speed = furniture.dataset.speed;

//объявление переменных позиции и процентной позиции
let positionX = 0;
let coordXprocent = 0;

function setMouseGalleryStyle() { //вычисляем актуальный размер контента
  let furnitureItemsWidth = 0; 
  furnitureColumn.forEach(element => { //перебераем все колонки и высчитываем их размер
    furnitureItemsWidth += element.offsetWidth;
  });

//разница всего конента и видимой части
const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
//смещение положения
const distX = Math.floor(coordXprocent - positionX);

positionX = positionX + (distX * speed);
//вычисление позиции отн-но разницы ширин
let position = furnitureDifferent / 200 * positionX;
//обращаемся к объекту который хотим двигать (когда движемся вправо галерея влево)
furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;


//запуск анимации
if (Math.abs(distX) > 0) {
requestAnimationFrame(setMouseGalleryStyle);
} else {
furniture.classList.remove('_init');
}
}

furniture.addEventListener("mousemove", function(e) {
//получение видимой ширины
const furnitureWidth = furniture.offsetWidth;

//ноль посередине
const coordX = e.pageX - furnitureWidth / 2;

//получаем проценты
coordXprocent = coordX / furnitureWidth * 200;
//запускаем анимацию когда нет инита
if (!furniture.classList.contains('_init')) {
 requestAnimationFrame(setMouseGalleryStyle);
 furniture.classList.add('_init'); 
}
});
}
}

/**/


/*






}





*/
 



//меню бургер

const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu_body');
if (iconMenu){
  iconMenu.addEventListener("click", function (e){
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}



//прокрутка при клике

const menuLinks = document.querySelectorAll('.menu_link[data-goto]');//поиск дата атрибутов
if (menuLinks.length > 0) {//проверка есть ли элементы
  menuLinks.forEach(menuLink => {
menuLink.addEventListener("click", onMenuLinkClick); //вешаем событие клик
  });

  function onMenuLinkClick(e) {
const menuLink = e.target;//поиск целевого объекта (ссылки)
if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {//проверка заполнен и существования атрибут (объекта)
const gotoBlock = document.querySelector(menuLink.dataset.goto);//получение в константу объекта
const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight; //получение положения элемента в пикселях - шапка    
//const gotoBlock1 = gotoBlock.getBoundingClientRect().top; //- положение от верха до объекта в px
//const gotoBlock2 = pageYOffset; //- количество прокрученных px
// gotoBlock3 = document.querySelector('header').offsetHeight; //- высота шапки
//console.log(gotoBlock1);
//console.log(gotoBlock2);
//console.log(gotoBlock3);
//console.log(gotoBlockValue);
  
if (iconMenu.classList.contains('_active')){ //убираем прокрутку при открытом меню (бургере)
  document.body.classList.remove('_lock');
  iconMenu.classList.remove('_active');
  menuBody.classList.remove('_active');
}

window.scrollTo({//функция прокрутки
  top: gotoBlockValue, //положение сверху высчитанной константы
  behavior: "smooth" //плавная прокрутка
});
e.preventDefault();//отключение работу ссылки по умолчанию
    }
  }

}


/*  
removeClasses в комментах Адаптивная верстка сайта с объяснением действий. Добавление товара в корзину, AJAX подгрузка из JSON

Привет, товарищ  вот твое решение else if (!targetElement.closest('.menu__item') && document.querySelector('.menu__item._hover')) {
        document.querySelector(".menu__item._hover").classList.remove('_hover'); }

       ... то есть ты либо реализуешь подобное через функцию, что более удобно в дальнейшем , либо заменяешь этот кусочек кода на тот который тебя застопорил
либо попробовать из этого написать функцию
function removeClass(){
  var element = document.getElementById("myDIV");
  element.classList.remove("mystyle");
}

что такое в //событиях  addListener ?  
Это устаревший метод интерфейса MediaQueryList, сейчас вместо него нужно использовать .addEventListener('change', callback), вместо .addEvent(callback)

ibg это адаптив картинок?да


*/

/*
productButton.classList.remove('_hold');
} else {
  const cartProductQuantity = cartProduct.querySelector('.cart-list_quantity span');
  cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
  if (!parseInt(cartProductQuantity.innerHTML)) {
  cartProduct.remove();
  }

  const cartQuantityValue = --cartQuantity.innerHTML;

  if (cartQuantityValue) {
  cartQuantity.innerHTML = cartQuantityValue;
  } else {
  cartQuantity.remove();
  cart.classList.remove('_active');
  }
}
}
*/