import { html, css, LitElement } from 'lit';

export class GalleryComponent extends LitElement {
  

  static get properties() {
    return {
      url: { type: String },
      photoArray: { type: Array },
      page: {type: String}
    };
  }

  constructor() {
    super();
    this.photoArray = [];
    this.page = ''
  }
  
  firstUpdated(){
    this.__getPhotos()
  }

  
  async __getPhotos() {
    const response = await fetch('https://picsum.photos/v2/list?limit=20');
    const results  = await response.json();
    const data = await results;
    this.photoArray = [...data];
  
  }
  
  render() {
    return html`
      
      <div class='mobile'>
        <div class='island'></div>
        <div class='gallery-container'>
          ${this.photoArray.map( photo => html `
            <div class='img-container'>
              <img src="${photo.download_url}"/>
            </div>
          `)}
        </div>
      </div>
      
    `;
  }

  static get styles() {
    return css`
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

      }
      .gallery-container{
        height:700px;
        width:400px;
        transform: translateX(0) translateY(70px);
        display:flex;
        flex-flow :row wrap;
        float:left;
        padding:auto;
        justify-content: space-evenly;
        align-content: center;
        
      }
      .img-container{
        margin: 15px 0px;
        padding:10px
      }

      img{
        height:80px;
        width:80px;
        display:flex;
        flex-direction:column;
        align-items:center;
      }
      .mobile{
        margin-top:20px;
        width:400px;
        height:800px;
        border: 15px solid black;
        border-radius: 70px;
        
      }
      .mobile .island{
        position: absolute;
        background-color: black;
        width:120px;
        height:35px;
        transform: translateX(140px) translateY(20px);
        border-radius: 20px
      }
      .recent{
        border:2px #387bc2 solid;
        border-radius:10px;
        position: absolute;
        transform: translateX(-150px) translateY(50px);
        height:80px;
        width:80px;
        color: #387bc2;
        z-index:-1;
      }
    `;
  }
}



