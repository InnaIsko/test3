import axios from 'axios';

const getRef = selector => document.querySelector(selector);
const apiKey = '54c00021c1f0a4ca812033181f98909b';
let moviId = '';

// function createMarkup(properties) {
//   return `
//      <li class="movies__item">
//      <a class="movies__link">
//         <img class="movies__img" src="${properties.backdrop_path}" alt="" />
//         <h3 class="movies__title"">${properties.original_title}</h3>
//         <p class="movies__text">${properties.release_date}</p>
//         <p class="movies__text">${properties.genre_ids}</p>
//       </a>
//     </li> `;
// }
// function renderMarkup(resp) {
//   resp.map(element => {
//     const markup = createMarkup(element);
//     getRef('.movies__list').insertAdjacentHTML('beforeend', markup);
//   });
// }

// function clearMarcup() {
//   getRef('.movies__list').innerHTML = ' ';
// }
// async function getMoviesOnSearch(event) {
//   event.preventDefault();
//   clearMarcup();
//   let inputValue = getRef('.search__input').value;

//   const getAxios = await axios.get(
//     `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&page=1&query=${inputValue}`
//   );
//   renderMarkup(getAxios.data.results);
// }
// getRef('.search').addEventListener('submit', getMoviesOnSearch);
// getMovies();
