let socket = io();
let userName;

Swal.fire({
  title: "Write your name :)",
  input: "text",
  inputValidator: (value) => !value && "please write your name",
  allowOutsideClick: false,
}).then((res) => {
  userName = res.value;
  document.getElementById("username").innerHTML = userName;
  socket.emit("auth", userName);
  //   console.log(userName);
});

let chatBox = document.getElementById("chatBox");
chatBox.addEventListener("keyup", send);

function send(e) {
  if (e.key === "Enter") {
    // console.log(chatBox.value);
    socket.emit("new_message", {
      userName,
      message: chatBox.value,
    });
  }
}

socket.on("allMessagess", (data) => {
  document.getElementById("messagess").innerHTML = data
    .map((message) => `<br><b>${message.userName}</b>: ${message.message}`)
    .join("");
}); // mapeo para transformar el array en un array de strings a ser unidos con el met join()