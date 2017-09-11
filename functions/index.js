const functions = require('firebase-functions')
const admin = require('firebase-admin')
const gcs = require('@google-cloud/storage')()
const vision = require('@google-cloud/vision')()

admin.initializeApp(functions.config().firebase)

exports.isHotdog = functions.storage.object()
  .onChange(event => {
    const object = event.data

    if (object.resourceState === 'not_exists' || !object.name) {
      return console.log('This is a deletion/deploy event.')
    }

    const file = `gs://${object.bucket}/${object.name}`

    return detectLabels(file)
  })

function detectLabels (file) {
  console.log('detecting labels...')
  return vision.labelDetection({ source: { imageUri: file } })
    .then(response => {
      const labels = response[0].labelAnnotations

      let isHotdog = false
      labels.map(label => {
        if (label.description === 'hot dog') {
          isHotdog = true
        }
      })

      console.log('the image is hotdog? ', isHotdog)
      return admin.database().ref('/uploads/photo').update({ isHotdog })
    })
}
