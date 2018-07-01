import React, {Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
import Profile from './Profile'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    }
  }

  search() {
    console.log('this.state', this.state);

    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    {/*accessToken und myOptions sind nötig für den Zugriff auf die Spotify API*/}
    var accessToken = ''
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
      })
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
              placeholder="search an artist..."
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
          {/*InputGroup.Addon ist in unserem Fall einfach ein Button*/}
            <InputGroup.Button onClick={() => this.search()}>
            {/*Glyphicon hat eine Auswahl an Icons. Search ist z.B. eine Lupe
              *Aber ich habe hier Probleme in Linux damit. Evtl. nochmal neu
              *konfigurieren, bezüglich NPM Installationen.*/}
              <Button glyph="search">search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <Profile artist={this.state.artist}/>
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
