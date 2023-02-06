// Your Code Here!

console.log("Movies:", movies);
console.log("MovieDetails:", movieDetails);

const combinedMovies = movies.reduce((combined, currMovie) => {
  const movieInMovieDetails = movieDetails.find(
    (movie) => movie.title === currMovie.title
  );

  if (!movieInMovieDetails) return combined;

  const combinedMovie = { ...currMovie, ...movieInMovieDetails };
  combined.push(combinedMovie);
  return combined;
}, []);

console.log("Combined Movies:", combinedMovies);

function renderMovies(movies) {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";

  const cards = movies.map((movie) => {
    const card = createTextElement("div", "", "movie-card");
    const h3 = createTextElement("h3", movie.title);
    const yearSpan = createTextElement("span", movie.year);
    const img = createImgElement(movie.imageUrl, movie.title, "movie-poster");
    const cast = createTextElement("span", movie.cast.join(",  "));

    card.append(img, h3, yearSpan, cast);

    return card;
  });

  movieList.append(...cards);
}

function createTextElement(elem, innerText, classes) {
  const el = document.createElement(elem);
  el.innerText = innerText;
  if (classes) {
    if (Array.isArray(classes)) {
      classes.forEach((className) => el.classList.add(className));
    } else {
      el.classList.add(classes);
    }
  }
  return el;
}

function createImgElement(src, alt, className) {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.classList.add(className);
  imgContainer.append(img);
  return imgContainer;
}

function createUlElement(strings) {
  const ul = document.createElement("ul");
  strings.forEach((str) => {
    const li = document.createElement("li");
    li.innerText = str;
    ul.appendChild(li);
  });

  return ul;
}
const form = document.getElementById("search-form");

form.addEventListener("submit", searchForMovie);

function searchForMovie(e) {
  e.preventDefault();

  const titleSearch = form[0].value;
  const castSearch = form[1].value;

  const moviesToRender = combinedMovies.filter((movie) => {
    const doesTitleMatch = movie.title
      .toLowerCase()
      .includes(titleSearch.toLowerCase());
    const doesCastMatch = movie.cast.some((castName) =>
      castName.toLowerCase().includes(castSearch.toLowerCase())
    );

    return doesTitleMatch && doesCastMatch;
  });

  renderMovies(moviesToRender);
}

renderMovies(combinedMovies);
