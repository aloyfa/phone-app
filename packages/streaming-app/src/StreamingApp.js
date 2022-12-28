import { LitElement, html, css } from 'lit';

import '@streaming/streaming-list';
import '@streaming/streaming-profile';
import '@streaming/streaming-register';
import '@streaming/streaming-movie';
import '@streaming/streaming-login';
import '@streaming/streaming-search';


export class StreamingApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: {type: String},
      movies: {type: Array},
      movieSelected: {type: Object},
      profileSelected: {type: Object}
    };
  }

  constructor() {
    super();
    this.page = 'profile';
    this.movies = [];
  }
  // - - - - - ROUTES - - - - - 

  gotoRegister() {
    this.page = "register";
  }
  gotoLogin() {
    this.page = "login";
  }
  gotoList(){
    this.page = 'list';
  }
  gotoSearch(){
    this.page = 'search';
  }
  gotoProfile(){
    this.page = 'profile';
  }
  gotoMovie() {
    this.page = 'movie';
  }


// - - - - - METHODS - - - - -


  onMovieSelected({detail: movie}) {
    this.movieSelected = movie;
    this.gotoMovie()
  }
  onProfileSelected({detail: profile}) {
    this.profileSelected = profile;
    this.gotoList()
  }

  logout(){
    sessionStorage.removeItem("token");
    this.page = "login"
  }


  async userLogin(event){
    try{
      const response = await fetch('https://centraal.sfi.digital/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: event.detail.username,
          password: event.detail.password,
        })
      });

      if(response.status === 200) {
        const payload = await response.json()
        if(payload.success){
          this.page = 'profile'
          sessionStorage.setItem('token', payload.data)
          sessionStorage.setItem('account', payload.account)
        }
      }
      if(response.status !== 200) {
        alert('datos no coinciden con nuestra base de datos')
      }

    }
    catch(error){
      console.log(error);
    }
  }

  async newProfile(event) {
    
      await fetch("https://centraal.sfi.digital/api/v1/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: event.detail.name,
          avatar: event.detail.avatar,
          account: sessionStorage.getItem("account"),
        }),
      });
      alert("Perfil ha sido creado con exito");
  
  }

  async newUser(event) {

    try {
      const response = await fetch('https://centraal.sfi.digital/api/v1/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: event.detail.name,
          username: event.detail.username,
          email: event.detail.email,
          password: event.detail.password,

        })
      });

      if(response.status === 200) {
        alert('Usuario registrado con éxito, ahora inicia sesión');
        this.gotoLogin();
      }
      if(response.status === 409) {
        alert('Usuario ya existente, intente iniciar sesión');
        this.gotoLogin();
      }

    } catch (error) {
      console.log(error);
    }
  }






// - - - - - RENDER HTML BEGINS - - - - - -

  render() {
    return html`
      <div class='mobile'>
        <div class='island'></div>
        <div class='app-container'>

          ${this.page === 'login' ? html`
            <streaming-login
            @goto-register="${this.gotoRegister}"
            @user-login='${this.userLogin}'
            >
            </streaming-login>
          `:''} 

          ${this.page === 'register' ? html`
            <streaming-register
            @goto-login='${this.gotoLogin}'
            @new-account='${this.newUser}'>
            </streaming-register>
          `:''} 

          ${this.page === 'profile' ? html`
            <streaming-profile
              @user-logout='${this.logout}'
              @create-profile='${this.newProfile}'
              @goto-list='${this.gotoList}'
              @profile-selected="${this.onProfileSelected}">
            </streaming-profile>
          `:''} 

          ${this.page === 'list' ? html`
            <streaming-list
              @movie-selected="${this.onMovieSelected}"
              @goto-search='${this.gotoSearch}'
              @goto-profile='${this.gotoProfile}'
              @goto-favorites='${this.gotoFavorites}'
              .profile="${this.profileSelected}"
            >
            </streaming-list>
          `:''} 

          ${this.page === 'search' ? html`
            <streaming-search
              @movie-selected="${this.onMovieSelected}"
            >
            </streaming-search>
          `:''} 

          ${this.page === 'movie' ? html`
            <streaming-movie
              .movie="${this.movieSelected}"
              @goto-list='${this.gotoList}'
            >
            </streaming-movie>
          `:''} 
    `;
  }

  //    - - - - - CSS STYLES BEGINS - - - - -

  static get styles() {
    return css`
      :host {
        font-family:'Segoe UI';
      }
      .mobile{
        margin-top:20px;
        margin-left:auto;
        margin-right:auto;
        width:400px;
        height:800px;
        border: 15px solid black;
        border-radius: 70px;
        background-color: rgba(255, 255, 0, 0.3);
        background:
          linear-gradient(
            rgba(0, 0, 0, 0.5), 
            rgba(0, 0, 0, 0.5)
          ),
          url('https://wallpaperaccess.com/full/5485712.jpg');

      }

      .island{
        position: absolute;
        background-color: #313131;
        width:120px;
        height:35px;
        transform: translateX(140px) translateY(20px);
        border-radius: 20px
      }
      .app-container{
        height:700px;
        width:400px;
        transform: translateX(-1px) translateY(60px);
      }

      .bar{
        position: absolute;
        background-color: lightgray;
        width: 150px;
        height: 5px;
        transform: translateX(129px) translateY(76px);
        border-radius: 20px;
      }

      /*- - - - - CSS ENDS - - - - - */
    `;
  }
}
