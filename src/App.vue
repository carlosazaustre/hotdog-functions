<template>
  <div id="app">
    <app-header :isHotdog="isHotdog"></app-header>
    <app-image @upload="handleUpload"></app-image>
  </div>
</template>

<script>
import firebase from 'firebase'
import AppHeader from './components/AppHeader'
import AppImage from './components/AppImage'

firebase.initializeApp({
  apiKey: 'AIzaSyDFcBEHHQPo3FMwKmvVEgxOBM3T6M8Oc4s',
  authDomain: 'hotdog-e27b2.firebaseapp.com',
  databaseURL: 'https://hotdog-e27b2.firebaseio.com',
  projectId: 'hotdog-e27b2',
  storageBucket: 'hotdog-e27b2.appspot.com',
  messagingSenderId: '898970679003'
})

export default {
  name: 'app',
  components: { AppHeader, AppImage },
  data () {
    return {
      isHotdog: false,
      imageUrl: null
    }
  },

  methods: {
    handleUpload ({ isHotdog }) {
      this.isHotdog = isHotdog
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
