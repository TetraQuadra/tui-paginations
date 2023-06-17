import { UnsplashAPI } from './UnsplashAPI';
import refs from './refs';
import createGalleryCard from '../templates/gallery-card.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const unsplashApi = new UnsplashAPI(12);

const options = { // below default value of options
  totalItems: 10,
  itemsPerPage: unsplashApi.perPage,
  visiblePages: 10,
  page: 1,
};

const pagination = new Pagination(refs.container, options);

const page = pagination.getCurrentPage()


function onRenderPage(page) {
  unsplashApi.getPopularPhotos(page)
    .then(resp => {
      refs.gallery.innerHTML = createGalleryCard(resp.results);
      pagination.reset(resp.total);
      pagination.on('afterMove', createPopularPagination);
    }).catch(error => {
      console.log(error.message)
    })

}

function createPopularPagination(e) {
  const currentPage = e.page;

  unsplashApi.getPopularPhotos(currentPage)
    .then((resp) => {
      refs.gallery.innerHTML = createGalleryCard(resp.results);
    }).catch((err)=>{console.log(err);})

}

onRenderPage(page);
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
