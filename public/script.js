const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

//getting username and room name
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

socket.on("message", (message) => {
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//submit message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //emitting to server
  socket.emit("chatMessage", msg);

  e.target.elements.msg.value = "";
});

function outputMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="user-name">${msg.username}</p> <p class="text">${msg.text}</p>`;

  document.querySelector(".chat-messages").appendChild(div);
}

document.getElementById("leave-btn").addEventListener("click", () => {
  window.location = "../index.html";
});

function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `
   ${users.map((user) => `<li>${user.username}</li>`).join("")}
   `;
}
