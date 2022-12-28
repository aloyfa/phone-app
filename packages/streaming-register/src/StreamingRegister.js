import { html, css, LitElement } from 'lit';

export class StreamingRegister extends LitElement {
  

  static get properties() {
    return {
      page:{ type:String },

    };
  }

  constructor() {
    super();
    this.page = '';
    this.title = 'register component Works'

  }

  gotoLogin(){
    this.dispatchEvent(
      new CustomEvent("goto-login",{
        detail:this.page})
    )
  }


  async onRegister(event){
    event.preventDefault();

    const name = this.shadowRoot.querySelector('#name')
    const username = this.shadowRoot.querySelector('#username')
    const email = this.shadowRoot.querySelector('#email')
    const password = this.shadowRoot.querySelector('#password')

        this.dispatchEvent(new CustomEvent('new-account', {
          detail: {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value
          }
        }));
  }


  // - - - - - RENDER HTML BEGINS - - - - - 
 
 
  render() {
    return html`
      <div class='page-container'>
        <form action="">
          <h1>Regístrate</h1>
          <label>Nombre:</label><br>
          <input 
            type='text' 
            placeholder='Juan Domínguez'
            id='name'/>
          <br>
          <label>Usuario:</label><br>
          <input
            type='text' 
            name='username' 
            placeholder='juan316'
            id='username'/>
          <br>
          <label>email:</label><br>
          <input
            type='email'
            name='email' 
            placeholder='jdominguez@ejemplo.com'
            id="email"/>
          <br>
          <label>contraseña:</label><br>
          <input 
            type='password'
            name='username' 
            placeholder="········"
            id='password'/>
          <p>¿Ya tienes cuenta? <a @click='${this.gotoLogin}' href='#'>¡inicia sesión!</a> </p>
          <button
            @click='${this.onRegister}'> Registrar
          </button>
          
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
        width:300px
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
        background-color:  white;
        border-style:none;
        border-radius: 8px;
        height:30px;
        width:95%;
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
    `;
  }

  // - - - - - CSS STYLES END - - - - -

}
