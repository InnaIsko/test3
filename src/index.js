import axios from 'axios';
import * as basicLightbox from 'basiclightbox';

const getRef = selector => document.querySelector(selector);
const apiKey = '54c00021c1f0a4ca812033181f98909b';

let movieID = '';

async function getMovies() {
  const getAxios = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  console.log(getAxios);
  renderMarkup(getAxios.data.results);
  getRef('.movies__list').addEventListener('click', renderMarkupModal);
  getRef('.modal__button').addEventListener('click', closeModal);
}

function createMarkup(properties) {
  return `
     <li class="movies__item" data-id="${properties.id}">
     <a class="movies__link">
        <img class="movies__img" src="https://image.tmdb.org/t/p/w500${properties.backdrop_path}" alt="" />
        <h3 class="movies__title"">${properties.original_title}</h3>
        <p class="movies__text">${properties.release_date}</p>
        <p class="movies__text">${properties.genre_ids}</p>
      </a>
    </li> `;
}
function renderMarkup(resp) {
  resp.map(element => {
    movieID = element.id;
    const markup = createMarkup(element);
    getRef('.movies__list').insertAdjacentHTML('beforeend', markup);
  });
}

function clearMarcup() {
  getRef('.movies__list').innerHTML = ' ';
}
function clearMarcupModal() {
  getRef('.modal-movie').remove();
}
async function getMoviesOnSearch(event) {
  event.preventDefault();
  clearMarcup();
  let inputValue = getRef('.search__input').value;

  const getAxios = await axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&page=1&query=${inputValue}`
  );
  renderMarkup(getAxios.data.results);
}

function toggleModal() {
  getRef('.backdrop').classList.toggle('is-hidden');
}
function closeModal() {
  clearMarcupModal();
  toggleModal();
  window.removeEventListener('keydown', onEscClose);
}
function createMurkupModal({
  backdrop_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) {
  const genresEl = genres.map(el => {
    return el.name;
  });
  window.addEventListener('keydown', onEscClose);
  return `<div class="modal-movie">
   <div class="modal-img"><img class="modal-movie__img" src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="" />
   <button class="btn-play">Play</button></div>
    <div class="modal-movie__info">
   <h2 class="modal-movie__title">${original_title}</h2>
    <p class="modal-movie__text">Vote / Votes<span class="modal-movie__desc"> ${vote_average} / ${vote_count}</span></p>
    <p class="modal-movie__text">Popularity<span class="modal-movie__desc"> ${popularity}</span></p>
    <p class="modal-movie__text">Original Title<span class="modal-movie__desc"> ${original_title}</span></p>
    <p class="modal-movie__text">Genre<span class="modal-movie__desc"> ${genresEl}</span></p>
    <h3 class="modal-movie__caption">About </h3>
    <p class="modal-movie__lead"> ${overview}</p>
    </div>
  </div>
  `;
  // return `
  //       <<img class="modal__img" src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="Обкладинка фільму">
  //     <div class="modal-container-columns">
  //       <p class="modal__name">${original_title}</p>
  //       <div class="modal-conteiner-ul">
  //         <ul class="modal__list-theme">
  //         <li class="modal__item">
  //           <p class="modal__item-text">Vote / Votes</p>
  //         </li>
  //         <li class="modal__item">
  //           <p class="modal__item-text">Popularity</p>
  //         </li>
  //         <li class="modal__item">
  //           <p class="modal__item-text">Original Title</p>
  //         </li>
  //         <li class="modal__item">
  //           <p class="modal__item-text">Genre</p>
  //         </li>
  //       </ul>
  //         <ul class="modal__list-value">
  //         <li class="modal__item">
  //           <p class="modal__item-value slash"><span class="modal__hightlight selected">${vote_average}</span>/<span class="modal__hightlight not-selected">${vote_count}</span></p>
  //         </li>
  //         <li class="modal__item">
  //           <p class="modal__item-value">${popularity}</p>
  //         </li>
  //         <li class="modal__item">
  //           <p class="modal__item-value">${original_title}</p>
  //         </li>
  //         <li class="modal__item">
  //           <p class="modal__item-value">${genresEl}</p>
  //         </li>
  //         </ul>
  //       </div>
  //       <p class="modal__about">About</p>
  //       <p class="modal__description">${overview}</p>
  // `;
}
async function renderMarkupModal(e) {
  toggleModal();

  movieID = await e.target.parentElement.parentElement.dataset.id;

  const getAxios = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US&append_to_response=credits`
  );

  const markup = createMurkupModal(getAxios.data);
  getRef('.modal-wrap').insertAdjacentHTML('beforeend', markup);
  await getRef('.btn-play').addEventListener('click', getTrailer);
  // getRef('.modal-movie__img').addEventListener('mouseover', btnTrailer);
}
function onEscClose(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}
function onClickClose(e) {
  const targetValue = e.target.classList.value;
  const classBackdrop = 'backdrop';
  if (targetValue === classBackdrop) {
    closeModal();
  }
}
getRef('.backdrop').addEventListener('click', onClickClose);

getRef('.search').addEventListener('submit', getMoviesOnSearch);

getMovies();

async function getTrailer() {
  let idYoutub = '';
  const getAxios = axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}&language=en-US`
  );
  await getAxios.then(resp => {
    idYoutub = resp.data.results[0].key;
    console.log(idYoutub);
  });

  const instance = basicLightbox.create(`
    <iframe class="trailerPlayer" src="https://www.youtube.com/embed/${idYoutub}" width="500" height="300" frameborder="0"></iframe>
`);

  instance.show();
}
