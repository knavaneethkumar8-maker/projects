import { chats, loadChatsFromStorage, saveChatsToStorage } from "../../data/chats.js";
import { newChat, removeNewChat, renderChatSection, createNewId , renderChat, sendMessage} from "../chatSection/chatPage.js";
import { sidebarIcons } from "../../data/icons.js";
//import { getChatFromStorage } from "../../data/chat.js";


export function renderChatsSection() {
  renderChatsHistory();
  renameChatTitle();
  showActionCard();
  deleteChat();
  hideChatsHistory();
}

export function renderChatsHistory() {
  const chatsElement = document.querySelector('.js-chats-container');
  let chatsHistoryHTML = '';

  chats.forEach((chat) => {
    //console.log(chat.title);
    chatsHistoryHTML += `
    <div class="chat-info-container js-show-chat-button"
    data-chat-id="${chat.chatId}">
      <p class="chat-title edit-title no-pointer-events js-chat-title-${chat.chatId}" data-chat-id="${chat.chatId}" contenteditable="false">
        ${chat.title}
      </p>
      <div class="more-icon-container action-card" data-chat-id="${chat.chatId}">
          ${sidebarIcons.more}
      </div>
    </div>

    `;
  });

  chatsElement.innerHTML = chatsHistoryHTML;
  showChat();

}

//renderChatsHistory();


//createNewChat();


function renameChatTitle() {
  
  const renameButton = document.querySelector('.js-rename-button');
  const actionCard = document.querySelector('.js-more-actions-card');
  

  renameButton.addEventListener('click', () => {
    //console.log('rename');
    const chatId = actionCard.dataset.chatId;
    //console.log(chatId);

    const selectedChat = document.querySelector(`.js-chat-title-${chatId}`);
    selectedChat.classList.remove('no-pointer-events');
    
    //console.log(selectedChat.innerText);
    
    selectedChat.style.textOverflow = 'clip';
    selectedChat.contentEditable = 'true';
    selectedChat.classList.add('edit-title');

    selectedChat.style.cursor = 'text';
    selectedChat.style.overflowX = 'auto';


    selectedChat.focus();


    const range = document.createRange();
    range.selectNodeContents(selectedChat);


    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    selectedChat.scrollLeft = selectedChat.scrollWidth;

  })

  document.addEventListener('keydown', (event) => {
    const selectedElem = event.target;
    const title = event.target.innerText;

    const chatId = selectedElem.dataset.chatId;
    //findMatchingChat(chatId);
    const matchingChat = findMatchingChat(chatId);
    if(event.key === 'Enter') {
      if(selectedElem.classList.contains('edit-title')) {
        event.preventDefault();
      matchingChat.title = title; // chat is object and just references , hence changing here also changes the values inside the chats
      //console.log(chats);

      pushChatAbove(matchingChat);

      selectedElem.classList.remove('edit-title');
      selectedElem.classList.add('no-pointer-events');
      //console.log(selectedElem.classList);
      saveChatsToStorage();
      renderChatsHistory();
      }
      
    }
  });
  
}

//renameChatTitle();

function pushChatAbove(matchingChat) {
  let tempChat = matchingChat;
  chats.splice(chats.indexOf(matchingChat), 1);
  chats.unshift(tempChat);
}

function findMatchingChat(id) {
  let matchingChat = [];
  
  chats.forEach((chat) => {
    if(chat.chatId === id) {
      matchingChat = chat;
      //console.log(matchingChat);
      //console.log('found');
    }
  });

  return matchingChat;
}




function showActionCard() {
    const actionCard = document.querySelector('.js-more-actions-card');

    document.addEventListener('click', (event) => {

        if(event.target.classList.contains('action-card')) {
            actionCard.dataset.chatId = event.target.dataset.chatId;

            const rect = event.target.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const bottomSpace = windowHeight - rect.bottom;
            const topSpace = windowHeight - bottomSpace - rect.height;

            actionCard.style.left = rect.right - 42 + 'px';

            if((windowHeight-rect.top) > 260) {
                actionCard.style.top = rect.bottom + 6 + 'px';
                actionCard.style.height = 'auto';
            } else if (topSpace >= bottomSpace) {
                if(topSpace >= 260) {
                    actionCard.style.top = rect.top - 234 + 'px';
                } else {
                    const newHeight = topSpace - 40;
                    actionCard.style.top = rect.top - newHeight - 14 + 'px';
                    actionCard.style.height = newHeight + 'px';
                }

            } else {
                const newHeight = bottomSpace-40;
                actionCard.style.height = newHeight + 'px';
                actionCard.style.top = rect.bottom + 6 + 'px';
            }

            actionCard.style.display = "flex";
            //console.log(actionCard.offsetHeight);
        } else {
            actionCard.style.display = "none";
        }

    });

}

//showActionCard();



function deleteChat() {
  const deleteButton = document.querySelector('.js-delete-chat-button');
  const actionCard = document.querySelector('.js-more-actions-card');
  const popUp = document.querySelector('.js-delete-pop-up');
  const cancelButton = document.querySelector('.js-cancel-button');
  const confirmDelete = document.querySelector('.js-confirm-delete');
  const chatTitle = document.querySelector('.js-chat-title-bold');
  let chatId;
  let matchingChat;

  deleteButton.addEventListener('click', () => {
    chatId = actionCard.dataset.chatId;
    matchingChat = findMatchingChat(chatId);
    chatTitle.innerText = matchingChat.title;
    popUp.style.display = 'flex';
  });

  cancelButton.addEventListener('click', () => {
    popUp.style.display = 'none';
  });

  confirmDelete.addEventListener('click', () => {
    const newChatButton = document.querySelector('.js-new-chat-button');
    newChatButton.classList.remove('open-new-chat');

    chats.splice(chats.indexOf(matchingChat), 1);
    popUp.style.display = 'none';
    saveChatsToStorage();
    renderChatsHistory();
    renderChatSection();
    newChat();
  });


}

//deleteChat();


function showChat() {

  const chatButtons = document.querySelectorAll('.js-show-chat-button');

  chatButtons.forEach((chatButton) => {
    chatButton.addEventListener('click', (event) => {
    
      chatButtons.forEach((button) => {
        if(event.target === button) {
          button.classList.add('showing-chat');
        } else {
          button.classList.remove('showing-chat');
        }
      });

      //chatButton.classList.add('showing-chat');
      const chatId = chatButton.dataset.chatId;
      //console.log(chatId);
      loadChatsFromStorage();
      const matchingChat = findMatchingChat(chatId);
      //console.log(matchingChat);
      //const chat = getChatFromStorage();
      //console.log(chat);
      removeNewChat();
      //renderChat(chat);
      renderChatSection(matchingChat.chat);
    });
  });

}

function hideChatsHistory() {
  const chatsButton = document.querySelector('.js-your-chats-button');
  const chats = document.querySelector('.js-chats-container');
  const rightArrow = document.querySelector('.js-right-arrow');
  const downArrow = document.querySelector('.js-down-arrow');

  chatsButton.addEventListener('click', () => {
    if(chats.classList.contains('hide-chat-history')) {
      chats.classList.remove('hide-chat-history');
      rightArrow.classList.add('arrow-icon-hidden');
      downArrow.classList.remove('arrow-icon-hidden');
    } else {
      chats.classList.add('hide-chat-history');
      rightArrow.classList.remove('arrow-icon-hidden');
      downArrow.classList.add('arrow-icon-hidden');
    }
  })
}
