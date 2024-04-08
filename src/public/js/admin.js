const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-delete-id");

    fetch(`http://localhost:8080/api/users/${id}`, {
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

    fetch(`http://localhost:8080/api/users/premium/${id}`, {
      method: "GET",
    })
      .then(() => location.reload())
      .catch((error) => console.error("Error:", error));
  });
});
