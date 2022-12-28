import { html, css, LitElement } from 'lit';

export class LockScreen extends LitElement {
  
  static get properties() {
    return {
      applications:{type: Array},
      song: {type: Object},
      page: {type: String}

    };
  }

  constructor() {
    super();
    this.time = '';
    this.date = '';
    this.carrier = '';
    this.applications = [];
    this.song = {};
    this.page = '';

  }
 
  onAppDelete(event) {
    const appDel = event.currentTarget.noti;

    const e = new CustomEvent("app-delete", {
      detail: appDel
    });
    this.dispatchEvent(e);
    this.requestUpdate()
  }
  stopAudio() {
    const audio = this.shadowRoot.querySelector('#audio');
    audio.pause();
  }

  showPlayer(){
    if(this.song !== {}){
      this.page = 'player'
    }
    this.requestUpdate
  }
  firstUpdated(){
    this.showPlayer()
  }
  


  render() {
    return html`
    
    <div class='mobile'>
      <div class='island'>
        <div class='left'>
          <p>${this.carrier}</p>
        </div>
        <div class='right'>
          <p><iron-icon icon="device:signal-wifi-3-bar"></iron-icon></p>
          <p><iron-icon icon="device:signal-cellular-3-bar"></iron-icon></p>
          <p><iron-icon icon="device:battery-30"></iron-icon></p>
        </div>
      </div>
      <div class='lock-container'>
        <div class='time-container'>
          <p>${this.time}</p>
        </div>
        <div class='date-container'>
          <p>${this.date}</p>
        </div>
        <div class='noti-container'>
            ${this.applications.map(
            (noti) => {return html`
            ${noti.notification !== 0 ? html`
          <div .noti=${noti} @click=${this.onAppDelete} class="noti">
            <div class='app-icon'>
              <img src=${noti.icon} />
            </div>
            <div class="app-name">
              <p>${noti.name}</p>
            </div>
            <button  class="delete" >x</button>
            <div class='app-time-ago'>
              <p>${noti.timeAgo}</p>
            </div>
            <div class="app-info">
              <p>${noti.info}</p>
            </div>
          </div>
` : ""}
  `})}
        </div>
      </div>
      
    </div>
  </div>
</div>

    `;
  }
  static get styles() {
    return css`
      
      :host{
        font-family:Arial, Helvetica, sans-serif;
      }
      
      .mobile{
        margin-top:20px;
        width:400px;
        height:800px;
        border: 15px solid black;
        border-radius: 70px;
        background-image: url('./assets/images/iPhone-14-purple-pink-blue-gradient-wallpaper-by-AR72014.png')
      }
      .island{
        position: absolute;
        background-color: black;
        width:120px;
        height:35px;
        transform: translateX(140px) translateY(20px);
        border-radius: 20px
      }
      .gallery-container{
        height:600px;
        width:400px;
        border: 1px solid black
      }


      .img-container img{
        height:30px;
        width:30px;
      }
      .delete {
        min-width: 25px;
        min-height: 25px;
        border-radius: 50%;
        position: absolute;
        font-size: 20px;
        background-color: rgba(255, 255, 255, 0.3);
        color: grey;
        border-style: none;
        transform: translateX(136px) translateY(0px);
      }
      .delete:hover{
        background-color: rgba(255, 255, 255, 0.70)
      }
      
      .mobile .left{
        width: 100px;
        transform: translateX(-120px) translateY(-10px);
        font-size: 20px;
        color: white;
      }
      
      .mobile .right{
        width: 100px;
        transform: translateX(140px) translateY(-74px);
        height:35px;
        display:flex;
        justify-content: space-around;
        color:white;
      }
      .button-line{
        margin:0;
        width: 400px;
        padding: 10px;
        text-align:center;
      }
      .clearfix {
        overflow: auto;
      }
      .lock-container{
        width:400px;
        height:700px;
        transform: translateY(90px);
      }
      .time-container p {
        font-size: 90px;
        color: white;
        margin-bottom: 0px;
        margin-top:0px;
      }
      .date-container p {
        color: white;
      }

      .player{
        display: flex;
        width: 95%;
        border-radius: 10px;
        height: 200px;
        margin: 10px 5px;
        transform: translateX(5px) translateY(170px);
        background-color: rgba(255, 255, 255, 0.3);
        flex-flow: column wrap;
        align-items: center;
        place-content: flex-start center;
        flex-direction: row;
        justify-content: space-evenly;
        align-content: center;
      }
      .no-show{
        display:none;
      }
      .player img{
        height: 120px;
        width: 120px;
      }
      .stop-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 50px;
        background-color: rgba(255, 255, 255, 0.3);
        color: grey;
        border-style: none;
        line-height:10px;
        padding-bottom:11px;
      }
      
      .noti{
        width: 400px;
        margin-left:20px;
        width: 95%;
        border-radius:10px;
        height: 100px;
        margin: 10px 5px 10px 5px;
        transform: translateX(5px);
        background-color: rgba(255, 255, 255, 0.30);
      }
      .noti .app-name{
        display:flex;
        width:80px;
        font-size:18px;
      }
      .noti .app-icon img{
        width:30px;
        height:30px;
        padding:10px;
        float: left;
      }
      .app-info {
        transform: translateX(10px) translateY(-50px);
        display:flex;
      }
      .app-info p {
        font-size: 14px;
      }
      .app-time-ago{
        display:flex;
        justify-content: right;
        margin-right:5px;
        width:70px;
        transform: translateX(270px) translateY(-50px)
      }
      .app-time-ago p {
        font-size:12px;
      }
    `;
  }
}
