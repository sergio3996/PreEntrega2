const socket = io();

socket.on("products", (data) => {
  document.getElementById("products").innerHTML = "";
  data.forEach((element) => {
    document.getElementById(
      "products"
    ).innerHTML += `<div><p>Id: ${element._id}</p><p>Nombre: ${element.title}</p></div>`;
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

  if (productId) {
    socket.emit("delete-product", productId);
  } else {
    alert("Debe llenar el campo");
  }
});
