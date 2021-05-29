import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
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

export default function QuestionScreen({ navigation }) {
    const user = firebase.auth().currentUser;
    const question = firebase.database().ref(`questions/${user.level}`)

    /*const dbRef = firebase.database().ref();
    dbRef.child("questions").child(user.uid).get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
      alert(error);
    }); */

    return(
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Text>questions to be displayed here</Text>
      </Background>
    )
}