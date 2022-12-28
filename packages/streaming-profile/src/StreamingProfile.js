import { html, css, LitElement } from 'lit';

export class StreamingProfile extends LitElement {
  

  static get properties() {
    return {
      page:{ type:String },
      profiles: {type: Array},
      deletedId: {type: String},
    };
  }

  constructor() {
    super();
    this.page = '';
    this.title = 'profile component Works';
    this.profiles = [];
    this.deletedId = '';


  }

  logout(){
  
    this.dispatchEvent(
      new CustomEvent("user-logout", {})
    );
  }

  async addProfile(event) {
    event.preventDefault();

    const name = this.shadowRoot.querySelector("#name");
    const avatar = this.shadowRoot.querySelector("#avatar");

    this.dispatchEvent(
      new CustomEvent("create-profile", {
        detail: {
          name: name.value,
          avatar: avatar.value,
        },
        
      })
    );
    this.getProfiles()

  }

  async deleteProfile(id){
    this.deletedId = id;
    await fetch(`https://centraal.sfi.digital/api/v1/profile/${this.deletedId}`,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token'),
      },
    }
    ).then((res) => res.json())
    this.getProfiles()
  }

  async getProfiles(){
    try{
      const token = sessionStorage.getItem('token')
      const account = sessionStorage.getItem('account')
      const response = await fetch(`https://centraal.sfi.digital/api/v1/profile?where[account]=${account}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
      });

      if(response.status === 200) {
        const payload = await response.json()
        if(payload.success){
          this.profiles = payload.data
        }
      }
    }
    catch(error){
      console.log(error);
    }
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    await this.getProfiles();
  }

  onProfileSelect(profile) {
    this.dispatchEvent(
      new CustomEvent("profile-selected", {
        detail: profile
      })
    );
  }

  gotoList(){
    this.dispatchEvent(
      new CustomEvent("goto-list", {
        detail: this.page,
      })
    );
  }

  // - - - - - RENDER HTML BEGINS - - - - - 
 
 
  render() {
    return html`
      <div class='page-container'>
        
       
        ${this.profiles.map((profile) => html`
          
          <div class="profile-card">
          <button class='delete' @click='${() => this.deleteProfile(profile._id)}'>X</Button>
            <img @click='${() => {this.onProfileSelect(profile)}}' src="${profile.avatar}">
            <p>${profile.name}</p>
          </div>
        `)}
      <form>
        <h3>Crea un nuevo perfil</h3>
        <input type='text' placeholder='Pedro' id='name'> <br>
        <input type='text' placeholder='image URL' id='avatar'> <br>
        <Button @click='${this.addProfile}'>Add Profile</Button>
      </form>
      <button class='logout' @click='${this.logout}'>Logout</button>
      </div>

    `;
  }


  // - - - - - CSS STYLES BEGIN - - - - -


  static get styles() {
    return css`
      .page-container{
        height:700px;
        width:400px;
        display:flex;
        align-items:flex-start;
        flex-flow :row wrap;
        float:left;
        padding-left: 20px;
      }
      .profile-card{
        height: 200px;
        display: flex;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.7);
        width: 25%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin:10px
      }
      .profile-card:hover{
        transform: scale(1.1);
      }

      .profile-card img{
        height: 60px;
        width: 60px;
        border-radius:50%;
      }
      button.logout{
        position:absolute;
        background-color: #990909;
        position: absolute;
        transform: translateX(281px) translateY(-39px);
        width:auto;
      }
      button.logout:hover{
        background-color: #700505
      }
      form{
        flex-flow: column nowrap;
        place-content: center flex-start;
        justify-content: center;
        align-items: center;
        display: flex;
        border-radius: 10px;
        padding-bottom:10px;
        background-color: rgba(255, 255, 255, 0.7);
        width:80%;
        transform: translateX(26px) translateY(0px);
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

      button.edit{
        background-color: #0a5f97;
        width:40px
      }
      button.edit:hover{
        background-color: #084a75;
      }

      button.delete{
        background-color: rgb(153, 9, 9);
        width: 25px;
        height: 25px;
        padding: 5px;
        border-radius: 50%;
        font-size: 16px;
        transform: translateX(47px) translateY(-21px);;
      }
      button.delete:hover{
        background-color: #700505
      }
      
      button:hover{
        background-color: #06753f;
      }

  
    `; // - - - - - CSS STYLES END - - - - -
  }


}

