const socket = io();

socket.on("messages", (data) => {
  document.getElementById("messages").innerHTML = "";
  data.forEach((element) => {
    document.getElementById(
      "messages"
    ).innerHTML += `<article><p>Usuario: ${element.user}</p><p>Mensaje: ${element.message}</p></article>`;
  });
});

const addMessageForm = document.getElementById("addMessage");

addMessageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {};

  formData.user = addMessageForm.elements.user.value;
  formData.message = addMessageForm.elements.message.value;

  if (!formData.user || !formData.message) {
    alert("Debe completar ambos campos");
  } else {
    socket.emit("new-message", formData);
  }
});
