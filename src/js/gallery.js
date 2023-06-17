import { UnsplashAPI } from './UnsplashAPI';
import refs from './refs';
import createGalleryCard from '../templates/gallery-card.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { assignWith } from 'lodash';

const unsplashApi = new UnsplashAPI(12);

const options = { // below default value of options
  totalItems: 10,
  itemsPerPage: unsplashApi.perPage,
  visiblePages: 10,
  page: 1,
};

const pagination = new Pagination(refs.container, options);

const page = pagination.getCurrentPage()


// function onRenderPage(page) {
//   unsplashApi.getPopularPhotos(page)
//     .then(resp => {
//       refs.gallery.innerHTML = createGalleryCard(resp.results);
//       pagination.reset(resp.total);
//       pagination.on('afterMove', createPopularPagination);
//     }).catch(error => {
//       console.log(error.message)
//     })

// }

async function onRenderPage(page) {
  try {
    const resp = await unsplashApi.getPopularPhotos(page)
 
    refs.gallery.innerHTML = createGalleryCard(resp.data.results);
    pagination.reset(resp.data.total);
    pagination.on('afterMove', createPopularPagination);

    refs.container.classList.remove('is-hidden');
  }catch(error) {
    console.log(error);
  }  

  
  

}

async function createPopularPagination(e) {
  const currentPage = e.page;

  try {
    const resp = await unsplashApi.getPopularPhotos(currentPage)
 
    refs.gallery.innerHTML = createGalleryCard(resp.data.results);
    
  }catch(error) {
    console.log(error);
  } 

}

onRenderPage(page);

// Par 2

 refs.form.addEventListener("submit", onSearchSubmit);

 async function onSearchSubmit(evt) {
  evt.preventDefault();
  const searchQury = evt.currentTarget.elements['user-search-query'].value.trim();
   
  if (!searchQury){
    return alert('Empity Query');
  }
  unsplashApi.query = searchQury;
  try {
    const resp = await unsplashApi.getPhotosByQuery(page)
 
    if(resp.data.total <= unsplashApi.perPage){
      refs.container.classList.add('is-hidden');
    } else {
      refs.container.classList.remove('is-hidden');
    }

    if (resp.data.results.length === 0) {
      refs.gallery.innerHTML = "";
      refs.form.reset();
      return alert(`По вашому запиту ${searchQury} нічого не знайдено`);


      
    }





    refs.gallery.innerHTML = createGalleryCard(resp.data.results);
    pagination.reset(resp.data.total);
    pagination.off('afterMove', createPopularPagination);
    pagination.on('afterMove', createPaginationByQuery);
  }catch(error) {
    console.log(error);
  }  
 }

 async function createPaginationByQuery(evt) {
  const currentPage = evt.page;

   try {
    const resp = await unsplashApi.getPhotosByQuery(currentPage)
 
    refs.gallery.innerHTML = createGalleryCard(resp.data.results);
    
  }catch(error) {
    console.log(error);
  } 

 }

/**
  |============================
  | Імпортуй свою API і напиши фу-цію "onRenderPage()", яка буде робити запит на сервер і вона ж відрендерить розмітку. Пробуй використовувати модульний підхід
  | можешь окремо строрити файл з розміткою і потім його імпортувати для використання. Також можешь використати шаблонізатор. Ментор тобі в цьому допоможе ; )
  | 
  | Після того коли ми успішно виконали рендер данних з бекенду, передай наступному учаснику виконання наступного функціоналу. Нам потрібно перейти на сайт бібліотеки
  | і підключити пагінацію - https://www.npmnpm i tui-paginationjs.com/package/tui-pagination - Бібліотека "tui-pagination".
  |
  | Після успішного підключення пагінації передай виконання на наступного учасника. Далі нам потрібно створити новий запит за картинками по ключовому слову. Переходь
  | в UnsplashAPI.
  |
  | Ось і готовий наш другий запит, давай його випробуємо! У нас з вами тут є тег "form", давайте його використаєм, знайдемо його у Дом дереві і повісимо слуха події
  | ви знаєте яка подія повинна бути) Ну і наостанок напишемо callBack для неї "onSearchFormSubmit()", там де зробимо головну логіку. Після рендера далі дорозберемось 
  | з нашою пагінація, цікаво як вона себе буде поводитись після зміни запиту?
  |
  | Якщо у нас залишився час, давате підключимо перемикач теми. Він знаходиться у файлі "isChangeTheme.js".
  |============================
*/
