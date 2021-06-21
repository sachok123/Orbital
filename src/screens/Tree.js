import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import firebase from '../../database/firebase.js';
import '@firebase/storage';


export default function TreeScreen({navigation}){

    const [imageUrl, setImageUrl] = useState(undefined);

    var userId = firebase.auth().currentUser.uid; 
    var photoName = 'level0.png'

      firebase.database().ref(`users/${userId}`)
      .on('value', (user) => {
        var level = user.val().level
        photoName = 'level' + level + '.png'; 
        console.log(level)
      })


    React.useEffect(() => {
      firebase.storage()
      .ref('/' + photoName) 
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  }, []);

return (
  <Background>
  <BackButton goBack={navigation.goBack} />
    <Image style={styles.image} source={{uri: imageUrl}} />
    </Background>
);
}


const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      marginBottom: 8,
    },
  })
  