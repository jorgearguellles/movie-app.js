const navigator = () => {
  if(location.hash.startsWith('#trends')){
    trendPage();
  } else if(location.hash.startsWith('#search=')){
    searchPage()
  } else if(location.hash.startsWith('#movie=')){
    moviePage()
  } else if(location.hash.startsWith('#category=')){
    categoryPage()
  } else {
    homePage()
  }
};

const trendPage = () => {console.log('Trends !')};
const searchPage = () => {console.log('Search !')};
const moviePage = () => {console.log('Movie !')};
const categoryPage = () => {console.log('Category !')};
const homePage = () => {
  console.log('Home !');
  getTrendingMoviesPreview();
  getCategoriesPreview();
};

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);