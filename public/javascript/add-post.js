const movieList = document.querySelector("#movielist");

async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

  console.log(title, post_text);

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
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
    console.log(e.target.parentElement.childNodes);
    document.querySelector("#post-title").value =
      e.target.parentElement.childNodes[0].textContent;
    document.querySelector("#movie-year").value =
      e.target.parentElement.childNodes[2].textContent;
  }
});