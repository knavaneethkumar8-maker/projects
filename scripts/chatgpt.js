import { renderChat, showMoreResponseActions, sendMessage , renderChatPage, renderChatSection} from "./chatSection/chatPage.js";
import { renderSidebar } from "./sideBarSection/sideBar.js";
import {renderChatsSection } from "./sideBarSection/yourChats.js";
import { renderPricingPage } from "./pricing.js";


//import './sideBarSection/sideBar.js';
//import './sideBarSection/yourChats.js';
//import './chatSection/chatPage.js';


//import { chat } from "../data/chat.js";


//showMoreResponseActions();
renderSidebar();
renderChatsSection();
renderChatPage();
renderPricingPage();




function showSidebarToolTip() {

    const toolTipElement = document.querySelector('.js-sidebar-tool-tip');

    document.querySelectorAll('.js-sidebar-button').forEach((button) => {

        button.addEventListener('mouseover', () => {
            
            const rect = button.getBoundingClientRect();
            //console.log('sidebar button');

            if(rect.left > 50){
                const remove = (103 - rect.width) / 2;
                toolTipElement.style.left = rect.left - remove + 'px';
                toolTipElement.style.top = rect.top + 40 + 'px';

            } else {
                const add = (rect.height - 26) / 2;
                toolTipElement.innerText = 'Open sidebar';
                toolTipElement.style.left = rect.right + 15 + 'px';
                toolTipElement.style.top = rect.top + add + 'px';
            }

            toolTipElement.style.display = 'flex';
        });

    });


    document.querySelectorAll('.js-sidebar-button').forEach((button) => {
        button.addEventListener('mouseleave', () => {
            
            toolTipElement.style.display = 'none';

            toolTipElement.innerHTML = 'Close sidebar';

        });
    })
        
}

showSidebarToolTip();



function showMenuToolTips() {
    const sidebarElem = document.querySelector('.js-sidebar-container');
    const isClosed = sidebarElem.classList.contains('mini-sidebar');

    const toolTipElement = document.querySelector('.js-menu-tool-tip');
    

    document.querySelectorAll('.js-show-tool-tip')
        .forEach((option) => {
            option.addEventListener('mouseover', () => {
                const rect = option.getBoundingClientRect();

                toolTipElement.style.left = rect.right + 12 + 'px';
                toolTipElement.style.top = rect.top + (rect.height -26)/2 + 'px';

                toolTipElement.innerText = option.dataset.tooltip;

                if(isClosed) {
                    toolTipElement.style.display = 'flex';
                } else {
                    toolTipElement.style.display = 'none';
                }
                
            });
            
            option.addEventListener('mouseleave', () => {
                toolTipElement.style.display = 'none';
            });
        });

}

showMenuToolTips();


function closeSidebar() {

    document.querySelectorAll('.js-sidebar-button').forEach((button) => {
        button.addEventListener('click', () => {
            const sidebarElem = document.querySelector('.js-sidebar-container');

            if(sidebarElem.classList.contains('mini-sidebar')){
                sidebarElem.classList.remove('mini-sidebar');
                showMenuToolTips();
            } else {
                sidebarElem.classList.add('mini-sidebar');
                showMenuToolTips();
            }
        });

    });

}

closeSidebar();




function showButtonToolTips () {
    const buttonTipElement = document.querySelector('.js-button-tool-tip');
    
    document.querySelectorAll('.js-show-button-tip')
        .forEach((button) => {
            button.addEventListener('mouseover', () => {
                const rect = button.getBoundingClientRect();
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

showButtonToolTips();









