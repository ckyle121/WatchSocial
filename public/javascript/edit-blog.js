async function editFormHandler(event) {
  event.preventDefault();

  // const title = document.querySelector('input[name="post-title"]').value.trim();
  const comment_text = document.querySelector("#comment-text").value.trim();
  console.log(comment_text);
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      // title,
      comment_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
