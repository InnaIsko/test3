import axios from 'axios';
import firebase from 'firebase/firebase-node';
import pagination from 'pagination';

const getRef = selector => document.querySelector(selector);
const apiKey = '54c00021c1f0a4ca812033181f98909b';

// let movieID = '';
// let currentPage = 1;
// let quantityPage = 20;

async function getMovies() {
  const getAxios = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  console.log(getAxios.data.results);
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
  getRef('.modal-wrap').remove();
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
  return `<div class="modal-wrap"><div class="modal-movie">
  <img class="modal-movie__img" src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="" />
  <h2 class="modal-movie__title">${original_title}</h2>
  <p class="modal-movie__text">Vote / Votes<span class="modal-movie__desc"> ${vote_average} / ${vote_count}</span></p>
  <p class="modal-movie__text">Popularity<span class="modal-movie__desc"> ${popularity}</span></p>
  <p class="modal-movie__text">Original Title<span class="modal-movie__desc"> ${original_title}</span></p>
  <p class="modal-movie__text">Genre<span class="modal-movie__desc"> ${genresEl}</span></p>
  <h3 class="modal-movie__caption">About </h3>
  <p class="modal-movie__lead"> ${overview}</p>
</div>
<button class="modal-movie__btn">add to Watched</button>
<button class="modal-movie__btn">add to queue</button> </div>`;
}
async function renderMarkupModal(e) {
  toggleModal();

  let movieID = await e.target.parentElement.parentElement.dataset.id;

  const getAxios = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US&append_to_response=credits`
  );
  console.log(getAxios);
  const markup = createMurkupModal(getAxios.data);
  getRef('.modal').insertAdjacentHTML('beforeend', markup);
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
console.log(firebase);
