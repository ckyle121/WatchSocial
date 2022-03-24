function movieSearch() {
  // imdb get request
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const apiKey = "k_m6r8p68f";
  const searchOption = document.querySelector("#movie-search").value;
  // search bar value set to nothing
  document.querySelector("#movie-search").value = "";
  // if there is something in the search bar, fetch request
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
    console.log(movies.results[i]);
    // create a div element for each movie
    let movie = document.createElement("div");
    movie.setAttribute("data-id", movies.results[i].id);
    // get an image for the movie
    let movieImage = document.createElement("img");
    movieImage.setAttribute("src", movies.results[i].image);
    // title of movie
    let movieTitle = document.createElement("h3");
    movieTitle.textContent = movies.results[i].title;
    // year of the movie
    let movieId = document.createElement("p");
    movieId.textContent = movies.results[i].description;

    let chooseBtn = document.createElement("button");
    chooseBtn.textContent = "Choose";
    chooseBtn.className = "movieChoice";

    // append everything
    movie.appendChild(movieTitle);
    movie.appendChild(movieImage);
    movie.appendChild(movieId);
    movie.appendChild(chooseBtn);
    movieList.appendChild(movie);
  }
}

document.querySelector("#searchMovie").addEventListener("click", movieSearch);
