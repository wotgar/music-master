import React, {Component} from 'react';
import './App.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl); {/*REACT hat also eine Audio-Klasse. Nice! */}
    if(!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio /*Kurzschreibweise! Lang wäre audio: audio, um die lokale let-Variable zu referenzieren*/
      })
    } else {
      if(this.state.playingUrl === previewUrl) {
        {/* Wenn nochmal auf das selbe Lied geklickt wird, wird es pausiert. */}
        this.state.audio.pause();
        this.setState({
          playing: false
        })
      } else {
        {/* Wenn auf ein anderes Lied geklickt wird, wird das aktuelle gestoppt und das neue gestartet. */}
        this.state.audio.pause(); /* <- Im state ist das alte Lied */
        audio.play(); /* <- In der lokalen Variable ist das neue Lied */
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        })
      }
    }
  }

  render() {
    const tracks = this.props.tracks;
    {/* Könnte man auch in der Kurzschreibweise
      * const { tracks } = this.props;
      * schreiben. Diese ist vor allem dann nützlich, wenn mehrere
      * Felder als Properties übergeben werden. */}
    return (
      <div>
        {
          tracks.map((track, k) => {
            {/* Sollte hier ein Fehler auftauchen, dann haben wir die Daten
              * von Spotify nicht bekommen. Wahrscheinlich wegen dem Token*/}
            console.log('track', track);
            const trackImg = track.album.images[0].url;
            return (
              <div
                key={k}
                className="track"
                onClick={() => this.playAudio(track.preview_url)}
              >
                <img
                  src={trackImg}
                  className="track-img"
                  alt="track"
                />
              <div className="track-play">
                <div className="track-play-inner">

                  {
                    this.state.playingUrl === track.preview_url
                      ? <span>| |</span> /*Ein improvisierter Pause Button*/
                      : <span>&#9654;</span> /*Unicode für einen Play Button*/
                  }
                </div>
              </div>
                <p className="track-text">
                  {track.name}
                </p>
              </div>
              )
          }
        )}
      </div>
    )
  }
}

export default Gallery;
