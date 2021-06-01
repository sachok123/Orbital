import React, { useState, useEffect} from 'react'
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
    console.log(user.uid)
    const users = firebase.database().ref(`users`)
    users.get().then(function(snapshot){
      console.log(snapshot.child(user.uid).child("level").val())
    })
    const questions = firebase.database().ref(`questions`)
    console.log(questions)
    questions.orderByChild("id").equalTo("1").get().then(function(snapshot)
    {  console.log(snapshot.child(0).child("question").val())


    })

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
        <Text>question</Text>
      </Background>
    )
}