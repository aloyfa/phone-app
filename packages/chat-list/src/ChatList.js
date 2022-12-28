import { html, css, LitElement } from 'lit';

export class ChatList extends LitElement {
  

  static get properties() {
    return {
      contacts: { type: Array },
      page: {type:String},
      contact:{ type:Object },
      filteredContacts: {type: Array},
      res: {type: String},
    };
  }

  constructor() {
    super();
    this.contacts = [];
    this.contact = {};
    this.filteredContacts = [];
    this.res = '';
    }

  onContactSelect(contact,) {
    this.dispatchEvent(new CustomEvent('contact-selected', {
      detail: contact,
    }));
  }

  onFilter(event) {
    const res = event.currentTarget.value;
    this.res = res;
    this.filteredContacts = this.contacts.filter(item => item.name.toLowerCase().trim().includes(res.toLowerCase().trim()));
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.filteredContacts = [...this.contacts];
  }

  gotoList() {
    this.dispatchEvent(new CustomEvent('goto-list', {
      detail: 'list'
    }));
  
  }
  
    
  render() {
    return html`
      <div class="app-container">
        <input type="text" placeholder="🔍︎ Search for a contact" @input="${this.onFilter}"></input>
        ${this.filteredContacts.map(contact => html`
          <div 
              class="contact" 
              @click="${() => {this.onContactSelect(contact)}}"
            >
                <img class='avatar' src="${contact.avatar}" alt="${contact.name}">
            <div class="content">
              <h2>${contact.name}</h2>
              <p>${contact.lastMessage.text}</p>
            </div>
            <div class="detail">
              <p>${contact.lastMessage.time}</p>
              <p id='noti-number'>${contact.messages.filter(message => !message.seen).length}</p>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  static get styles() {
    return css`
      .mobile{
        margin-top:20px;
        width:400px;
        height:800px;
        border: 15px solid black;
        border-radius: 70px;
        background-image: url('./assets/images/iPhone-14-purple-pink-blue-gradient-wallpaper-by-AR72014.png')
      }
      .mobile .island{
        position: absolute;
        background-color: black;
        width:120px;
        height:35px;
        transform: translateX(140px) translateY(20px);
        border-radius: 20px
      }
      .app-container {
        width: 400px;
        height: 700px;
        transform: translateY(80px);

      }

      .container .header {
        display: flex;
        justify-content: space-between;
      }

      .container .header .right {
        display: flex;
        justify-content: space-around;
      }

      .container .screen {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      input{
        height:40px;
        margin:5px 10px 0px 20px;
        width: 350px;
        border-radius: 15px;
        border-style: none;
        background-color:rgb(0, 0, 0, 0.25);
        font-size:20px;

      }
      ::placeholder{
        color:white;
      }
      input[type="text" i] {
        text-align:center;
        font-size:20px;
        color:white;
      }
      button {
        border-radius:10px;
        margin: 5px
      }

      .avatar{

        width: 50px;
        height: 50px;
        margin:15px;
        border-radius:50%
      }
      .contact {
        display: flex;
        width: 100%;
        border-bottom:1px solid black;
        height:150px;
        text-align:left;

      }
      .detail{
        margin-left: auto; 
        margin-right: 5px;
      }

      #noti-number{
        background-color: #0E86D4;
        border-radius: 50%;
        text-align:center;
        height:30px;
        width:30px;
        color:white;
        line-height:30px;
      }
      
    `;
  }
}

