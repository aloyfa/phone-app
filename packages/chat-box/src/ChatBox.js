import { html, css, LitElement } from 'lit';

export class ChatBox extends LitElement {
  

  static get properties() {
    return {
      contact: { type: Object },
      page: { type:String }
    };
    
  }

  constructor() {
    super();
    this.page = ''
    this.contact = {
      name: '',
      avatar: '',
      messages: []
    };
  }
  onSentMessage(){
    const sendMessage = this.shadowRoot.querySelector('#sendText')
    if(sendMessage.value === '') return;
    const newMessage = {
      seen: false,
      text:sendMessage.value,
      owner:{
        name: "You",
        avatar:'https://cdn-icons-png.flaticon.com/512/194/194828.png'
      }
    };
    this.dispatchEvent(new CustomEvent('message-sent',{detail:newMessage}))
    sendMessage.value = '';
  }

  gotoList() {
    this.dispatchEvent(
      new CustomEvent("goto-list", {
        detail: this.page,
      })
    );
  }
  

  render() {
    return html`
      <div class="app-container">
        <div class="header">
          <button class="back" @click='${this.gotoList}'><</button>
          <h1>${this.contact.name}</h1>
        </div>
        <div class="content">
          ${this.contact.messages.map(message => html`
          <div class="message ${message.owner.name === 'You' ? "owner" : ""}">
              <div class='message-header'>
                <p><strong>${message.owner.name}:</strong></p>
                <img class='avatar' src="${message.owner.avatar}" alt="${message.owner.name}">
              </div>
              <p>${message.text}</p>
            </div>
          `)}
        </div>
      </div>
      <div class="footer">
        <input type="text" label="Escribir mensaje" id='sendText' placeholder='escribir mensaje'>
        <button class='send' @click='${this.onSentMessage}'>Enviar</button>
      </div>
    `;
  }
  static get styles() {
    return css`
      .back{
        height:30px;
        width:30px;
        border-radius:50%;
      }
      .header{
        display:flex;
        align-items: center;
      }
      .header h3{
        padding-left:10px;
      }
      .app-container {
        width: 380px;
        height: 650px;
        transform: translateY(60px);
        padding:10px;
        
        overflow: auto;  
        overflow-x:hidden;
      }
      .avatar{
        width: 50px;
        height: 50px;
        margin:5px;
        border-radius:50%
      }
      .message{
        margin:10px;
        border-radius: 5px;
        width:250px;
        padding:5px;
        background-color:rgb(146, 255, 164, 0.40);
        text-align:left;
      }

      .message-header.avatar{
        width: 50px;
        height: 50px;
        margin:5px;
        border-radius: 50%;
      }
      .message.owner{
        background-color:rgb(0, 0, 0, 0.10);
        margin-left: 115px;
      }
      .message img{
        width:40px;
        height:40px;
        margin-left: auto; 
        margin-right: 5px;
        margin-top:5px;
        position: relative;
      }
      .message-header{
        display:flex;
      }
      .footer{
        display: flex;
        align-items: flex-end;
        bottom:20px;
        height:90px;
        width:402px;
        background-color: #626262;
        justify-content: space-between;
        transform: translateX(-1px) translateY(41px);
        border-radius:0px 0px 56px 56px;
        align-items: center
      }
      input {
        height:30px;
        border-radius:10px;
        background-color: #c4c4c4;
        border:none;
        margin-left:30px;
        width:200px
      }
      .send {
        width:100px;
        height:40px;
        background-color: #0aa359;
        color: white;
        border-style:none;
        border-radius: 8px
      }
      button {
        margin:15px;
      }
      button:hover{
        background-color: #06753f;
      }
      
    `;
  }
}


