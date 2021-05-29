import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'


export default function Dashboard({ navigation }) {
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
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
    </Background>
  )
}
