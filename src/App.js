import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';

class App extends Component {
  state = {
    imageUrl: null,
    isHotdog: false
  }

  componentWillMount() {
    firebase.database().ref('/uploads').on('child_changed', snapshot => {
      console.log(snapshot.val());
    });
  }

  handleUpload = (event) => {
    const file = event.target.files[0];

    return firebase.database().ref('/uploads').push({
      imageUrl: null,
      isHotdog: false
    })
    .then(data => {
      return firebase.storage().ref(`/uploads/${file.name}`).put(file)
        .then(snapshot => {
          data.update({ imageUrl: snapshot.metadata.downloadURLs[0] })
          this.setState({ imageUrl: snapshot.metadata.downloadURLs[0] });
        });
    });
  }

  render() {
    return (
      <div>
        <header className="header">HotDog or No?</header>
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
