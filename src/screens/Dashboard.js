import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import firebase from '../../database/firebase.js';


export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("QuestionScreen")}
      >
        Questions
      </Button>
      <Button
        mode = "outlined"
        onPress = {() => navigation.navigate("TreeScreen")}>
        See your Tree!
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("ReviewScreen")}>
        Questions Review
      </Button>

      <Button
        mode="outlined"
        onPress={() => firebase.auth().signOut().then(
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          }))
        }
      >
        Logout
      </Button>
    </Background>
  )
}
