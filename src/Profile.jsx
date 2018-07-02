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
      <div className="profile">
        {/* images ist in der json ein array aus URLs. Diese verwerten wir jetzt: */}
        <img
          alt="Profile"
          className="profile-img"
          src={artist.images[0].url}/>
        <div className="profile-info">
          {/* name und followers.total sind parameter im artists-array der json
              Wir haben sie an unsere let-Variable 'artist' weitergegeben und
              lesen sie nun von dort aus: */}
          <div className="profile-name">
            {artist.name}
          </div>
          <div className="profile-followers">
            {artist.followers.total} followers
          </div>
          <div className="profile-genres" render="false">
            {
              /* JS hat eine map-Funktion, mit der man Arrays durchiterieren kann
               * Wie bei einer foreach steht hier die Variable 'stilrichtung' für die einzelnen
               * Einträge des Arrays, während das k den Key oder Index darstellt.
               * Statt stilrichtung und k können dort beliebige Variablennamen stehen.
               */
                artist.genres.map((stilrichtung, k) => {
                  stilrichtung = stilrichtung;
                  {/* Ich blende hier mal den return aus, damit diese Liste nicht gerendered wird.
                  return(
                    <span key={k}>{stilrichtung}</span>
                  ) */}
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
      </div>
    )
  }

}

export default Profile;
