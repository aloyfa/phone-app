import { html, css, LitElement } from 'lit';

export class StreamingSearch extends LitElement {
  

  static get properties() {
    return {
      title: { type: String },
      filteredMovie: {type: Array},
      res: {type: String},
    };
  }

  constructor() {
    super();
    this.movies = [];
    this.filteredMovies = [];
    this.res = '';
  }

  onFilter(event) {
    const res = event.currentTarget.value;
    this.res = res;
    this.filteredMovies = this.movies.filter(movie => movie.title.toLowerCase().trim().includes(res.toLowerCase().trim()));
  
  }


  onMovieSelect(movie) {
    this.dispatchEvent(new CustomEvent('movie-selected', {
      detail: movie,
    }));
  }


  async getMovies(){
    const response = await fetch(`https://centraal.sfi.digital/api/v1/movie`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const payload = await response.json();
    this.movies = payload.data
  }

  firstUpdated(_changedProperties) {
    this.getMovies()
    super.firstUpdated(_changedProperties);
    this.filteredMovies = [...this.movies];
  }
  


  // - - - - - RENDER HTML BEGINS - - - - - 
 
 
  render() {
    return html`
      <div class='page-container'>
        <div class='playlist'>
        <input 
          type='text'
          placeholder='🔍︎ Busca una pelicula'
          @input="${this.onFilter}"
        >
        <div class='movies-list-container'>
          ${this.filteredMovies.map((movie) => html`
            <div
              class='result-container'
              @click="${() => {this.onMovieSelect(movie)}}"
            >
              <div>
                <p>${movie.title}</p>
              </div>
              <img src='${movie.cover}'>
            </div>
          `)}
        </div>
            
        </div>
      </div>
    `;
  }


  // - - - - - CSS STYLES BEGIN - - - - -


  static get styles() {
    return css`
      
    .movies-list-container{
      height:612px;
      width:400px;
      white-space: nowrap;    
      overflow: auto;  
      overflow-x:hidden;
      align-content:space-between;
    }

    .result-container{
      width: 400px;
      height: 100px;
      display: flex;
      line-height: 50px;
      border: 1px solid lightgray;
      flex-flow: row wrap;
      align-items: center;
      justify-content:space-between;
      background-color: rgba(255, 255, 255, 0.5)
    }

    .result-container img{
      width:50px;
      height:80px;
      margin-right:20px
    }

    .result-container p{
      margin-left:20px
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

      .page-container{
        padding-top:20px;
        display: flex;
        height: 700px;
        width: 400px;
        flex-wrap: nowrap;
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;

      }
      
    `; // - - - - - CSS STYLES END - - - - -
  }
}
