const socket = io('https://web-bb.herokuapp.com');

const message = document.getElementById('message');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
  socket.emit('message', { data: message.value });
};

socket.on('message', ({ data }) => {
  handleNewMessage(data);
});

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
  messages.appendChild(document.createElement('div'));
};

const buildNewMessage = (message) => {
  const div_m = document.createElement('div');
  div_m.className = 'chatbox__message';
  div_m.appendChild(document.createTextNode(message));
  return div_m;
};
