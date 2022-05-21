const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': API_KEY,
  },
});

// Utils ============================

const createMovies = (movies, container) => {
  container.innerHTML = '';
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click',()=>{
    location.hash = '#movie=' + movie.id;
    })

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
     
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer)
  });
};

const createCategories = (categories, container) => {
  container.innerHTML = '';
  
  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', ()=>{
      location.hash = `#category=${category.id}-${category.name}`;
    })
    const categoryTitleText = document.createTextNode(category.name);
     
    categoryTitle.appendChild(categoryTitleText)
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer)
  });
};

// API Calling ============================
const getTrendingMoviesPreview = async () => {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
};

const getCategoriesPreview = async () => {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
};

const getMoviesByCategory = async (id) => {
  const { data } = await api('discover/movie',{
    params: {
      with_genres: id,
    }
  });
  const movies = data.results;

  createMovies(movies, genericSection)
}

const getMoviesBySearch = async (query) => {
  const { data } = await api('search/movie',{
    params: {
      query,
    }
  });
  const movies = data.results;

  createMovies(movies, genericSection)
}

const getTrendingMovies = async () => {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, genericSection);
};

const getMovieById = async (id) => {
  const { data:movie } = await api('movie/' + id);

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;
};