import { html, css, LitElement } from 'lit';

import '@polymer/iron-icons/device-icons';
import '@polymer/iron-icons/av-icons';
import '@polymer/iron-icons/social-icons';
import '@polymer/iron-icons/communication-icons';

import '@polymer/iron-icon';

export class PhoneComponent extends LitElement {
  
  static get properties() {
    return {
      time: { 
        type: String
      },
      isCharging:{
        type: Boolean
      },
      cutWifi:{
        type: Boolean
      },
      cutCellular:{
        type: Boolean
      },
      applications:{
        type: Array
      },
      notification:{
        type: Boolean
      },
      filteredApps: {
        type: Array
      },
      res: {
        type: String
      },

    };
  }

  constructor() {
    super();
    this.time = '';
    this.isCharging = false;
    this.cutWifi = false;
    this.applications = [];
    this.cutCellular = false;
    this.filteredApps = []
    this.res = ''
  }

  onAppClick(event) {
    const appInfo = event.currentTarget.noti;

    const e = new CustomEvent("app-selected", {
      detail: appInfo,
    });
    this.dispatchEvent(e);

  }
 
  onFilter(event) {
    const res = event.currentTarget.value;
    this.res = res;
    this.filteredApps = this.applications.filter(
      app => app.name.toLowerCase().trim().includes(res.toLowerCase().trim())
    );
  
  }
  
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.filteredApps = [...this.applications];
  }

  render() {
    return html`
      <div class='mobile'>
        <div class='island'>
          <div class='left'>
            <p>${this.time}
            </p>
          </div>
          <div class='right'>
          <p><iron-icon icon="device:signal-wifi-3-bar"></iron-icon></p>
          <p><iron-icon icon="device:signal-cellular-3-bar"></iron-icon></p>
          <p><iron-icon icon="device:battery-30"></iron-icon></p>
        </div>
        <div class="searchbar-container">
          <input type="text" placeholder="🔍︎ Search" @input="${this.onFilter}" >
        </div>
        <div class='app_container'>
          ${this.filteredApps.map(
            (application) => html`
            
              <div class="app"
              .noti=${application}
              @click=${this.onAppClick}>
                ${application.notification !== 0
                  ? html`
                      <div class="badge">${application.notification}</div>
                    `
                  : ""}
                  <div class='app-icon'>
                    <img src=${application.icon} />
                  </div>
                <div class="name">
                  <p>${application.name}</p>
                </div>
              </div>
            `)}
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
      .mobile .island{
        position: absolute;
        background-color: black;
        width:120px;
        height:35px;
        transform: translateX(140px) translateY(20px);
        border-radius: 20px
      }
      .mobile .left{
        width: 100px;
        transform: translateX(-120px) translateY(-20px);
        font-weight: bolder;
        font-size: 25px;
        color: white;
      }

      .mobile .right{
        width: 100px;
        transform: translateX(140px) translateY(-90px);
        height:35px;
        display:flex;
        justify-content: space-around;
        color:white;
      }
      .button-line{
        width: 400px;
        padding: 10px;
        text-align:center;
      }
      .clearfix {
        overflow: auto;
      }
      .searchbar-container{
        width:400px;
        height:40px;
        transform: translateX(-140px) translateY(-50px);
        align-content: flex-start;
        display:flex;
        align-items:flex-start;
        flex-flow :row wrap;
        float:left
      }

      .filter-list-container{
        width:400px;
        height:700px;
        transform: translateX(-140px) translateY(-25px);
        align-content: flex-start;
        display:flex;
        align-items:flex-start;
        flex-flow :row wrap;
        float:left
      }
      .app_container{
        width:400px;
        height:700px;
        transform: translateX(-140px) translateY(-25px);
        align-content: flex-start;
        display:flex;
        align-items:flex-start;
        flex-flow :row wrap;
        float:left
      }
      .app{
        display:flex;
        flex-direction:column;
        align-items:center;
        
      }
      .app img{
        width:80px;
        height:80px;
        padding:10px
      }
      .app .name{
        display:block;
        width:80px;
        color:white;
        text-align:center;
        font-size:18px;
        padding-top:-20px;
        
      }
      input{
        width:90%;
        margin:0px 10px 20px 17px;
        height:40px;
        border-radius:20px;
        background-color:rgb(255, 255, 255, 0.25);
        border:none;
        color:white;
      }
      input[type="text" i] {
        text-align:center;
        font-size:18px;
      }
      ::placeholder{
        color:white;
        text-align:center;
        font-size:18px;
      }
      .app .badge{
        background-color: red ;
        color:white;
        width:20px;
        height:20px;
        border-radius:50%;
        position:absolute;
        text-align:center;
        padding:4px;
        transform: translateX(28px);
        font-size:16px
      }
      
      button {
        background-color: white;
        border: black 2px solid;
        border-radius: 12px;
        padding:10px;
      }
      button:active{
         box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
          transform: translateY(4px);
      }
    `;
  }
}
