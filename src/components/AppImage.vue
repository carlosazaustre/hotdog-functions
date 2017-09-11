<template>
  <div>
    <label class="cameraBtn" for="inputElement">📷</label>
    <input id="inputElement" type="file" @change="onUploadImage">
    <figure class="imageContainer">
      <img :src="imageUrl">
    </figure>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'app-image',
  data () {
    return {
      imageUrl: null
    }
  },

  created () {
    firebase.database()
      .ref('/uploads')
      .on('value', snapshot => this.$emit('upload', { isHotdog: snapshot.val().photo.isHotdog }))
  },

  methods: {
    onUploadImage (event) {
      const file = event.target.files[0]

      return firebase.database()
        .ref('/uploads/photo')
        .set({ isHotdog: false })
        .then(data => {
          return firebase.storage()
            .ref(`/uploads/${file.name}`)
            .put(file)
            .then(snapshot => {
              this.imageUrl = snapshot.metadata.downloadURLs[0]
            })
        })
    }
  }
}
</script>


<style scoped>
  .cameraBtn {
    background-color: #1149cb;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    bottom: 1em;
    right: calc(50% - 30px);
  }

  .imageContainer {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input[type="file"] {
    display: none;
  }
</style>

