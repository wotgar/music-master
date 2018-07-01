import React, {Component} from 'react';
import './App.css';

class Profile extends Component {
  render() {
    let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: [] };
    /* Wir sprechen hier direkt die entsprechenden Felder der Spotify API JSON an. Die [] Klammern stehen auch hier für Arrays. */
    if (this.props.artist !== null) {
      artist = this.props.artist;
    }
    return (
      <div>
        <div className="profile-info">
          {/* name und followers.total sind parameter im artists-array der json
              Wir haben sie an unsere let-Variable 'artist' weitergegeben und
              lesen sie nun von dort aus: */}
          <div className="profile-name">{artist.name}</div>
          <div className="profile-followers">{artist.followers.total} followers</div>
          <div className="profile-genres">
            {
              /* JS hat eine map-Funktion, mit der man Arrays durchiterieren kann
               * Wie bei einer foreach steht hier die Variable 'duttn' für die einzelnen
               * Einträge des Arrays, während das k den Key oder Index darstellt.
               * Statt duttn und k können dort beliebige Variablennamen stehen.
               */
                artist.genres.map((duttn, k) => {
                  duttn = duttn;
                  return(
                    <span key={k}>{duttn}</span>
                  )
                }
              )
            }
          </div>
          <div className="profile-genres">
            {
              /* Hier noch einmal die Map, dieses Mal mit einem Ternary, der dafür sorgt,
               * dass Leerzeichen und Kommas gesetzt werden. Dank Ternary kein Komma nach
               * dem letzten Eintrag im Array.
               */
              artist.genres.map((genre, k) => {
                genre = genre !== artist.genres[artist.genres.length-1]
                              ? ` ${genre},`
                              : ` ${genre}`;
                return (
                  <span key={k}>{genre}</span>
                )
              })
            }
          </div>
        </div>
        {/* images ist in der json ein array aus URLs. Diese verwerten wir jetzt: */}
        <img
          alt="Profile"
          className="profile-img"
          src={artist.images[0].url}/>
      </div>
    )
  }

}

export default Profile;
