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
      .then((result) => {
        console.log(result);
        showMovies(result);
      })
      .catch((error) => console.log("error", error));
  } else {
    alert("Please enter search information");
  }
}

function showMovies(movies) {
  const movieList = document.querySelector("#movieList");
  const tryAgain = document.querySelector("#try-again");
  // if movielist has child elements, remove them for the next search
  while (movieList.firstChild) {
    movieList.removeChild(movieList.firstChild);
  }
  //   for loop for top 5 movies of the search
  let temp = "";
  for (let i = 0; i < 5; i++) {
    temp += `<div class="movie-card" data-id=${movies.results[i].id}>
    <img src="${movies.results[i].image}"></img>
    <div class="movie-name">${movies.results[i].title}</div>
    <div class="movie-review">${movies.results[i].description.substr(
      0,
      6
    )}</div>
    <div class="movie-choice"><button type="button" data-bs-toggle="modal" data-bs-target="#movieReview" class="movieChoice">Choose This One</button></div>
  </div>`;

    // let movie = document.createElement("div");
    // movie.setAttribute("data-id", movies.results[i].id);
    // movie.className = "movieListSingleEl";

    // let movieImage = document.createElement("img");
    // movieImage.setAttribute("src", movies.results[i].image);
    // // title of movie
    // let movieInfo = document.createElement("div");
    // movieInfo.className = "container d-grid gap-2";

    // let movieTitle = document.createElement("h4");
    // movieTitle.textContent = movies.results[i].title;
    // movieTitle.className = "text-center";

    // let movieId = document.createElement("p");
    // movieId.textContent = movies.results[i].description.substr(0, 6);
    // movieId.className = "text-center";

    // let chooseBtn = document.createElement("button");
    // chooseBtn.setAttribute("type", "button");
    // chooseBtn.setAttribute("data-bs-toggle", "modal");
    // chooseBtn.setAttribute("data-bs-target", "#movieReview");
    // chooseBtn.textContent = "Choose This One";
    // chooseBtn.className = "movieChoice";

    // movieInfo.appendChild(movieTitle);
    // movieInfo.appendChild(movieId);
    // movieInfo.appendChild(chooseBtn);

    // movie.appendChild(movieImage);
    // movie.appendChild(movieInfo);

    // movieList.appendChild(temp);
  }

  movieList.innerHTML = temp;

  if (!tryAgain.firstChild) {
    let tryAgainEl = document.createElement("a");
    tryAgainEl.setAttribute("href", "/dashboard");
    tryAgainEl.textContent =
      "Didn't see what you were looking for? Try to get more specific. We aren't mind readers.";
    tryAgain.appendChild(tryAgainEl);
  }
}

document.querySelector("#searchMovie").addEventListener("click", movieSearch);
