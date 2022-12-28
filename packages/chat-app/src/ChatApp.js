import { LitElement, html, css } from 'lit';

import '@messenger/chat-box';
import '@messenger/chat-list';


export class ChatApp extends LitElement {
  static get properties() {
    return {
      contacts: {
        type: Array
      },
      contactSelected: {
        type: Object
      },
      page: {
        type:String
      },

    };
  }

  constructor() {
    super();
    this.contacts = [
      {
        name: 'Erasmo Garcia',
        avatar: 'https://cdn-icons-png.flaticon.com/512/4128/4128176.png',
        lastMessage: {
          text: 'Te saluda Erasmo!',
          time: `${new Date().getHours()}:${new Date().getMinutes()}`
        },
        messages: [
          {
            seen: false,
            text: 'Hola !',
            owner: {
              name: 'Erasmo Garcia',
              avatar: 'https://cdn-icons-png.flaticon.com/512/4128/4128176.png'
            }
          },
          {
            seen: false,
            text: 'como estas',
            owner: {
              name: 'Erasmo Garcia',
              avatar: 'https://cdn-icons-png.flaticon.com/512/4128/4128176.png'
            }
          },
          {
            seen: false,
            text: 'te saluda Erasmo!',
            owner: {
              name: 'Erasmo Garcia',
              avatar: 'https://cdn-icons-png.flaticon.com/512/4128/4128176.png'
            }
          }
        ]
      },
      {
        name: 'Almudena Gómez',
        avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
        lastMessage: {
          text: 'Estoy por llegar por favor estar atento',
          time: `${new Date().getHours()}:${new Date().getMinutes()}`
        },
        messages: [
          {
            seen: false,
            text: 'Buenas Tardes!',
            owner: {
              name: 'Almudena Gómez',
              avatar: 'https://www.w3schools.com/howto/img_avatar2.png'
            }
          },
          {
            seen: false,
            text: 'Estoy por llegar por favor estar atento',
            owner: {
              name: 'Almudena Gómez',
              avatar: 'https://www.w3schools.com/howto/img_avatar2.png'
            }
          },
        ]
      },
      {
        name: 'Sebastián Caamaño',
        avatar: 'https://www.w3schools.com/w3images/avatar2.png',
        lastMessage: {
          text: 'Hola tío como vas?',
          time: `${new Date().getHours()}:${new Date().getMinutes()}`
        },
        messages: [
          {
            seen: false,
            text: 'Hola tío como vas?',
            owner: {
              name: 'Sebastián',
              avatar: 'https://www.w3schools.com/w3images/avatar2.png'
            }
          },
          
        ]
      },
      {
        name: 'Julio Ortega',
        avatar: 'https://www.w3schools.com/w3css/img_avatar3.png',
        lastMessage: {
          text: 'Ya conseguí las entradas para el partido!',
          time: `${new Date().getHours()}:${new Date().getMinutes()}`
        },
        messages: [
          {
            seen: false,
            text: 'Ya conseguí las entradas para el partido!',
            owner: {
              name: 'Julio Ortega',
              avatar: 'https://www.w3schools.com/w3css/img_avatar3.png'
            }
          }
        ]
      },

    ];
    this.contactSelected = {};
    this.contact= {};
    this.user = {
      name: 'Yo',
      avatar: 'https://randomuser.me/api/portraits/thumb/men/75.jpg'
    };
    this.messages = [
      {
        text: ''
      }
    ];
    this.page = 'list'

  }

  onContactSelected({detail: contact}) {
    this.contactSelected = contact;
    this.gotoBox()
  }
  onSentMessage({detail:newMessage}){
    this.contactSelected.messages.push(newMessage);
    this.contactSelected = {...this.contactSelected};
  }
  gotoBox(){
    this.page = 'box'
  }
  firstupdated() {
    this.onContactSelected()
  }
  gotoList(){
    this.page = 'list'
  }

// - - - - - RENDER HTML - - - - -

  render() {
    return html`
    <div class='mobile'>
      <div class='island'></div>
      ${this.page === 'list' ? html`  
          <chat-list 
            .contacts="${this.contacts}" 
            @contact-selected="${this.onContactSelected}">
          </chat-list>
        `: ''}
        
        ${this.page === 'box' ? html`
          <chat-box
          .contact="${this.contactSelected}"
          @message-sent='${this.onSentMessage}'
          @goto-list='${this.gotoList}'>
        </chat-box>
      `:''}
    </div>
    `;
  }

  //  - - - - - CSS STYLES BEGIN - - - - -

  static get styles() {
    return css`
       .container {
        display: flex;
        width: 100%;
        
        
      }

      .mobile{
        margin-top:20px;
        width:400px;
        height:800px;
        border: 15px solid black;
        border-radius: 70px;
        background-image: url('https://i.redd.it/qwd83nc4xxf41.jpg');
      }
      .island{
        position: absolute;
        background-color: black;
        width:120px;
        height:35px;
        transform: translateX(140px) translateY(20px);
        border-radius: 20px
      }
      .sidebar {
        border: 1px solid black;
        width: 30%;
        
      }

      .body {
        border: 1px solid black;
        width: 70%;
        background-image: url('https://preview.redd.it/qwd83nc4xxf41.jpg?auto=webp&s=172adf428061ec1b71c0d43b7ba870f85d46a816');
        position: relative;
        height:700px
      }
      .app-header{
        display:flex;
        height:80px;
        line-height:40px
      }
      .app-header img{
        width:auto;
        height:80%;
      }
      

    `;
  }
}
