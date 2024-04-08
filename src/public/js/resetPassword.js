document.getElementById("resetPassword").addEventListener("submit", (e) => {
  e.preventDefault();

  const currentUrl = window.location.href;
  const token = currentUrl.split("/")[4];

  const password = document.querySelector('input[name="password"]').value;

  let data = {
    password: password,
  };

  fetch(`./api/auth/reset-password/${token}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response == "Token inválido o expirado") {
        alert(response);
        window.location.href = "/forgot-password";
      } else {
        alert(response);
      }
    });
});
