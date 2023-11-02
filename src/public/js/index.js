const socket = io();

socket.on("products", (data) => {
  document.getElementById("products").innerHTML = "";
  data.forEach((element) => {
    document.getElementById(
      "products"
    ).innerHTML += `<div><p>Id: ${element.id}</p><p>Nombre: ${element.title}</p></div>`;
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

  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
});

const deleteProductForm = document.getElementById("deleteProduct");

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {};

  formData.id = deleteProductForm.elements.id.value;

  fetch(`/api/products/${formData.id}`, {
    method: "DELETE",
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
});
