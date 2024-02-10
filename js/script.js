
//определяем на чем открыт сайт 


const isMobile = {
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

if (isMobile.any()){
	document.body.classList.add('_touch');

let menuArrows = document.querySelectorAll('.menu_arrow'); //вывод при нажатии на стрелку
if (menuArrows.length > 0){
for (let index = 0; index < menuArrows.length; index++){  //цикл по стрелкам
const menuArrow = menuArrows[index];
menuArrow.addEventListener("click", function(e){ //навешиваем событие клик
menuArrow.parentElement.classList.toggle('_active');  //навешиваем класс родителю стрелки
			});
		}
	}
}else {
	document.body.classList.add('_pc');
}



//меню бургер

const iconMenu = document.querySelector('.menu_icon');
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
menuLink.addEventListener("click",onMenuLinkClick); //вешаем событие клик
	});

	function onMenuLinkClick(e) {
const menuLink = e.target;//поиск целевого объекта (ссылки)
if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {//проверка заполнен и существования атрибут (объекта)
const gotoBlock = document.querySelector(menuLink.dataset.goto);//получение в константу объекта
const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight; //получение положения элемента в пикселях - шапка		
	
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