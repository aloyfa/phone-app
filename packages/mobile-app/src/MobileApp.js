import { LitElement, html, css } from 'lit';

import '@minsait/lock-screen';
import '@minsait/phone-component';
import '@minsait/gallery-component';
import '@minsait/streaming-app';
import '@minsait/chat-app';
import '@minsait/music-component';


export class MobileApp extends LitElement {
  static get properties() {
    return {
      page: { type: String },
      noti: {type: Array},
      applications: {type: Array},
      song: { type: Object },
    };
  }

  constructor() {
    super();
    this.title = 'My app';
    this.applications = [
      {
        name: 'Messages',
        icon:'../assets/icons/ios-message-512x512-1575946.png',
        notification:7,
        info:'New Message',
        timeAgo:'2m ago'
      },
      {
        name: 'Streaming',
        icon:'../assets/icons/apple-tv-512x512-1575940.png',
        notification:0,
        info:'',
        timeAgo:''
      },
      {
        name: 'Music',
        icon:'../assets/icons/apple-music-512x512-2365226.png',
        notification:0,
        info:'',
        timeAgo:''
      },
      {
        name: 'Photos',
        icon:'../assets/icons/photos-512x512-2365244.png',
        notification:0,
        info:'',
        timeAgo:''
      },
      {
        name: 'Reminders',
        icon:'../assets/icons/reminders-512x512-2365242.png',
        notification:0,
        info:'',
        timeAgo:''
      },
      {
        name: 'Camera',
        icon:'../assets/icons/camera-512x512-2365232.png',
        notification:0,
        info:'',
        timeAgo:'',
        isPhotoApp:true
      },
      {
        name: 'Calculator',
        icon:'../assets/icons/calculator-512x512-1575939.png',
        notification:0,
        info:'',
        timeAgo:''
      },
      {
        name: 'Facetime',
        icon:'../assets/icons/facetime-512x512-1575950.png',
        notification: 0,
        info:'2 missed calls',
        description:'',
        timeAgo:''

      },
      {
        name: 'Files',
        icon:'../assets/icons/files-512x512-2365229.png',
        notification:0,
        info:'',
        timeAgo:''
      },
      {
        name: 'Clock',
        icon:'../assets/icons/clock-512x512-2365231.png',
        notification:0,
        info:'',
        timeAgo:''
      },
      {
        name: 'Find my',
        icon:'../assets/icons/find-my-512x512-1575949.png',
        notification:0,
        info:'',
        timeAgo:''
      },
      {
        name: 'News',
        icon:'../assets/icons/news-512x512-2365224.png',
        notification:0,
        info:'',
        timeAgo:''
      },
      
    ];
    this.page = "lock"
    this.time =  `${new Date().getHours()}:${new Date().getMinutes()}`
    this.carrier = 'Vodafone'
    this.date = "Wednesday, October 26";
    this.song = {}
      
  };

  gotoHome() {
    this.page = 'home'
  }
  gotoLock(){
    this.page = 'lock'
  }
  gotoMusic(){
    this.page = 'music'
  }
  gotoStreaming(){
    this.page = 'streaming'
  }
  gotoPhotos(){
    this.page = 'photos'
  }

  onAppSelected = (event) => {

    const appSelected = event.detail

    if(appSelected.name =='Streaming'){
      this.page = 'streaming'
    }
    if(appSelected.name =='Photos'){
      this.page = 'gallery'
    }
    if(appSelected.name =='Music'){
    this.page = 'music'
    }
    if(appSelected.name =='Messages'){
      this.page = 'messages'
    }
    this.applications.map((app) => {
      
      if(app.notification === appSelected.notification){
        app.notification = 0
       }
    });
  }
  deleteNotification = (event) =>{
    this.applications.map((app) => {
      if(app.notification === app.notification){
        app.notification = 0
       }
    });
  }
  playMusic = (track) => {
    const song = track.detail
    this.song = song
    
  }
  

  
  
  render() {
    return html`
      <div class="main1">
        <button class='lock-button' @click="${() => {
          this.gotoLock();
        }}">LOCK</button>
        </button>
        
        
        ${this.page === 'home' ? html`
          <phone-component
          @app-selected='${this.onAppSelected}'
            .time="${this.time}"
            .applications="${this.applications}"
            >
          </phone-component>
        `: ''} 
        
        ${this.page === 'lock' ? html`
        <lock-screen 
          .time='${this.time}'
          .carrier="${this.carrier}"
          .date="${this.date}"
          .applications="${this.applications}"
          @app-delete='${this.deleteNotification}'
          .song="${this.song}"
          >
        </lock-screen>
        `: ''}

        ${this.page === 'messages' ? html`
          <chat-app></chat-app> 
        `: ''}

        ${this.page === 'streaming' ? html`
          <streaming-app></streaming-app> 
        `: ''}

        ${this.page === 'music' ? html`
          <music-component
            @song-selected=${this.playMusic}
          ></music-component> 
        `: ''}
        
        ${this.page === 'gallery' ? html`
          <gallery-component
            @on-return='${this.gotoHome}'>
          </gallery-component> 
        `: ''}
        <button class='home-button' @click="${() => {this.gotoHome();}}">
          ▢
        </button>
      </div>
      <audio id='audio' src='${this.song.file}'autoplay hidden controls></audio>
      

    `;
    
  }



  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        color: #1a2b42;
        margin: 0 auto;
        text-align: center;
      }
      .stop-button{
        transform: translateX(-100px) translateY(0px);
        
      }
      .main1{
        position:absolute;
        transform: translateX(0px) translateY(-80px);
      }
      .home-button {
        background-color: black;
        border: grey 2px solid;
        border-radius: 50%;
        margin-top: 15px;
        font-size:30px;
        min-height:50px;
        min-width:50px;
        color:white;
      }
      button:active{
        box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
      }

      .lock-button {
        background-color: black;
        border: grey 2px solid;
        border-radius:20px;
        margin: 20px;
        min-height:35px;
        min-width:120px;
        color:white;
        transform:rotate(270deg) translateX(-221px) translateY(244px);

      }
    `;
  };
}
