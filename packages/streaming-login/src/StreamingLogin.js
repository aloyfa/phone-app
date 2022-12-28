import { html, css, LitElement } from 'lit';

export class StreamingLogin extends LitElement {
  

  static get properties() {
    return {
      page:{ type:String },

    };
  }

  constructor() {
    super();
    this.page = '';
    this.title = 'login component Works'

  }

  gotoRegister() {
    this.dispatchEvent(
      new CustomEvent("goto-register", {
        detail: this.page,
      })
    );
  }

  async onLogin(event) {
    event.preventDefault();

    const username = this.shadowRoot.querySelector("#username");
    const password = this.shadowRoot.querySelector("#password");

    this.dispatchEvent(
      new CustomEvent("user-login", {
        detail: {
          username: username.value,
          password: password.value,
        },
      })
    );
  }





  // - - - - - RENDER HTML BEGINS - - - - - 
 
 
  render() {
    return html`
      <div class='page-container'>
        <form>
        <img class='logo' src="https://tv.apple.com/assets/knowledge-graph/tv.png">
        <h1>Iniciar Sesión</h1>
        <input
          type ='text'
          name ='username'
          placeholder ='Usuario o e-mail'
          id ='username'
          required/>
        <br>
        <input
          type ='password'
          name ='password'
          placeholder ="Contraseña"
          id ='password'
          required/>
          <br>
        <button @click='${this.onLogin}'>Login</button>
        <p>¿No tienes una cuenta aún?  </p><a href='#' @click='${this.gotoRegister}'>¡Registrarte!</a>
        </form>
      </div>    
    `;
  }


  // - - - - - CSS STYLES BEGIN - - - - -


  static get styles() {
    return css`
      form{
        border:1px solid black;
        flex-flow: column nowrap;
        place-content: center flex-start;
        justify-content: center;
        align-items: center;
        display: flex;
        padding:20px;
        background-color: white;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.7);
        width:80%

      }
      .page-container{
        display: flex;
        height: 700px;
        width: 400px;
        flex-flow: column nowrap;
        place-content: center flex-start;
        justify-content: center;
        align-items: center;
      }
      input{
        width:80%;
        background-color:  white;
        border-style:none;
        border-radius: 8px;
        height:30px
      }

      button{
        width:100px;
        height:30px;
        background-color: #0aa359;
        color: white;
        border-style:none;
        border-radius: 8px
      }
      
      button:hover{
        background-color: #06753f;
      }
      .logo{
        height:100px;
        width:100px;
       
      }
      
    `; // - - - - - CSS STYLES END - - - - -

  }

 

}
