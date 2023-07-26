const chatForm = document.getElementById('chat-form')
const socket = io();

socket.on('message',message=>{
    console.log(message);
}) 

//submit message
chatForm.addEventListener('submit',(e)=>{
     e.preventDefault();

     const msg = e.target.elements.msg.value;

     //emitting to server
     socket.emit('chatMessage',msg);
})