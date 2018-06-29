import React, {Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query
                               + 'type=artist&limit=1';
    console.log('FETCH_URL', FETCH_URL);
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
            <InputGroup.Addon onClick={() => this.search()}>
              {/*Glyphicon hat eine Auswahl an Icons. Search ist z.B. eine Lupe */}
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="Gallery">
          Gallery
        </div>
    }
  }


export default App;
