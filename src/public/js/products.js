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

const addToCart = (productId) => {
  fetch(`./api/carts/${userData.cart}/products/${productId}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((res) => alert(res))
    .catch((error) => console.error("Error:", error));
};

const categories = document.getElementById("categories");

categories.addEventListener("change", () => {
  const url = new URL(window.location.href);
  if (categories.value == "all") {
    url.searchParams.delete("category");
    url.searchParams.set("page", 1);
    window.location.href = url.toString();
  } else {
    url.searchParams.set("category", categories.value);
    url.searchParams.set("page", 1);
    window.location.href = url.toString();
  }
});

const sort = document.getElementById("sort");

sort.addEventListener("change", () => {
  const url = new URL(window.location.href);
  if (sort.value == "unordered") {
    url.searchParams.delete("sort");
    window.location.href = url.toString();
  } else {
    url.searchParams.set("sort", sort.value);
    window.location.href = url.toString();
  }
});

const statusOpt = document.getElementById("status");

statusOpt.addEventListener("change", () => {
  const url = new URL(window.location.href);
  if (statusOpt.value == "all") {
    url.searchParams.delete("status");
    url.searchParams.set("page", 1);
    window.location.href = url.toString();
  } else {
    url.searchParams.set("status", statusOpt.value);
    url.searchParams.set("page", 1);
    window.location.href = url.toString();
  }
});

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", () => {
  fetch("./api/auth/logout")
    .then(() => (window.location.href = "/"))
    .catch((error) => console.error(error.message));
});
