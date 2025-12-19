let conversation = {
  id : 'id1',
  query : 'what?',
  response : 'Nothing.'
}

localStorage.removeItem('chat');

let chat = JSON.parse(localStorage.getItem('chat')) || [];

function getChatFromStorage() {
  chat = JSON.parse(localStorage.getItem('chat'));
  return chat;
}

function saveChatToStorage() {
  localStorage.setItem('chat', JSON.stringify(chat));
}

saveChatToStorage();


