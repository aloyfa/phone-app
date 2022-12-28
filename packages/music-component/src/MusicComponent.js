import { html, css, LitElement } from 'lit';

export class MusicComponent extends LitElement {
  

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
      filteredSongs: {type: Array},
      res: {type: String},
      playSong: {type: String},
      page: { type: String },


    };
  }

  constructor() {
    super();
    this.playlist = [
      {
        artist: 'Blink 182',
        song: 'All The Small Things',
        album: 'Enema Of the State',
        art: '../assets/images/Enema of.jpg',
        file:'https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_1MB_MP3.mp3',
      },
      {
        artist: 'Bon Jovi',
        song: 'Its My Life',
        album: 'Crush',
        art: '../assets/images/crush bon-jovi.jpg',
        file: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
      },
      {
        artist: 'NSYNC',
        song: 'Bye Bye Bye',
        album: 'No Strings Attached',
        art: '../assets/images/no strings.jpg',
        file:'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
      },
      {
        artist: 'Eminem',
        song: 'The real Slim Shady',
        album: 'The Marshall Mathers LP',
        art: '../assets/images/The marshall.jpeg',
        file:'https://samplelib.com/lib/preview/mp3/sample-6s.mp3',
      },
      {
        artist: 'Robbie Williams',
        song: 'Rock DJ',
        album: 'Sing When Youre Winning',
        art: '../assets/images/sing when.jpg',
        file:'https://samplelib.com/lib/preview/mp3/sample-19s.mp3',
      },
      {
        artist: 'Music',
        song: 'Madonna',
        album: 'Music',
        art: '../assets/images/Music.jpg',
        file:'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
      },
      {
        artist: 'Red Hot Chili Peppers',
        song: 'Otherside',
        album: 'Californication',
        art: '../assets/images/Californication.jpg',
        file:'https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_1MB_MP3.mp3',
      },
      {
        artist: 'Limp Bizkit',
        song: 'Take a Look Around',
        album: 'Chocolate Starfish',
        art: '../assets/images/chocolate star.jpg',
        file: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
      },
      {
        artist: 'U2',
        song: 'Beautiful Day',
        album: 'All That You Cant Leave behind',
        art: './assets/images/all-that-you-cant-leave-behind.jpg',
        file: 'https://samplelib.com/lib/preview/mp3/sample-9s.mp3',
      },
      {
        artist: 'Britney Spears',
        song: 'Opps!...I Did It Again',
        album: 'Opps!...I Did It Again',
        art: '../assets/images/oops i did it.jpg',
        file:'https://samplelib.com/lib/preview/mp3/sample-15s.mp3'
      }
    
    ];
    this.filteredSongs = [];
    this.res = '';
    this.playSong= '';
    this.page = ''

  }

  onFilter(event) {
    const res = event.currentTarget.value;
    this.res = res;
    this.filteredSongs = this.playlist.filter(item => item.song.toLowerCase().trim().includes(res.toLowerCase().trim()));
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.filteredSongs = [...this.playlist];
  }

  onSongClick(clickedInfo){
    const track = clickedInfo.currentTarget.joaquin
    const  clickedSong = new CustomEvent('song-selected',{detail: track});
    this.dispatchEvent(clickedSong)
    this.song = track
    this.playSong = this.song
    this.page = 'player'
  }
  
  
  gotoList(){
    this.page = ''
  }

 

  render() {
    return html`
      <div class='screen-container'>
        <div class='island'></div>
        <div class='playlist'>
        <input type="text" placeholder="🔍︎ Search for a song" @input="${this.onFilter}">
          ${this.filteredSongs.map((song) => html`
          <div @click='${this.onSongClick}' .joaquin=${song} class='song-container'>
            <p>${song.song} - ${song.artist}</p>
            <img class='list-img' src='${song.art}'>
          </div>`)}
            
        </div>
      </div>
      ${this.page === 'player' ? html`
        ${this.playSong === '' ? '' :html`
          <div class='player'>
            <button class='back'
            @click='${this.gotoList}'><</button>
            <div class='art-container'>
            <img src="${this.song.art}" alt='${this.song.song}'>
            </div>
            <div class='info-container'>
              <p>${this.song.song}</p>
              <p>${this.song.artist}</p>
              <p>${this.song.album}</p>

            </div>
            <div class='audio-container'>
            <audio src= '${this.song.file}' autoplay controls></audio>
            </div>
        `}
      `:''}
      </div>
    `
  }
  static get styles() {
    return css`
    
    .list-img{
      height: 60px;
      width: 60px;
      margin-left: auto;
      margin-right:15px
    }
    .screen-container {
      margin-top:20px;
      width:400px;
      height:800px;
      border: 15px solid black;
      border-radius: 70px;
      background-color: #444444;
    }  
    .back{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 30px;
      background-color: rgba(255, 255, 255, 0.3);
      color: white;
      border-style: none;
      transform: translateX(-158px) translateY(-54px);
    }
    .back:hover{
      background-color: rgba(255, 255, 255, 0.7)
    }
    .island{
      background-color: black;
      width:120px;
      height:35px;
      transform: translateX(140px) translateY(20px);
      border-radius: 20px;
      margin-bottom:30px
    }
    .player {
      display: flex;
      width: 400px;
      height: 736px;
      transform: translateX(15px) translateY(-750px);
      background: radial-gradient(circle, rgb(237, 55, 79) 0%, rgb(68, 68, 68) 77%);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 0px 0px 59px 59px;
      position: absolute;
    }
    .art-container img{
      width:300px;
      height:300px;

    }
    .playlist{
      color:white;
    }
    .playlist input{
      height:30px;
      margin:5px 10px 0px 20px;
      width: 350px;
      border-radius: 15px;
      border-style: none;
      background-color: #6a6a6a
    }
    ::placeholder{
      color:white;
    }
    input[type="text" i] {
      text-align:center;
      font-size:18px;
    }
    .playlist audio {
      width: 50%;
      height:30px;
    }
    
    .info-container{
      color:white;
      font-size: 25px;
    }
   
    .song-container{
      display:flex;
      height:68px;
      border-bottom: solid black 1px;
      padding-left:10px;
      align-items: center
    }
    .song-container button{
      border-radius: 50%;
      height: 26px;
      min-width: 20px;
      margin-top: 5px;
      margin-left: 5px;
      background-color:#ED374F;
      
    }
    
    .button-container{
      margin-top:10px
    }
    .button-container button{
      border-radius: 50%;
      height: 50px;
      width: 50px;
      font-size: 30px;
      background-color:#ED374F;
    }

    
    `;
  }
}
