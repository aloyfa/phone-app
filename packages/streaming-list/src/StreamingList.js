import { html, css, LitElement } from 'lit';

export class StreamingList extends LitElement {
  

  static get properties() {
    return {
      page: { type:String },
      movies:{ type:Array},
      baseURL: {type: String},
      categories:{ type:Array},
      movies: {type: Map},
      pageNumber: {type: Number},
      profile: {type: Object},
    };
  }

  constructor() {
    super();
    this.page = '';
    this.title = 'list component Works'
    this.movies = [];
    this.baseURL = 'https://centraal.sfi.digital/api/v1/';
    this.categories = [];
    this.profile = {};
    this.categories = [];
    this.movies = new Map();
    this.pageNumber = 0;


  }
  onMovieSelect(movie) {
    this.dispatchEvent(
      new CustomEvent('movie-selected', {
        detail: movie,
      })
    );
  }

  
  async loadMoviesByCategory() {
    for (const category of this.categories) {
      try {
        const response = await fetch(`${this.baseURL}movie?where[category]=${category._id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const payload = await response.json();
        this.movies.set(category._id, payload.data);
        this.requestUpdate();
      } catch (exception) {}
      
    }
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    const response = await fetch(`https://centraal.sfi.digital/api/v1/category?paginate[page]=${this.pageNumber}&paginate[limit]=3`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const payload = await response.json();
    this.categories = [...payload.data];
    this.pageNumber++;
    await this.loadMoviesByCategory();
  }

  async updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has('categories')) {
      await this.loadMoviesByCategory();
    }
  }

  async moreCategories() {
    const response = await fetch(`https://centraal.sfi.digital/api/v1/category?paginate[page]=${this.pageNumber}&paginate[limit]=3`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const payload = await response.json();
    this.categories = [...this.categories, ...payload.data];
    this.pageNumber++;
    await this.loadMoviesByCategory();
  }
  gotoSearch(){
    this.dispatchEvent(
      new CustomEvent("goto-search", {
        detail: this.page,
      })
    );
  }
  gotoProfile(){
    this.dispatchEvent(
      new CustomEvent("goto-profile", {
        detail: this.page,
      })
    );
  }
  gotoFavorites(){
    this.dispatchEvent(
      new CustomEvent("goto-favorites", {
        detail: this.page,
      })
    );
  }






  // - - - - - RENDER HTML BEGINS - - - - - 
 
 
  render() {
    return html`

      <div class='page-container'>
        ${this.categories.map(category => html`
          <h3>${category.title}</h3>
          <div class='categorie-container'>
            ${this.movies && this.movies.size > 0 ? this.movies.get(category._id).map(movie => html`
              <div 
              @click="${() => {this.onMovieSelect(movie)}}"
              class='cover-container'>
                <img src='${movie.cover}'>
              </div>
            `) : ''}
          </div>
        `)}
        ${this.pageNumber <= 2 ? html`
        <button class='show-more' @click="${this.moreCategories}">Ver más categorías</button>
      ` : ''}
      </div>
      <div class='navbar'>
        <div
          class='nav-items'
          @click='${this.gotoSearch}'>
          🔍︎ Search
        </div>
        <div 
          class='nav-items profile'
          @click='${this.gotoProfile}'>
          <img class="avatar" src='${this.profile.avatar}'>
          <p>${this.profile.name}</p>
        </div>
        
      </div>
      
    `;
  }

  // - - - - - CSS STYLES BEGIN - - - - -


  static get styles() {
    return css`

      .navbar{
        display: flex;
        height: 90px;
        width: 405px;
        background-color: black;
        border-radius: 30px;
        align-items: center;
        justify-content: space-around;
      }
      
      .nav-items{
        color: white;
        font-size: 20px;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-content: space-around;
        
      }
      .page-container{
        height:650px;
        width:400px;
        white-space: nowrap;    
        overflow: auto;  
        overflow-x:hidden;
        color:white
        
      }
      .avatar{
        height:30px;
        border-radius:50%;
        width:30px;
      }
      .cover-container img {
        height:130px;
        width:90px;
        
      }
      .movies-container{
        display:flex;
        white-space: nowrap;    
        overflow: auto;    
      }
      .categorie-container{

        height:130px;
        width:400px;
        display:flex;
        white-space: nowrap;    
        overflow: auto;
        overflow-y:hidden;
      }
      button{
        border-radius: 30px;
        border-style: none;
        background-color: rgba(255, 255, 255, 0.4);
        color: white;
        transform: translateY(15px);
        padding: 12px;
      }
      button:hover{
        background-color: rgba(255, 255, 255, 0.7)
      }
    `; // - - - - - CSS STYLES END - - - - -
  }

}
