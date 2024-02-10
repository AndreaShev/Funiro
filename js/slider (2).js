

if (document.querySelector('.slider-main_body')) {
new Swiper('.slider-main_body', {
observer: true,
observeParents: true,
slidesPerView: 1,
spaceBetween: 32,
watchOverflow: true,
 speed: 800, 
 loop: true, 
 loopAdditionalSlides: 5,
 preloadImages: false,
 parallax: true,
 //dotts
 pagination:{
 	el:'.controls-slider-main_dotts',
 	clickable: true,
 },
 //arrows
 navigation: {
nextEl: '.slider-main .slider-arrow_next', 
prevEl: '.slider-main .slider-arrow_prev',
}
});
}



if (document.querySelector('.slider-rooms_body')) {
new Swiper('.slider-rooms_body', {
observer: true, //Swiper будет обновляться (повторно инициализироваться) каждый раз, когда вы меняете его стиль (например, скрытие/отображение) или изменяете его дочерние элементы (например, добавляете/удаляете слайды).
observeParents: true,//Установите значение true, если вам также необходимо отслеживать мутации для родительских элементов Swiper.
slidesPerView: 'auto',//для того что слайдер сам не указывал ширину слайда
//Отступ между слайдерами
spaceBetween: 24,
speed: 800, //Скорость переключения слайдов
 loop: true,//бесконечный слайдер
watchOverflow: true,//При включении Swiper будет отключен и скроет кнопки навигации, если слайдов недостаточно для скольжения.
 loopAdditionalSlides: 5,//петляДополнительныеслайды
 preloadImages: false,//предварительно загрузить изображения
 //autoHeight: false,
 parallax: true,//
 //dotts
 pagination:{
 	el:'.slider-rooms_dotts',
 	clickable: true,
 },
 //arrows
 navigation: {
nextEl: '.slider-rooms .slider-arrow_next', 
prevEl: '.slider-rooms .slider-arrow_prev',
}
});
}




if (document.querySelector('.slider-tips_body')) {
new Swiper('.slider-tips_body', {
observer: true,
observeParents: true,
slidesPerView: 3,
spaceBetween: 32,
speed: 800, 
 loop: true,
watchOverflow: true,
 
 //dotts
 pagination:{
 	el:'.slider-tips_dotts',
 	clickable: true,
 },
 //arrows
 navigation: {
nextEl: '.slider-tips .slider-arrow_next', 
prevEl: '.slider-tips .slider-arrow_prev',
},
breakpoints: {
    //когда окно >=320px
    320: {
slidesPerView: 1.1,
spaceBetween: 15
    },
  //когда окно >=768px  
  768: {
slidesPerView: 2,
spaceBetween: 20
    },
 //когда окно >=992px 
    992: {
slidesPerView: 3,
spaceBetween: 32
    }
}
});
}



/*
let slider_about = new Swiper('.about_slider', {

observer: true,
observeParents: true,
slidesPerView: 1,
spaceBetween: 0,
autoHeight: true,
speed: 800,   
navigation: {
nextEl: 'about_more .more_item_next', 
prevEl: 'about_more .more_item_prev',
},
on: {
	lazyImageReady:function(){
		ibg();
	}
}
});
setWrapperSize     
Включите эту опцию, и плагин установит ширину/высоту на обертке swiper, равную общему размеру всех слайдов. В основном следует использовать в качестве резервного варианта совместимости для браузеров, которые плохо поддерживают макет flexbox.
*/


