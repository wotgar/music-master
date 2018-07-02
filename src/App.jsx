import React, {Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    console.log('this.state', this.state);

    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    {/*let Variablen kann man überschreiben. const nicht.*/}
    const ALBUM_URL = 'https://api.spotify.com/v1/artists';
    {/*accessToken und myOptions sind nötig für den Zugriff auf die Spotify API*/}
    var accessToken = 'BQCg_-ITIueKIQ3HDNyXzm4TWTPtRUVHFM14YVWGQ8MR5hlHBl38ksFem2S2An9A-DDWskcssEwa8AzpbKjo11lklndy04i-xaDOmiYBOroaUvdDPCCd1i3fpknHsELKfCoTG4NVyHmmWGGTtpyJHTFwEMDMEZpLtg&refresh_token=AQB1Eh_DVZAJpCli9QCZEF3W_i465CVsqmUBPO9N4tFwyn-PCt0bsmRNRABkLlugYoK5lIXIpok5EnQ5fzyvlrJjS17ZrPNGwHwllBYUnW6_i9FY5bcG1N22tTFDWoQxO9o'
    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };
    /* Im folgenden wird die, von der API zurückgegebene JSON Datei weiter verarbeitet.
     * Diese JSON enthält die gesuchten Musikerdaten.
     * fetch ist eine ES6 Stanard-Methode. Hier wurden einige Attribute in die
     * myOptions-Variable ausgelagert, z.B. dass es einen GET ausführen soll.
     */
    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0] /* die JSON hat ein artists-array.
        Dort nehmen wir den ersten Eintrag und geben ihn an unsere eigene Konstante.
        Dann ändern wir den Wert im Status entsprechend, um damit arbeiten zu können:*/
        this.setState({artist});

        FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`; {/* Schreibweise mit Platzhaltern, damit man sich die + Geschichten sparen kann. Vergleiche die obere FETCH_URL.*/}
        fetch(FETCH_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            console.log('artist\'s top tracks: ', json);
            const{ tracks } = json;
            {/* Dank dieser Kurzschreibweise wird direkt der etsprechende Key
              * "tracks" in der JSON gesucht und an die Konstante gegeben.
              * Die lange Schreibweise hier wäre "const tracks = json.tracks" */}
            this.setState({tracks: tracks});
            {/* Lange Schreibweise um das Feld im State anzusprechen.
              * Hier könnte auch einfach {tracks} stehen, weil das Feld und die
              * zugewiesene Variable denselben Namen haben.*/}
          })
      });
      /* den console log brauchen wir nun nicht mehr
      .then(json => console.log(json)); */
  }

  render() {
    return(
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            {/*Innerhalb der FormControl arbeiten Event-Listener. onChange schreibt
              zur Laufzeit den Text des Eingabefelds in die entsprechende Variable
              im state, hier die Variable 'query'.
              onKeyPress ist ein weiterer Listener, der so konfiguriert wird,
              dass er die Suchfunktion ausführt, sowie die Enter-Taste gedrückt wird*/}
            <FormControl
              type="text"
              placeholder="search for an artist..."
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
          {/*InputGroup kann meherere Anhänge haben .Addon oder .Button, z.B.*/}
            <InputGroup.Addon onClick={() => this.search()}>
            {/*Glyphicon hat eine Auswahl an Icons. Search ist z.B. eine Lupe
              *Aber ich habe hier Probleme in Linux damit. Evtl. nochmal neu
              *konfigurieren, bezüglich NPM Installationen.*/}
              <Glyphicon glyph="search"></Glyphicon >
            {/*WICHTIG!!! Glyphicon wurde in Bootstrap 4 gestrichen!!! Wir verwenden deshalb BS3.3.7.*/}
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        { /* Ternary, damit die Informationen nur gezeigt werden, wenn ein Künstler gefunden wurde */
          this.state.artist !== null
          ? <div>
              <Profile artist={this.state.artist}/>
                {/* Hier wird die Klasse/Komponente Profile aufgerufen.
                  * Ihr wird als Property der Wert artist aus dem state gegeben*/}
              <Gallery tracks={this.state.tracks}/>
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
