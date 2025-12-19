import { sidebarIcons } from "../../data/icons.js";



export function renderSidebar() {

  const sideBarContainer = document.querySelector('.js-sidebar-container');

  let sideBarHTMl = `
  <div class="sidebar-content">
    <div class="sidebar-header">
        <div class="header-content">
            <a href="">
                <div class="chatgpt-logo-container">
                    ${sidebarIcons.chatGPTLogo}
                </div>
            </a>
            
            <div class="sidebar-icon-container js-sidebar-button">
                ${sidebarIcons.sidebar}
                
            </div>

            <div class="sidebar-icon-container js-sidebar-button open-sidebar-button">
                ${sidebarIcons.sidebar}
                
            </div>
        </div>
    </div>

    <div class="menu-important-options">
        <div class="menu-option js-menu-option js-show-tool-tip js-new-chat-button" 
        data-tooltip="New chat">
            <div class="option-icon-container">
                ${sidebarIcons.newChat}
            </div>
            <p class="icon-label">New chat</p>
        </div>

        <div class="menu-option js-menu-option js-show-tool-tip"
        data-tooltip="Search chats">
            <div class="option-icon-container">
                ${sidebarIcons.search}
            </div>
            <p class="icon-label">Search chats</p>
        </div>

        <div class="menu-option js-menu-option js-show-tool-tip"
        data-tooltip="Library">
            <div class="option-icon-container">
                ${sidebarIcons.pictures}
            </div>
            <p class="icon-label">Library</p>
        </div>
    </div>
    <div class="extra-options">
        <div class="menu-option js-menu-option js-show-tool-tip"
                data-tooltip="Atlas">
            <div class="option-icon-container">
                ${sidebarIcons.compass}
            </div>
            <p class="icon-label">Atlas</p>
        </div>

        <div class="menu-option js-menu-option js-show-tool-tip"
            data-tooltip="Projects">
            <div class="option-icon-container">
            ${sidebarIcons.folder}
                
            </div>
            <p class="icon-label">Projects</p>
        </div>
    </div>

    <div class="chats-history js-chats-history">
        <div class="chats-label-container js-your-chats-button">
            <p class="your-chats-label">Your chats</p>
            <div class="arrow-icon-container">
                <svg class="js-down-arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="arrow-icon-show">
                    <path d="M12.1338 5.94433C12.3919 5.77382 12.7434 5.80202 12.9707 6.02929C13.1979 6.25656 13.2261 6.60807 13.0556 6.8662L12.9707 6.9707L8.47067 11.4707C8.21097 11.7304 7.78896 11.7304 7.52926 11.4707L3.02926 6.9707L2.9443 6.8662C2.77379 6.60807 2.80199 6.25656 3.02926 6.02929C3.25653 5.80202 3.60804 5.77382 3.86617 5.94433L3.97067 6.02929L7.99996 10.0586L12.0293 6.02929L12.1338 5.94433Z">

                    </path>
                </svg>
                

                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-rtl-flip="" class="arrow-icon-hidden js-right-arrow">
                    <path d="M6.02925 3.02929C6.25652 2.80202 6.60803 2.77382 6.86616 2.94433L6.97065 3.02929L11.4707 7.52929C11.7304 7.78899 11.7304 8.211 11.4707 8.4707L6.97065 12.9707C6.71095 13.2304 6.28895 13.2304 6.02925 12.9707C5.76955 12.711 5.76955 12.289 6.02925 12.0293L10.0585 7.99999L6.02925 3.9707L5.94429 3.8662C5.77378 3.60807 5.80198 3.25656 6.02925 3.02929Z">
                    </path>
                </svg>
            </div>
        </div>

        <div class="chats-container js-chats-container">
        </div>
    </div>



    <div class="sidebar-footer">
        <div class="upgrade-icon-container js-show-tool-tip"
                data-tooltip="Upgrade">
            ${sidebarIcons.star}
        </div>

        <div class="footer-content js-show-tool-tip"
                data-tooltip="Navaneeth">
            <div class="account-section">
                <div class="account-left-section">
                    <div class="profile-pic-container">
                        <img src="" alt="">
                    </div> 
                </div>
                <div class="account-right-section">
                    <p class="user-name">Navaneeth</p>
                    <p class="plan-label">Free</p>
                </div>
            </div>
            <button class="upgrade-button js-upgrade-button">
                Upgrade
            </button>

        </div>
        
    </div>
</div>
  `;

  sideBarContainer.innerHTML = sideBarHTMl;
}