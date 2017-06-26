import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

firebase.initializeApp({
  apiKey: "AIzaSyDFcBEHHQPo3FMwKmvVEgxOBM3T6M8Oc4s",
  authDomain: "hotdog-e27b2.firebaseapp.com",
  databaseURL: "https://hotdog-e27b2.firebaseio.com",
  projectId: "hotdog-e27b2",
  storageBucket: "hotdog-e27b2.appspot.com",
  messagingSenderId: "898970679003"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
