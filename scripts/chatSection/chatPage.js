//import { saveChatToStorage, getChatFromStorage } from "../../data/chat.js";
import { responseIcons , chatHeaderIcons, inputSectionIcons, uploadCardIcons} from "../../data/icons.js";
import { responses, getResponse } from "../../data/response.js";

import { chats, saveChatsToStorage, loadChatsFromStorage } from "../../data/chats.js";

import { renderChatsHistory } from "../sideBarSection/yourChats.js";


loadChatsFromStorage();

let keydownController;

export function renderChatPage() {
  renderChatSection();
  openNewChat();
  showChatActionCard();
  showFreeOffer();
  window.addEventListener('resize', () => {
    showFreeOffer();
  });
  
  
}



export function renderChat(chat = []) {
  //getChatFromStorage();
  //console.log(chat);
  const chatContent = document.querySelector('.js-chat-content');
  const chatPage = document.querySelector('.js-chat-section');
  //chatPage.classList.remove('new-chat');
  let chatHTML = '';
  //console.log(chat);

  chat.forEach((convo) => {
    chatHTML +=`
    <div class="user-query-container">
        <p class="user-query">
            ${convo.query}
        </p>
    </div>

    <div class="ai-response-container">
        <p class="text-response">
            ${convo.response}
        </p>

        <div class="box-response">
            <div class="box-header">
                <p class="language-label">CSS</p>
                <div class="copy-code-button">
                    <div class="copy-icon-container">
                        ${responseIcons.copy}
                    </div>
                    Copy Code
                </div>

            </div>

        </div>

        <div class="response-actions">
            <div class="response-icon-container js-show-button-tip" 
            data-tooltip="Copy">
                ${responseIcons.copy}
            </div>

            <div class="response-icon-container js-show-button-tip" 
            data-tooltip="Good response">
              ${responseIcons.thumbLike}
            </div>

            <div class="response-icon-container js-show-button-tip" 
            data-tooltip="Bad response">
            ${responseIcons.thumbDislike}


            </div>

            <div class="response-icon-container js-show-button-tip" 
            data-tooltip="Share">
              ${responseIcons.share}
            </div>


            <div class="response-icon-container js-show-button-tip" 
            data-tooltip="Try again">
              ${responseIcons.repeat}

            </div>

            <div class="response-icon-container js-show-button-tip more-response-actions-button js-more-response-actions js-more-actions" 
            data-tooltip="More actions" data-convo-id="${convo.id}">
                ${responseIcons.more}
            </div>

            <div class="more-response-actions-card js-more-response-actions-card-${convo.id}">
                    <div class="response-action-card-button">
                        <div class="icon-container">
                          ${responseIcons.branch}
                            
                        </div>
                        <p class="button-label">
                            Branch in new chat
                        </p>
                    </div>

                    <div class="response-action-card-button ">
                        <div class="icon-container">
                            ${responseIcons.loudSpeaker}
                        </div>
                        <p class="button-label">
                            Read loud
                        </p>
                    </div>

                    <div class="response-action-card-button">
                        <div class="icon-container">
                            ${responseIcons.flag}
                        </div>
                        <p class="button-label">
                            Report message
                        </p>
                    </div>

                </div>

        </div>

    </div>
    `;
  });

  chatContent.innerHTML = chatHTML;
  showMoreResponseActions();
  showButtonToolTips();
}



export function renderChatSection(chat = []){
  const chatSection = document.querySelector('.js-chat-section');
  //console.log(chatSection);
  //chatSection.classList.add('new-chat');

  const chatPageHTML = `
  <div class="chat-section-header">
    <div class="chat-header-left-section">
        <div class="menu-icon-container">
            ${chatHeaderIcons.menu}
        </div>

        <div class="select-version-button js-select-version-button">
            <p class="version-label no-pointer-events">ChatGPT</p>
            <div class="chat-arrow-icon-container no-pointer-events">
                ${chatHeaderIcons.downArrow}
            </svg>
            </div>
        </div>
    </div>

    <div class="chat-header-middle-section">
      <button class="free-offer-button js-free-offer-button">
          <div class="gift-icon-container">
              ${chatHeaderIcons.giftBox}
          </div>
          <p class="button-label">Free offer</p>
          
      </button>
    </div>

    <div class="chat-header-right-section">
        <button class="chat-header-button">
            <div class="button-icon-container">
                ${chatHeaderIcons.share}
            </div>
            <p class="action-button-label">Share</p>
        </button>

        <button class="chat-header-button js-show-button-tip"
                data-tooltip="Start a group chat">
            <div class="button-icon-container">
                ${chatHeaderIcons.addPerson}
            </div>
            <p class="action-button-label">Add people</p>
        </button>

        <button class="chat-header-button more-chat-actions-button
                    js-more-chat-actions-button more-chat-actions">
            <div class="button-icon-container chat-more-icon-container more-chat-actions">
                ${chatHeaderIcons.moreDots}
            </div>
        </button>
        
    </div>

    <div class="select-version-card js-show-version-card">
      <div class="version-button">
          <div class="version-icon-container">
              ${chatHeaderIcons.proDiamond}
          </div>
          <div class="version-details">
              <p class="version-name">ChatGPT Pro</p>
              <p class="version-description">Our smartest model & more</p>
          </div>
          <button class="upgrade-button version-upgrade-button js-upgrade-button">
              Upgrade
          </button>

      </div>

      <div class="version-button">
        <div class="version-icon-container">
            ${chatHeaderIcons.diamond}
        </div>
        <div class="version-details">
            <p class="version-name">ChatGPT</p>
            <p class="version-description">
                Great for everyday tasks
            </p>
        </div>
        <div class="tick-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 14L8.5 17.5L19 6.5" />
            </svg>
        </div>
      </div>
    </div>
</div>


<div class="chat-container js-chat-container">
    <div class="chats-area js-chats-area">
        <div class="chats-content js-chat-content"> 
        </div>
    </div>
</div>

<div class="chat-input-section">
    <p class="new-chat-note">What are you working on?</p>

    <div class="input-container-box">
        <div class="input-container js-input-container">
            <div class="prompt-input js-prompt-input-box" contenteditable="true">
                <p class="prompt-placeholder js-prompt"></p>
            </div>

            <div class="white-shadow"></div>

            <div class="upload-file-button js-show-button-tip
            js-upload-file-button js-upload-file" 
            data-tooltip="Upload files and more">
                    ${inputSectionIcons.add}
            </div>

            <div class="input-right-section">
                <div class="voice-button js-show-button-tip" data-tooltip="Dicatate">
                    ${inputSectionIcons.mike}
                </div>
                <div class="multi-purpose-button-container">
                    <div class="voice-mode-button js-voice-mode-button js-show-button-tip showButton" data-tooltip="Use voice mode">
                        ${inputSectionIcons.voiceMode}
                    </div>

                    <div class="send-button js-send-button">
                        ${inputSectionIcons.sendArrow}
                    </div>

                    <div class="stop-button js-stop-button js-show-button-tip" 
                    data-tooltip="Stop">
                        ${inputSectionIcons.pause}
                    </div>

                </div>
            
            </div>

            
                
        </div>

          <!-- floating elements -->

        <!-- upload and research cards -->
        <div class="files-research-card js-files-research-card">
            <div class="card-content">
                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.clip}
                    </div>
                    <p class="button-label">Add photos & files</p>
                </div>
                <hr class="seperation-line">

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.pictures}
                    </div>
                    <p class="button-label">Create image</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.bulb}
                    </div>
                    <p class="button-label">Thinking</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.telescope}
                    </div>
                    <p class="button-label">Deep research</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.bag}
                    </div>
                    <p class="button-label">Shopping research</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.book}
                    </div>
                    <p class="button-label">Studies and learn</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.globe}
                    </div>
                    <p class="button-label">Web search</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.pen}
                        
                    </div>
                    <p class="button-label">Canvas</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.peopleConnect}
                    </div>
                    <p class="button-label">Company knowledge</p>
                </div>

            </div>

        </div>

        <div class="files-research-card truncated-research-card js-truncated-research-card">
            <div class="card-content">
                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.clip}
                    </div>
                    <p class="button-label">Add photos & files</p>
                </div>
                <hr class="seperation-line">

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.pictures}
                    </div>
                    <p class="button-label">Create image</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.bulb}
                        </svg>
                    </div>
                    <p class="button-label">Thinking</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.telescope}
                    </div>
                    <p class="button-label">Deep research</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.bag}
                    </div>
                    <p class="button-label">Shopping research</p>
                </div>

                <div class="card-button more-research-button js-more-research-button">
                    <div class="icon-container">
                        ${uploadCardIcons.more}
                    </div>
                    <p class="button-label">More</p>
                    <div class="icon-container open-arrow-icon">
                        ${uploadCardIcons.rightArrow}
                    </div>
                </div>

            </div>

        </div>

        <div class="files-research-card more-research-options-card js-more-research-options-card">
            <div class="card-content">
                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.book}
                    </div>
                    <p class="button-label">Studies and learn</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.globe}
                    </div>
                    <p class="button-label">Web search</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.pen}
                        
                    </div>
                    <p class="button-label">Canvas</p>
                </div>

                <div class="card-button">
                    <div class="icon-container">
                        ${uploadCardIcons.peopleConnect}
                    </div>
                    <p class="button-label">Company knowledge</p>
                </div>
            </div>
        </div>

    </div>
    
    <p class="footer-note">ChatGPT can make mistakes. Please check important info. See <span class="cookies-link">Cookie Preferences</span>.</p>
</div>
  `;

  chatSection.innerHTML = chatPageHTML;

  const newChatButton = document.querySelector('.js-new-chat-button');

  renderChat(chat);
  makeInputIterative();
  sendMessage(chat);
  showUploadResearchCard();
  showButtonToolTips();
  makeFreeButtonActive();
  showPricingPage();
  showVersionCard();
  upgradeButtonActive();
}



export function createNewId() {
  const tempId = (Math.floor((Math.random().toFixed(16)) * Math.pow(10, 16))) + '';

  //console.log(tempId);

  let newId;

  if(chats.length > 0) {
    for(let i=0 ; i < chats.length ; i++) {
      if(chats[i].chatId !== tempId) {
        newId = tempId;
        return newId;
      }
    }

    if(!newId){
      createNewId();
    }

  } else {
    newId = tempId;
    return newId;
  }

}

function openNewChat() {
  const newChatButton = document.querySelector('.js-new-chat-button');

  newChatButton.addEventListener('click', () => {
    newChatButton.classList.add('open-new-chat');

    const chatButtons = document.querySelectorAll('.js-show-chat-button');
    chatButtons.forEach((button) => {
      button.classList.remove('showing-chat');
    });

    renderChatSection();
    renderChat();
    newChat();
  });
}



export function createNewChat(title = 'New chat') {
  const newId = createNewId();
  chats.unshift({
    chatId : newId,
    title ,
    chat : []
  });

  //console.log(chats);
  //remove the selected chat state

  saveChatsToStorage();
  renderChatsHistory();

  return chats[0].chat;

}


export function sendMessage(chat = []) {
  const sendButton = document.querySelector('.js-send-button');
  const stopButton = document.querySelector('.js-send-button');
  const voiceModeButton = document.querySelector('.js-voice-mode-button');

  sendButton.addEventListener('click', () => {
    //const chatPage = document.querySelector('.js-chat-section');
    //chatPage.classList.remove('new-chat');
    const message= document.querySelector('.js-prompt-input-box').innerText;
    if(!message) return;
    //console.log(chat.length);
    //creating new chat

    if(chat.length === 0 || !chat) {
      chat = createNewChat(message);
    }

    const newChatButton = document.querySelector('.js-new-chat-button');
    newChatButton.classList.remove('open-new-chat');

    //console.log(currentChat);

    const newId = createNewId();
    const response = getResponse(newId);

    chat.push({
      id : newId,
      query : message,
      response
    });

    voiceModeButton.classList.add('showButton');
    sendButton.classList.remove('showButton');

    saveChatsToStorage();
    removeNewChat();
    renderChat(chat);

    const chatsArea = document.querySelector('.js-chats-area');
    //chatsArea.scrollTop = chatsArea.scrollHeight;
    chatsArea.scrollTo({
      top : chatsArea.scrollHeight,
      behavior : "smooth"
    });

    setDefaultInputBox();
    //console.log(chat);
    
  });

  sendOnEnter(sendButton);
}


function sendOnEnter(button) {
  
  if(keydownController) {
    keydownController.abort();
  }

  keydownController = new AbortController();

  document.addEventListener('keydown', (event) => {
    //console.log('event signal');
    if(event.target.classList.contains('js-prompt-input-box') && event.key === 'Enter') {
      event.preventDefault();
      button.click();
    }
  }, {
    signal : keydownController.signal // signal is used to control event listeners are not removed/updated, they stay once created, hence using sigal we should manaully erase previous listeners
  });
}


function makeFreeButtonActive() {
  const freeOfferButton = document.querySelector('.js-free-offer-button');

  freeOfferButton.addEventListener('click', () => {
    window.location.href = '#pricing';
  });

}

function showPricingPage() {

  function getHash(){
    return window.location.hash.slice(1);
  }

  window.addEventListener('hashchange', () => {
    const pricingPage = document.querySelector('.js-pricing-section');
    const homePage = document.querySelector('.js-home-section');
    const hashtag = getHash();
    
    if(hashtag === 'pricing') {
      homePage.style.display = 'none';
      pricingPage.style.display = 'flex';
    } else {
      homePage.style.display = 'flex';
      pricingPage.style.display = 'none';
    }
  });

}




export function newChat(){
  const chatPage = document.querySelector('.js-chat-section');
  chatPage.classList.add('new-chat');
}

export function removeNewChat() {
  const chatPage = document.querySelector('.js-chat-section');
  chatPage.classList.remove('new-chat');
}

function setDefaultInputBox() {
  document.querySelector('.js-prompt-input-box').innerText = '';

  const box = document.querySelector('.js-input-container');
  box.classList.remove('multiline-input');
}


 export function showMoreResponseActions() {
    
    const buttonTipElement = document.querySelector('.js-button-tool-tip');

    const moreButtons = document.querySelectorAll('.js-more-response-actions');

    moreButtons.forEach((moreButton) => {
        moreButton.addEventListener('click', () => {
            
            const rect = moreButton.getBoundingClientRect();
            //console.log(rect.top);
            const convoId = moreButton.dataset.convoId;
            //console.log(convoId);
            const responseActionsCard = document.querySelector(`.js-more-response-actions-card-${convoId}`);


            if(!responseActionsCard.classList.contains('isOpened')) {
                responseActionsCard.style.display = 'flex';
                if(rect.top < 170) {
                    responseActionsCard.style.top = 28 + 'px';
                    responseActionsCard.style.bottom = 'auto';
                } else {
                    responseActionsCard.style.top = 'auto';
                    responseActionsCard.style.bottom = 28 + 'px';
                }
                responseActionsCard.classList.add('isOpened');
                buttonTipElement.style.display = 'none';

            } else {
                responseActionsCard.style.display = 'none';
                responseActionsCard.classList.remove('isOpened');
            }


            document.addEventListener('click', (event) => {
                if(!event.target.classList.contains('js-more-actions')){
                    responseActionsCard.style.display = 'none';
                    responseActionsCard.classList.remove('isOpened');
                }
            });
            
        });


        

    });

    
}


function showChatActionCard () {
    const moreButton = document.querySelector('.js-more-chat-actions-button');
    const chatActionCard = document.querySelector('.js-more-chat-actions-card');

    moreButton.addEventListener('click', () => {
        const rect = moreButton.getBoundingClientRect();

        if(!chatActionCard.classList.contains('isOpened')) {
            chatActionCard.style.right = 14 + 'px';
            chatActionCard.style.top = rect.bottom + 'px';
            chatActionCard.style.display = 'flex';
            chatActionCard.classList.add('isOpened');
        } else {
            chatActionCard.style.display = 'none';
            chatActionCard.classList.remove('isOpened');
        }
    });

    document.addEventListener('click', (event) => {
        if(!event.target.classList.contains('more-chat-actions')) {
            chatActionCard.style.display = 'none';
            chatActionCard.classList.remove('isOpened');
        }
        
    });
}

//showChatActionCard();


function showFreeOffer() {
    const offerButton = document.querySelector('.js-free-offer-button');
    const chatSection = document.querySelector('.js-chat-section');

    if(chatSection.offsetWidth < 600) {
        offerButton.style.display = 'none';
    } else {
        offerButton.style.display = 'flex';
    }
}

//showFreeOffer();




function makeInputIterative() {
    const box = document.querySelector('.js-input-container');
    const prompt = document.querySelector('.js-prompt');
    const promptInputBox = document.querySelector('.js-prompt-input-box');

    const sendButton = document.querySelector('.js-send-button');
    const stopButton = document.querySelector('.js-send-button');
    const voiceModeButton = document.querySelector('.js-voice-mode-button');

    document.addEventListener('keydown', (event) => {
        const inputWidth = promptInputBox.offsetWidth;
        
        if(event.target.classList.contains('js-prompt-input-box')) {
          if((event.key === 'Enter' && event.shiftKey) || (prompt.offsetWidth > (inputWidth -20))) {
              //box.style.height = prompt.offsetHeight +
              box.classList.add('multiline-input');
          }
        }
    });

    document.addEventListener('keyup', (event)=> {
        //console.log(event.key);
        const message= document.querySelector('.js-prompt-input-box').innerText.trim();
        //console.log(message);
        //console.log(message.length)
        if(message.length > 0) { 
          voiceModeButton.classList.remove('showButton');
          sendButton.classList.add('showButton');
        } else {
          voiceModeButton.classList.add('showButton');
          sendButton.classList.remove('showButton');
          //console.log('do not exist');
        }
    });

}


function showUploadResearchCard () {

    function setCardsHeight(){
        if(window.innerHeight < 390) {
            truncCard.style.height = window.innerHeight - 150 + 'px';
        } else {
            truncCard.style.height = 'auto';
        }

        if(window.innerHeight < 500) {
            fullCard.style.height = window.innerHeight - 150 + 'px';
        } else {
            fullCard.style.height = 'auto';
        }
    }

    const fullCard = document.querySelector('.js-files-research-card');
    const truncCard = document.querySelector('.js-truncated-research-card');
    const moreResearchCard = document.querySelector('.js-more-research-options-card');
    const chatSection = document.querySelector('.js-chat-section');

    const addButton = document.querySelector('.js-upload-file-button');

    addButton.addEventListener('click', () => {
        
        setCardsHeight();

        const width = chatSection.offsetWidth;
        const rect = addButton.getBoundingClientRect();
        if(width <= 600) {
            fullCard.classList.add('isOpened');
            fullCard.style.display = 'flex';
            fullCard.style.left = 2 + "px";
            fullCard.style.bottom = 50 + 'px';
            
        } else {
            truncCard.classList.add('isOpened');
            truncCard.style.display = 'flex';
            truncCard.style.left = 2 + "px";
            truncCard.style.bottom = 50 + 'px';
        }
    });

    document.addEventListener('click', (event) => {
        if(!event.target.classList.contains('js-upload-file')){
            fullCard.style.display = 'none';
            fullCard.classList.remove('isOpened');

            truncCard.style.display = 'none';
            truncCard.classList.remove('isOpened');

            moreResearchCard.style.display = 'none';
            moreResearchCard.classList.remove('isOpened');
        }
    });


    const moreButton = document.querySelector('.js-more-research-button');

    moreButton.addEventListener('mouseover', () => {
        moreButton.style.backgroundColor = 'rgb(247, 245, 245)';
        moreResearchCard.style.display = 'flex';
        moreResearchCard.style.left = 227 + 'px';
        moreResearchCard.style.bottom = 50 + 'px';

        //console.log(window.innerHeight);
    } );

    moreButton.addEventListener('mouseout', () => {
        moreResearchCard.style.display = 'none';
        moreResearchCard.classList.remove('isOpened');
        moreButton.style.backgroundColor = 'transparent';
    })

    moreResearchCard.addEventListener('mouseover', () => {
        moreResearchCard.style.display = 'flex';
        moreButton.style.backgroundColor = '#FBFBFB';
    });

    moreResearchCard.addEventListener('mouseout', () => {
        moreResearchCard.style.display = 'none';
        moreButton.style.backgroundColor = 'transparent';
    });


    window.addEventListener('resize', () => {
        
        setCardsHeight();

        if(window.innerWidth < 600 && truncCard.classList.contains('isOpened')) {
            truncCard.style.display = 'none';
            truncCard.classList.remove('isOpened');

            fullCard.style.display = 'flex';
            fullCard.classList.add('isOpened');
        }

        if(window.innerWidth >= 600 && fullCard.classList.contains('isOpened')) {
            fullCard.style.display = 'none';
            fullCard.classList.remove('isOpened');

            truncCard.style.display = 'flex';
            truncCard.classList.add('isOpened');
        }
    });

}

function showButtonToolTips () {
    const buttonTipElement = document.querySelector('.js-button-tool-tip');
    
    document.querySelectorAll('.js-show-button-tip')
        .forEach((button) => {
            button.addEventListener('mouseover', () => {
                const rect = button.getBoundingClientRect();
                //console.log(button.classList);
                const toolTip = button.dataset.tooltip;
                buttonTipElement.innerText = toolTip;
                buttonTipElement.style.display = 'flex';
                const tipWidth = buttonTipElement.offsetWidth;

                const buttonWidth = rect.width;
                const subtract = Math.abs((tipWidth-buttonWidth)/2);
                const rightSpace = window.innerWidth - rect.right;

                buttonTipElement.style.top = rect.bottom + 8 + 'px';

                if(rightSpace > subtract) {
                    buttonTipElement.style.right = 'auto';
                    buttonTipElement.style.left = Math.max((rect.left - subtract), 20) + 'px';

                } else {
                    //buttonTipElement.style.left = rect.left - subtract + 'px';
                    buttonTipElement.style.left = 'auto';
                    buttonTipElement.style.right = 20 + 'px';
                }
            });

            button.addEventListener('mouseleave', () => {
                buttonTipElement.style.display = 'none';
            });

            button.addEventListener('mouseout', () => {
                buttonTipElement.style.display = 'none';
            });
            
        });
}



function showVersionCard() {
    const versionCard = document.querySelector('.js-show-version-card');
    const versionButton = document.querySelector('.js-select-version-button');
    

    versionButton.addEventListener('click', () => {
        let rect = versionButton.getBoundingClientRect();
        if(!versionCard.classList.contains('isOpened')) {
            versionCard.style.left = 10 + 'px';
            versionCard.style.top = rect.bottom + 'px';
            versionCard.style.display = 'flex';
            versionCard.classList.add('isOpened');
        } else {
            versionCard.style.display = "none";
            versionCard.classList.remove('isOpened');
        }
    });

    document.addEventListener('click', (event) => {
        if(!event.target.classList.contains('js-select-version-button')){
            versionCard.style.display = "none";
            versionCard.classList.remove('isOpened');
        }
    });
}

//showVersionCard();


function upgradeButtonActive() {
  const upgradeButtons = document.querySelectorAll('.js-upgrade-button');

  upgradeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = '#pricing';
    });
  });

}



