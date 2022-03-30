const tryAgain = document.querySelector("#try-again");
function movieSearch() {
  event.preventDefault();

  tryAgain.innerHTML = `<div class="spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>`;
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
        showMovies(result);
      })
      .catch((error) => {
        console.log("error", error);
        tryAgain.innerHTML = "";
      });
  } else {
    alert("Please enter search information");
    tryAgain.innerHTML = "";
  }
}

function showMovies(movies) {
  const movieList = document.querySelector("#movieList");
  // if movielist has child elements, remove them for the next search
  while (movieList.firstChild) {
    movieList.removeChild(movieList.firstChild);
  }
  //  for loop for top 5 movies of the search
  let temp = "";
  for (let i = 0; i < 5; i++) {
    temp += `<div class="userCard" data-id=${
      movies.results[i].id
    } style="background-image: url('${movies.results[i].image}')">
      <h3 class="title movie-name">${
        movies.results[i].title
      }</h3><div class="inner-text">${movies.results[i].description.substr(
      0,
      6
    )}</div>
      <div class="bottom-button"><button type="button" data-bs-toggle="modal" data-bs-target="#movieReview" class="movieChoice">Choose This One</button></div>
    </div>`;
  }

  movieList.innerHTML = temp;

  tryAgain.innerHTML = `<a href="/dashboard">Didn't see what you were looking for? Try to get more specific. We aren't mind readers.</a>`;
}

document.querySelector("#searchMovie").addEventListener("click", movieSearch);
