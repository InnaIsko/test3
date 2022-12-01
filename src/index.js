import axios from 'axios';
import pagination from 'pagination';

const getRef = selector => document.querySelector(selector);
const apiKey = '54c00021c1f0a4ca812033181f98909b';

let movieID = '';
// let currentPage = 1;
// let quantityPage = 20;

async function getMovies() {
  const getAxios = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  console.log(getAxios.data.results);
  renderMarkup(getAxios.data.results);
  getRef('.movies__link').addEventListener('click', renderMarkupModal);
  getRef('.modal__button').addEventListener('click', toggleModal);
}

function createMarkup(properties) {
  return `
     <li class="movies__item">
     <a class="movies__link">
        <img class="movies__img" src="${properties.backdrop_path}" alt="" />
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
function createMurkupModal(properties) {
  return `<div class="modal-movie">
  <img class="modal-movie__img" src="${properties.backdrop_path}" alt="" />
  <h2 class="modal-movie__title">${properties.original_title}</h2>
  <p class="modal-movie__text">Vote / Votes<span class="modal-movie__desc">${properties.vote_average}/${properties.vote_count}</span></p>
  <p class="modal-movie__text">Popularity<span class="modal-movie__desc">${properties.popularity}</span></p>
  <p class="modal-movie__text">Original Title<span class="modal-movie__desc">${properties.original_title}</span></p>
  <p class="modal-movie__text">Genre<span class="modal-movie__desc">${properties.genre_ids}</span></p>
  <h3 class="modal-movie__caption">About </h3>
  <p class="modal-movie__lead">${properties.overview}</p>
</div>
<button class="modal-movie__btn">add to Watched</button>
<button class="modal-movie__btn">add to queue</button>`;
}
function renderMarkupModal(element) {
  toggleModal();
  const markup = createMurkupModal(element);
  getRef('.modal').insertAdjacentHTML('beforeend', markup);
}
getRef('.search').addEventListener('submit', getMoviesOnSearch);

getMovies();
