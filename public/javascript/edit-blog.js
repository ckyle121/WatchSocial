async function editFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector("#comment-text").value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({
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

document.querySelector(".save-post-btn").addEventListener('click', editFormHandler);
