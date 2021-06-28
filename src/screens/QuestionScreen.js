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

    const[email, setEmail] = React.useState('')
    const [levels, setLevels] = React.useState(0)
    const [users, userState] = React.useState('')
    const [questionState, setQuestions] = React.useState({
      answer: '', 
      id: '', 
      question:''
    })

    const [textInput, setTextInput] = React.useState('')
    const [userAnswer, setUserAnswer] = React.useState('')
    const [answer, setAnswer] = React.useState('')

    React.useEffect(() => {

      var userEmail = firebase.auth().currentUser.email;
      setEmail(userEmail) 
      console.log('User email is', userEmail); 

      var userId = firebase.auth().currentUser.uid; 
      userState(userId)
      console.log(userId)

      firebase.database().ref(`users/${userId}`)
      .on('value', (user) => {
        var level = user.val().level
        setLevels(level)
        console.log(level)
      })

    }, [email])

    React.useEffect(() => {// rendering of question according to user level 

      firebase.database().ref(`questions/${levels}`)
      .on('value', (qn) => {
        console.log(qn.val())
        var ans = qn.val().answer
        setAnswer(ans)
        setQuestions({
          answer: qn.val().answer,
          id: qn.val().id, 
          question: qn.val().question
        })
      })

    }, [levels])

    const answerValidator = (text) => { //validation of answer 
      if (text == answer){
        alert("That's correct, well done!")
        return true
      }
      else{
        alert("Oops that's wrong...try again!")
        return false
      }
    }

    const onSubmitPressed = () => {
      const correct = answerValidator(userAnswer)
      if (correct == true) {
        setLevels(levels + 1)
        firebase.database().ref("users").child(users).child("level").set(levels + 1) //update of user level 
      }
      setUserAnswer("")
      clearText()
    }


    const clearText = () =>{ // allows text to be cleared for the next question 
      setTextInput('');
  }

    const bothFunction = (text) => {
      setUserAnswer(text)
      setTextInput(text)
    }



    const styles = StyleSheet.create({
      baseText: {
        //fontFamily: "Cochin",
        fontSize: 19
      },
      questionText: {
        //fontFamily: "Cochin",
        fontSize: 25
      }
    });
    
    return(
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Header>Questions</Header>
        <Text style = {styles.baseText}> Level: {levels} </Text>
        <Text style = {styles.baseText}> Question No: {questionState.id}</Text>
        <Text style = {styles.baseText}> Question: {questionState.question}</Text>

        <TextInput
        value = {textInput}
        label = "Answer"
        onChangeText = {(text) => bothFunction(text)}
        
        />
        <Button mode = "contained" onPress ={onSubmitPressed}>
          Submit
        </Button>
      </Background>
    )

}