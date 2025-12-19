export let chats;
chats = JSON.parse(localStorage.getItem('chats')) || [
{
  chatId : '111',
  title : 'title',
  chat : [{
  id: '5003257666109042',
  query: 'what', 
  response: 'Hello what are you thinking?'}, 
  {
    id: '2341873797545321',
    query: 'why', 
    response: 'Hello what are you thinking?'},
  {
    id: '400325766634042',
    query: 'when', 
    response: 'Hello what are you thinking?'}]

}
, 

{
  chatId : '222',
  title : 'title second',
  chat : [{
  id: '7003257666109052',
  query: 'hello', 
  response: 'Hello what are you thinking?'}, 
  {
    id: '6341873797545353',
    query: 'hey', 
    response: 'Hello what are you thinking?'},
  {
    id: '800325766634056',
    query: 'hiiii', 
    response: 'Hello what are you thinking?'}]

}
];


export function saveChatsToStorage() {
  localStorage.setItem('chats', JSON.stringify(chats));
}

saveChatsToStorage();

export function loadChatsFromStorage() {
  chats = JSON.parse(localStorage.getItem('chats'));
}


