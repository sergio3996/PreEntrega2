const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-delete-id");

    fetch(`./api/users/${id}`, {
      method: "DELETE",
    })
      .then(() => location.reload())
      .catch((error) => console.error("Error:", error));
  });
});

const changeRoleButtons = document.querySelectorAll(".role-button");

changeRoleButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-role-id");

    fetch(`./api/users/premium/${id}`, {
      method: "GET",
    })
      .then(() => location.reload())
      .catch((error) => console.error("Error:", error));
  });
});
