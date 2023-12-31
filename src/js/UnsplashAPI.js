export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/';
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #PHOTO_PATH = 'search/photos';

  constructor(perPage) {
    this.perPage = perPage;
  }
  getPopularPhotos(page) {
    return fetch(
      `${this.#BASE_URL}${
        this.#PHOTO_PATH
      }?page=${page}&query=random&per_page=${this.perPage}&client_id=${
        this.#API_KEY
      }`
    ).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    });
  }
}

/**
  |============================
  | Щоб розпочати працювати, нам необхідно створити запит на сервер "getPopularPhotos(page)" і отримати данні. У перщій частини нам  
  | потрібно створити запит за рандомними картинками. Для цього ознайомся з API - https://unsplash.com/documentation#search-photos. Не забувай робити експорти. 
  | Після створення запиту, перевірь його, перейди до "gallery.js", зроби запит і відрендери розмітку, на початкову сторінку. Полетіли у "gallery.js".
  | 
  |
  | І знову ти тут ; ) Це означає, що ми дойшли до створення наступного запиту. Створи запит getchPhotosByQuery(query). Він повинен робити запит по ключовому слову.
  | Якщо ми будемо використовувати class для створення запиту, нам будуть потрібні гетери і сетери для запису нашого "query"
  | 
  | На цьому робота з бекендом закінчена, вертаємось в "gallery.js" і продовжуємо.
  |============================
*/
