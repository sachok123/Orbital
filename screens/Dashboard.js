import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'

import firebase from '../../database/firebase.js';


export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("TopicScreen")}
      >
        Topics
      </Button>
      <Button
        mode = "outlined"
        onPress = {() => navigation.navigate("TreeScreen")}>
        See your Tree!
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("TopicReviewScreen")}>
        Questions Review
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Collectables")}>
        Collectables
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
