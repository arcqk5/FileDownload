import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from '../upload.js'

const firebaseConfig = {
    apiKey: "AIzaSyAm0uOIcUkQAG3u98ppDyYyNb5UI3V6YYs",
    authDomain: "test-firebase-lga.firebaseapp.com",
    projectId: "test-firebase-lga",
    storageBucket: "test-firebase-lga.appspot.com",
    messagingSenderId: "912879621994",
    appId: "1:912879621994:web:ab3248ad20c1be8d607713"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
      files.forEach((file, index) => {
        const ref = storage.ref(`images/${file.name}`)
        const task = ref.put(file)
  
        task.on('state_changed', snapshot => {
          const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
          const block = blocks[index].querySelector('.preview-info-progress')
          block.textContent = percentage
          block.style.width = percentage
        }, error => {
          console.log(error)
        }, () => {
          task.snapshot.ref.getDownloadURL().then(url => {
            console.log('Download URL', url)
          })
        })
      })
    }
  })