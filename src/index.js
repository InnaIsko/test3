import axios from 'axios';
import pagination from 'pagination';

const getRef = selector => document.querySelector(selector);
const apiKey = '54c00021c1f0a4ca812033181f98909b';

let movieID = '';
let currentPage = 1;
let quantityPage = 20;

async function getMovies() {
  const getAxios = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  return getAxios;
}
getMovies().then(response => {
  console.log(response.data.results);
  renderMarkup(response.data.results);
});

function createMarkup(properties) {
  return `<li class="movies__item">
        <img class="movies__img" src="${properties.backdrop_path}" alt="" />
        <h3 class="movies__title"">${properties.original_title}</h3>
        <p class="movies__text">${properties.release_date}</p>
        <p class="movies__text">${properties.genre_ids}
    </li>`;
}
function renderMarkup(resp) {
  resp.map(element => {
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
  return getAxios;
}
// getMoviesOnSearch().then(response => {
//   console.log(response.data.results);
//   renderMarkup(response.data.results);
// });
getRef('.search').addEventListener('submit', getMoviesOnSearch);
