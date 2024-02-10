

let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++){
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}

let slider_content = slider.innerHTML;
let slider_wrapper = document.createElement('div');
slider_wrapper.classList.add('swiper_wrapper');
slider_wrapper.innerHTML = slider_content;
slider.innerHTML = '';
slider.appendChild(slider_wrapper);
slider.classList.add('swiper-bild');

if (slider.classList.contains('_slider_scroll')){
	let sliderScroll = document.createElement('div');
	sliderScroll.classList.add('swiper_scrollbar');
	slider.appendChild(sliderScroll);
}
}

if (slider.classList.contains('_gallery')){

 }
}
	sliders_bild_callback();
}

function sliders_bild_callback(params){}

	let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
	const sliderScroll = new Swiper(sliderScrollItem, {
observer: true,
observeParents: true,
direction: 'vertical',
slidesPerView: 'auto',
freeMode: true, 
scrollbar: {
	el: sliderScrollBar, 	
	draggable: true,
	snapOnRelease: false
	}, 
	mousewheel: {
		releaseOnEdges: true,
	}, 
});
sliderScroll.scrollbar.updateSize();
	}
} 


function sliders_bild_callback(params) {}

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
observer: true,
observeParents: true,
slidesPerView: 'auto',//для того что слайдер сам не указывал ширину слайда
spaceBetween: 24,
speed: 800, 
 loop: true,
watchOverflow: true,
 loopAdditionalSlides: 5,
 preloadImages: false,
 parallax: true,
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
})//нужна ; ?
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

*/


