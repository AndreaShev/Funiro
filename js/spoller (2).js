

"use strict"

//спойлеры
const spollersArray = document.querySelectorAll('[data-spollers]');
//получаем коллекцию объектов у которых есть атрибут data-spollers 
if (spollersArray.length > 0) { 
//проверка на существование
//получение обычных спойлеров
const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) { 
//spollersRegular изначально коллекция и с помощью Array.from переводим ее в массив
//filter делает дубль в const spollersRegular и вернет все элементы удовлетворяющие условию 
//Метод filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции. 
return !item.dataset.spollers.split(",")[0];//запрашиваем первую ячейку (элемент с 0 индексом)
//попадут спойлеры data-spollers без параметров
});
//console.log(spollersArray);
//console.log(spollersRegular);
//инициализация обычных спойлеров
if (spollersRegular.length > 0) {
  initSpollers(spollersRegular);//в функцию передаем массив
}

//Получение спойлеров с медиа запросами
const spollersMedia = Array.from(spollersArray).filter(function(item, index, self) { 
return item.dataset.spollers.split(",")[0];
//собираем в константу спойлеры data-spollers с первым параметром
});
//console.log(spollersMedia);

//инициализация спойлеров с медиа запросами
if (spollersMedia.length > 0) {
const breakpointsArray = [];//константа с пустым массивом который будем наполнять
spollersMedia.forEach(item => {//перебираем массив объектов с медиа запросами
//func выполняется forEach для каждого элемента массива spollersMedia.
  const params = item.dataset.spollers;//получает строку с параметрами для каждого объекта 
  const breakpoint = {};//объект который будем наполнять
  const paramsArray = params.split(","); //строку преобразовываем массив с разделителем ,
  //например у data-spollers="768,max" строку "768,max" преобразуем(разделяем) в элементы массива 768 и max
  breakpoint.value = paramsArray[0]; 
  //получает значение 768 из примера выше
  breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
//«условный» оператор ?. Его также называют «тернарный», так как этот оператор, единственный в своём роде, имеет три аргумента.
//Сначала вычисляется условие (paramsArray[1]): если оно истинно, тогда возвращается значение1(paramsArray[1].trim() ), в противном случае – значение2("max").
//Метод trim() удаляет пробельные символы с начала и конца строки. 
//получает значение min или по умолчанию max
  breakpoint.item = item;
  //получает сам объект
  breakpointsArray.push(breakpoint); 
  //все это добавляем к breakpointsArray 
  //в итоге breakpointsArray будет содержать массив объектов, которые будет содержать инфу(число брейкпойта, тип брейкпойтам(мин или макс) и сам объект ) 
});
//console.log(breakpointsArray);

//получаем уникальные брейкпойнты
let mediaQueries = breakpointsArray.map(function (item) {
  //Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
  return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
});
//переделываем массив breakpointsArray получится например (min-width:768px),768,min
mediaQueries = mediaQueries.filter(function (item, index, self) {
  //item - Текущий обрабатываемый элемент в массиве.
  //index - Индекс текущего обрабатываемого элемента в массиве.
  //self - Обрабатываемый массив, на котором был вызван метод filter().
  //Метод filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции. 
  return self.indexOf(item) === index;
  //Метод indexOf() возвращает первый индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет.
  //item - Искомый элемент в массиве.
  //Метод indexOf() сравнивает искомый элемент searchElement с элементами в массиве, используя строгое сравнение (en-US) (тот же метод используется оператором ===, тройное равно).
  // фильтруем и оставляем в массиве только уникальные значения
});
//console.log(mediaQueries);

//работаем с каждым брейкпойнтом
mediaQueries.forEach(breakpoint => {//пробегаемся по mediaQueries 
const paramsArray = breakpoint.split(",");//строку преобразовываем массив с разделителем ,
const mediaBreakpoint = paramsArray[1];//получает 1 параметр (число)
const mediaType = paramsArray[2];//получает 2 параметр (min или max)
const matchMedia = window.matchMedia(paramsArray[0]);//метод будет слушать ширину экрана и отрабатывать если сработал брейкпойнт
//Window.matchMedia() Возвращает новый объект MediaQueryList использующийся для определения соответствия документа переданной строке медиавыражения.
//Синтаксис mql = window.matchMedia(mediaQueryString) где mediaQueryString является строкой медиавыражения, для которой будет возвращён новый объект MediaQueryList
//console.log(matchMedia);

//объекты с нужными условиями
const spollersArray = breakpointsArray.filter(function (item) {
//обращаемся к изначальному массиву, фильтруем 
if (item.value === mediaBreakpoint && item.type === mediaType) {
//в константу сохраняем если совпадает и число и тип (min/max)  
return true;
}
});
//console.log(spollersArray);

//Событие (может и здесь косяк что метод устаревший)
matchMedia.addListener(function () {
//Устаревший addListener()метод MediaQueryList интерфейса добавляет прослушиватель, MediaQueryListenerкоторый будет запускать пользовательскую функцию обратного вызова в ответ на изменение статуса медиа-запроса.
// Синтаксис addListener(func) func - Функция или ссылка на функцию, представляющая функцию обратного вызова, которую вы хотите запустить при изменении состояния медиа-запроса.
initSpollers(spollersArray, matchMedia);  
//в функцию передаем собранный массив объектов, который соответствует брейкпойту и константу matchMedia
});
initSpollers(spollersArray, matchMedia); //вызываем функцию чтобы отработала при загрузки страницы
});
}

//Инициализация
function initSpollers(spollersArray, matchMedia = false) {
//в функцию передаем массив объектов, c которым нужно работать  и константу matchMedia(если ее не передаем, то ее значение false)  
spollersArray.forEach(spollersBlock => {
//бегаем по spollersBlock - каждому элементу массива 
spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;   
//проверяем matchMedia (если чему то равно, то есть не равно false то присваиваем имя объекта то есть spollersBlock это объект и нам надо получить элемент этого объекта - spollersBlock.item (элемент о) иначе если обычный массив то присваиваем тот же spollersBlock) 
if (matchMedia.matches || !matchMedia) {
    //matchMedia.matches - значит брейкпойнт сработал(тру) или matchMedia = false (обычный  спойлер без медиазапросов)
    //matches - ?  
 spollersBlock.classList.add('_init');
 //оболочке добавляем класс ('_init') 
 initSpollerBody(spollersBlock);
 //объект отправляем в функцию initSpollerBody (она будет отвечать за контентную часть)  
 spollersBlock.addEventListener("click", setSpollerAction);  
 //на блок вешаем событие клик и вызываем функцию
} else {
  //иначе отбираем класс '_init' чтобы не выводились атрибуты спойлера
 spollersBlock.classList.remove('_init');
 initSpollerBody(spollersBlock, false);
 //выполняем функцию initSpollerBody объект отправляем в нее с параметров false 
 spollersBlock.removeEventListener("click", setSpollerAction);
 //убираем событие клик на блоке 
 //console.log(spollersBlock);
}
});
}


//Работа с контентом (похоже здесь косяк)
function initSpollerBody(spollersBlock, hideSpollerBody = true) {
//в функцию передаем блок со спойлерами и параметр hideSpollerBody (по умолчанию тру)
  const spollerTitles = spollersBlock.querySelector('[data-spoller]');
  //получаем все заголовки спойлеров внутри конкретного блока
 // console.log(spollerTitles);
if (spollerTitles.length > 0) {
  //проверяем на существование
spollerTitles.forEach(spollerTitle => {
  //пробегаемся по массиву заголовком (массиву кнопок в нашем примере)
  if (hideSpollerBody) {
    //console.log(hideSpollerBody);
  spollerTitle.removeAttribute('tabindex');
  //console.log(hideSpollerBody);
    //если тру то у заголовка убираем аттрибут tabindex 
  if (!spollerTitle.classList.contains('_active')) {
spollerTitle.nextElementSibling.hidden = true;
//nextElementSibling - следующий элемент после заголовка
//если нет класса _active то скрываем контентную часть (аналог display:none;)
//если спойлер нужно показать сразу открытым, то  для это в html пишут класс _active и именно этот объект будет показан сразу
  }  
  } else {
   spollerTitle.setAttribute('tabindex', '-1');
   //иначе добавляем аттрибут tabindex со значением -1
   //случай когда не срабатывает брейкпонт и нужно отобразить спойлер в виде обычного блока
   spollerTitle.nextElementSibling.hidden = false;
   //показываем контентные блоки если они были скрыты, то есть спойлер превращаем в обычный блок  
  
  } 
});
}
}

function setSpollerAction(e) {
  const el = e.target;
  //используем делегирование событий, в константу получаем нажатый объект
if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
  //проверяем если у объекта есть дата аттрибут data-spoller или у ближайшего родителя есть такой аттрибут (на случай добавления внутрь кнопки какого то тега)
  const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
 // console.log(spollerTitle);
  //в констату получаем кнопку это либо сам аттрибут элемент либо его родитель с дата аттрибутом data-spoller 
const spollersBlock = spollerTitle.closest('[data-spollers]');
//получаем родительский блок данного спойлера
//console.log(spollersBlock);
//проверка на необходимость добавления аккордеона данному блоку или нет
const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
//если у оболочки спойлеров есть дата аттрибут data-one-spoller тогда константа получит true иначе false     
if (!spollersBlock.querySelectorAll('._slide').length) {
  //проверяем есть ли у родителя объекты с классом slide
  //если нет то работаем
if (oneSpoller && !spollerTitle.classList.contains('_active')) {
//проверка на функционал аккордеона если у объекта добавлен аттрибут data-one-spoller и у нажатой кнопки нет класса _active
  hideSpollersBody(spollersBlock);
  //тогда остальные спойлеры скрываем, в функцию передаем родительский объект спойлер 
}
spollerTitle.classList.toggle('_active');
//добавляем или убираем класс _active в зависимости от того был он или не был 
_slideToggle(spollerTitle.nextElementSibling, 500);
//в функцию передаем контентную часть спойлера
}
e.preventDefault();
//отмена действия по умолчанию
}
}
function hideSpollersBody(spollersBlock) {
  const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active'); 
//получаем активный открытый спойлер внутри родительского объекта
if (spollerActiveTitle) {
  //если такой есть 
spollerActiveTitle.classList.remove('_active');
//то убираем у него класс _active  
_slideUp(spollerActiveTitle.nextElementSibling, 500);
//и скрываем все элементы, в функцию передаем контентную часть спойлера
}
} 
}

//SlideToggle
//позволяют нам анимировать скрытые объекты 
//которые скрыты с помощью display = 'none'; 
//либо как в моем случае с помощью target.hidden


let _slideUp = (target, duration = 500) => {
  //функция slideUp анимировано скрывает объект
  //в эту переменную который является функцией мы передаем объект
//который мы хотим анимировать и время за которое мы хотим анимировать
  if (!target.classList.contains('_slide')) {
    //если у объекта нет технического класса слайд только тогда мы работаем 
    target.classList.add('_slide');
    //и первым делом этот класс добавляем
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    //target.style.boxSizing = 'border-box'; было в инете фрилансер убрал
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
     // target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      //alert("!");
      target.classList.remove('_slide');
     }, duration);
  }
}
  let _slideDown = (target, duration = 500) => {
    //функция slideDown анимировано показывает объект
    if (!target.classList.contains('_slide')) {
    //если у объекта нет технического класса слайд только тогда мы работаем 
    target.classList.add('_slide');
    //и первым делом этот класс добавляем
    if (target.hidden) {
      target.hidden = false;
    }
      //  target.style.removeProperty('display');
   // let display = window.getComputedStyle(target).display;

  //  if (display === 'none')
  //    display = 'block';

 //   target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    //target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
}
   let _slideToggle = (target, duration = 500) => {
     //функция slideToggle комбинация slideDown и slideUp
     //если открыто скрыть если закрыта показать
    if (target.hidden) { 
    //if (window.getComputedStyle(target).display === 'none') {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  }

//класс _slide позволяет избежать ошибки когда мы множество раз кликаем на объект у нас
//добавляется убирается класс актив для заголовка но из-за того что контент на
//объект еще не успевает полностью открыться либо закрыться может   
//возникнуть ситуация когда у нас у заголовка класс актив есть то есть
//типа нас объект открыт но объект на самом деле закрыт либо наоборот



//Инструкция
/* для родителя пишем аттрибут data-spollers
для заголовка спойлеров атрибут data-spoller
если нужно включать\выключать работу спойлеров на разных размерах экранов 
пишем параметры ширины и типа брейкпойнта
Например:
data-spollers="992,max" - спойлеры будут работать на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать на экранах больше или равно 992px
если нужно чтобы в блоке открывался больше одного спойлера добавляем атрибут data-one-spoller


Для тех, кому нужны эти замечательные функции анимации, а патреон покупать не хочется (я не много их переписал, но принципиально ничего не изменилось, просто переписывать это в изначальном виде мне было как-то не комильфо):

let _slideUp = (target, duration = 500) => {
  if (target.classList.contains("_slide")) return;
  target.classList.add("_slide");

  let style = target.style;

  style.transitionProperty = "height, margin, padding";
  style.transitionDuration = `${duration}ms`;
  style.height = `${target.offsetHeight}px`;
  target.offsetHeight;

  style.overflow = "hidden";

  style.height = 0;
  style.paddingTop = 0;
  style.paddingBottom = 0;
  style.marginTop = 0;
  style.marginBottom = 0;

  setTimeout(() => {
    target.hidden = true;
    [
      "height",
      "padding-top",
      "padding-bottom",
      "margin-top",
      "margin-bottom",
      "overflow",
      "transition-duration",
      "transition-property",
    ].forEach(e => style.removeProperty(e));
    target.classList.remove("_slide");
  }, duration);
};

let _slideDown = (target, duration = 500) => {
  if (target.classList.contains("_slide")) return;
  target.classList.add("_slide");

  if (target.hidden) target.hidden = false;

  let style = target.style;

  let height = target.offsetHeight;

  style.overflow = "hidden";

  style.height = 0;
  style.paddingTop = 0;
  style.paddingBottom = 0;
  style.marginTop = 0;
  style.marginBottom = 0;

  target.offsetHeight;

  style.transitionProperty = "height, margin, padding";
  style.transitionDuration = `${duration}ms`;
  style.height = `${height}px`;

  [
    "padding-top",
    "padding-bottom",
    "margin-top",
    "margin-bottom",
  ].forEach(e => style.removeProperty(e));

  setTimeout(() => {
    [
      "height",
      "overflow",
      "transition-duration",
      "transition-property",
    ].forEach(e => style.removeProperty(e));
    target.classList.remove("_slide");
  }, duration);
};

let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration);
  _slideUp(target, duration);
};




*/

//у второго и третьего блока со спойлерами неправильный значок + и - 
//если + то должно бытьсвернуто