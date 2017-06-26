import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';

class App extends Component {
  state = {
    imageUrl: null,
    isHotdog: false
  }

  componentWillMount() {
    firebase.database().ref('/uploads').on('value', snapshot => {
      this.setState({ isHotdog: snapshot.val().photo.isHotdog });
    });
  }

  handleUpload = (event) => {
    const file = event.target.files[0];

    return firebase.database().ref('/uploads/photo').set({
      isHotdog: false
    })
    .then(data => {
      return firebase.storage().ref(`/uploads/${file.name}`).put(file)
        .then(snapshot => {
          this.setState({ imageUrl: snapshot.metadata.downloadURLs[0] });
        });
    });
  }

  renderHeaderOK() {
    console.log('render IS hotdog')
    return(
      <header className="header header--isHotdog">
        Hotdog!
        <span className="hotdog hotdog--green">🌭</span>
      </header>
    );
  }

  renderHeaderNotOK() {
    console.log('render is NOT hotdog')
    return(
      <header className="header">
        Not Hotdog!
        <span className="hotdog">🌭</span>
      </header>
    );
  }

  render() {
    return (
      <div>
        { this.state.isHotdog ? this.renderHeaderOK() : this.renderHeaderNotOK() }
        <label
          className="cameraButton"
          htmlFor="inputElement">📷</label>
        <input 
          id="inputElement"
          type="file"
          className="inputFile"
          onChange={this.handleUpload}
          ref={node => this.inputElement = node}
        />
        <figure className="image-container">
          <img className="image" src={this.state.imageUrl} />
        </figure>
      </div>
    );
  }
}

export default App;
