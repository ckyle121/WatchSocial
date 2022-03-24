const movieList = document.querySelector("#movielist");

async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;
  const movie_rating = document.querySelectorAll(".fas").length;
  const movie_id = document
    .querySelector('input[name="post-title"]')
    .getAttribute("data-id");

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
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const comment = await fetch(`/api/comment`, {
    method: "POST",
    body: JSON.stringify({
      post_text,
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
    document.querySelector("#post-title").value =
      e.target.parentElement.childNodes[0].textContent;
    const movie_id = e.target.parentElement.getAttribute("data-id");
    console.log(movie_id);
    document.querySelector("#post-title").setAttribute("data-id", movie_id);
  }
});
