import { html, css, LitElement } from 'lit';

export class StreamingMovie extends LitElement {
  

  static get properties() {
    return {
      page:{ type:String },
      movie: { type: Object },
    };
  }

  constructor() {
    super();
    this.page = '';
    this.title = 'movie component Works';
    this.movie = {};
    this.filmUrl = '';
  }
  gotoList() {
    this.dispatchEvent(
      new CustomEvent("goto-list", {
        detail: this.page,
      })
    );
  }

  gotoPlayer(){
    this.page = 'player'
  }

  firstUpdated() {
    const fragmentUrl = this.movie.preview.split("/")[3];
    const add = "?autoplay=1&controls=0&loop=1&disablekb=1&modestbranding=1&rel=0&showinfo=0&mute=0&enablejsapi=1&html5=1";
    this.filmUrl = `https://www.youtube.com/embed/${fragmentUrl}${add}`;
  }

  gotoMovie(){
    this.page = 'movie'
  }

  
  // - - - - - RENDER HTML BEGINS - - - - - 
 
 
  render() {
    return html`
      <div class='page-container'>
        <button
        class='back'
        @click='${this.gotoList}'
        ><</button>
        <img class='back-img' src='${this.movie.cover}'>
        <div class='text-container'>
          <h1>${this.movie.title}</h1>
          <p>${this.movie.description}</p>
        </div>
        <div class='button-container'>
          <button @click='${this.gotoPlayer}' class='movie play'>▶</button>
          
        </div>
      </div>
      ${this.page === 'player' ? html`
        <div class='player-container'>
        <button
          class='back player'
          @click='${this.gotoMovie}'
        ><</button>
        <iframe
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            autoplay="1"
            allowfullscreen
            encrypted-media
            allowscriptaccess="always"
            src=${this.filmUrl}
          >
          </iframe>
        </div>
      `: ''}
    `;
      
  }


  // - - - - - CSS STYLES BEGIN - - - - -


  static get styles() {
    return css`
      :host{
        color: white;
        text-shadow: 3px 3px 3px #000000;
      }
      .back{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: absolute;
        transform: translateX(-152px) translateY(-317px);
        font-size: 30px;
        background-color: rgba(255, 255, 255, 0.3);
        color: white;
        border-style: none;
      }
      .back:hover{
        background-color: rgba(255, 255, 255, 0.7)
      }
      .back.player{
        transform: translateX(0px) translateY(0px);

      }
      iframe{
        width: 400px;
        height: 700px;
        transform: translateY(50px)
      }
      .button-container{
        display:flex;
        position:absolute;
        width:400px;
        justify-content: space-around;
        transform: translateY(300px);
        align-items:initial;
      }
      .button-container button{
        width:60px;
        height:40px;
        font-size:30px

      }
      .text-container{
        position:absolute;
        width:400px;
        height:400px;
        
        color: white;
        text-shadow: 3px 3px 3px #000000;
        text-align: justify;
        text-justify: inter-word;
        padding: 20px
      }
      iframe{
        border-radius: 0px 0px 59px 59px;
      }
      .movie{
        border-style:none;
        background-color:#a4a4a4;
        color:white;
        border-radius: 10px;

      }
      
      .page-container{
        width: 400px;
        height: 700px;
        border: 1px solid black;
        background-color: black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .player-container{
        display: flex;
        width: 400px;
        height: 750px;
        transform: translateX(1px) translateY(-701px);
        border-radius: 0px 0px 59px 59px;
        position: absolute;
        background-color: black;
      }

      .back-img{
        width:400px;
        height:700px
      }
      .info-container{
        position: absolute;
        width:350px;
        margin-right:auto;
        margin-left:auto;
        text-align: justify;
        text-justify: inter-word;

      }
    `;
  }

  // - - - - - CSS STYLES END - - - - -

}


