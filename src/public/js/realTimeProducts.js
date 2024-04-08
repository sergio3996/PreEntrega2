const socket = io();

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

socket.on("products", (data) => {
  document.getElementById("products").innerHTML = "";
  data.forEach((element) => {
    document.getElementById(
      "products"
    ).innerHTML += `<div style="border: solid; margin: 5px;"><p>Id: ${element._id}</p><p>Nombre: ${element.title}</p></div>`;
  });
});

const addProductform = document.getElementById("addProduct");

addProductform.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {};

  formData.title = addProductform.elements.title.value;
  formData.description = addProductform.elements.description.value;
  formData.price = addProductform.elements.price.value;
  formData.thumbnail = addProductform.elements.thumbnail.value;
  formData.code = addProductform.elements.code.value;
  formData.stock = addProductform.elements.stock.value;
  formData.status = addProductform.elements.status.value;
  formData.category = addProductform.elements.category.value;
  formData.owner = userData.email;

  if (
    !formData.title ||
    !formData.description ||
    !formData.price ||
    !formData.code ||
    !formData.stock ||
    !formData.category
  ) {
    alert("Debe rellenar todos los campos");
  } else {
    socket.emit("new-product", formData);
  }
});

const deleteProductForm = document.getElementById("deleteProduct");

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let productId = deleteProductForm.elements.id.value;

  const data = {
    productId,
    userData,
  };

  if (productId) {
    socket.emit("delete-product", data);
  } else {
    alert("Debe llenar el campo");
  }
});
