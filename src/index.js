import axios from 'axios';
const getRef = selector => document.querySelector(selector);
let movieID = '';

function fetchVideo(event) {
  const apiKey = '54c00021c1f0a4ca812033181f98909b';
  //   let options = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}&min_height=300`;
  const getAxios = axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
  );
  return getAxios;
}
fetchVideo().then(response => {
  console.log(response.data.results);
  renderMarkup(response.data.results);
});

function createMarkup(properties) {
  return `<li class="movies__item">
        <img class="movies__img" src="${properties.backdrop_path}" alt="" />
        <h3 class="movies__title"">${properties.title}</h3>
        <p class="movies__text">${properties.release_date}</p>
    </li>`;
}
function renderMarkup(hitsAreey) {
  hitsAreey.map(element => {
    const properties = element;
    const markup = createMarkup(properties);
    movieID = element.id;
    getRef('.movies__list').insertAdjacentHTML('beforeend', markup);
  });
}
