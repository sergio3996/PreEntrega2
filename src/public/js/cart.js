const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

const token = getCookie("token");
let userData;

if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  userData = decodedToken.user;
} else {
  console.log("No se ha encontrado un token JWT en la cookie.");
}

const removeFromCart = (productId) => {
  fetch(
    `http://localhost:8080/api/carts/${userData.cart}/products/${productId}`,
    {
      method: "DELETE",
    }
  )
    .then(() => location.reload())
    .catch((error) => console.error("Error:", error));
};

const purchaseButton = document.getElementById("purchase");

purchaseButton.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:8080/api/carts/purchase", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      location.reload();
    })
    .catch((error) => console.error(error));
});
