const movieList = document.querySelector("#movielist");

async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#movie-title").textContent;
  const comment_text = document.querySelector(
    'textarea[name="post-text"]'
  ).value;
  const movie_rating = document.querySelectorAll(".fas").length;
  const poster = document.querySelector("#movie-poster").getAttribute("src");
  const movie_id = document
    .querySelector("#movie-title")
    .getAttribute("data-id");

  // console.log(movie_rating_length);
  // let ratingArr = [];
  // for (let i = 0; i < movie_rating_length; i++) {
  //   ratingArr.push(i);
  // }

  // console.log(ratingArr);
  // const movie_rating = JSON.stringify(ratingArr);
  // console.log(movie_rating);

  const movieResponse = await fetch(`/api/movie/${movie_id}`, {
    method: "GET",
  });

  console.log(movieResponse);
  if (!movieResponse.ok) {
    const postNewMovie = await fetch(`/api/movie`, {
      method: "POST",
      body: JSON.stringify({
        movie_id,
        title,
        poster,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const comment = await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({
      comment_text,
      movie_id,
      movie_rating,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (comment.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

// Use the choose button from a movie and populate the info
document.addEventListener("click", function (e) {
  if (e.target && e.target.className == "movieChoice") {
    console.log(e.target.parentElement.parentElement);
    document.querySelector("#movie-title").innerText =
      e.target.parentElement.childNodes[0].textContent;
    const movie_id =
      e.target.parentElement.parentElement.getAttribute("data-id");
    document.querySelector("#movie-title").setAttribute("data-id", movie_id);
    const moviePoster = e.target.parentElement.parentElement.childNodes[0].src;
    document.querySelector("#movie-poster").setAttribute("src", moviePoster);
  }
});
