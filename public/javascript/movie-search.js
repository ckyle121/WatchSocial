function movieSearch() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const apiKey = "k_m6r8p68f";
  const searchOption = document.querySelector("#movie-search").value;
  document.querySelector("#movie-search").value = "";
  if (searchOption) {
    fetch(
      `https://imdb-api.com/API/Search/${apiKey}/${searchOption}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => showMovies(result))
      .catch((error) => console.log("error", error));
  } else {
    alert("Please enter search information");
  }
}

function showMovies(movies) {
  const movieList = document.querySelector("#movieList");
  //   for loop for top 5 movies of the search
  for (let i = 0; i < 5; i++) {
    // create a div element for each movie
    let movie = document.createElement("div");
    // get an image for the movie
    let movieImage = document.createElement("img");
    movieImage.setAttribute("src", movies.results[i].image);
    // title of movie
    let movieTitle = document.createElement("h3");
    movieTitle.textContent = movies.results[i].title;
    // year of the movie
    let movieYear = document.createElement("p");
    movieYear.textContent = movies.results[i].description;

    movie.appendChild(movieTitle);
    movie.appendChild(movieImage);
    movie.appendChild(movieYear);
    movieList.appendChild(movie);
  }
}

document.querySelector("#searchMovie").addEventListener("click", movieSearch);
