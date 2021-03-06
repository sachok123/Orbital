import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import firebase from '../../database/firebase.js';



export default function FractionScreen({ navigation }) {

    const[email, setEmail] = React.useState('')
    const [levels, setLevels] = React.useState(0)
    const [users, userState] = React.useState('')
    const [counter, setCounter]= React.useState(0)
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

      let mounted = true; 
      firebase.database().ref(`users/${userId}`)
      .on('value', (user) => {
        if (mounted){
        var level = user.val().fraclevel
        var totallevel = user.val().totallevel
        if (level == 20) {
          alert("Congrats! You've completed this set of questions!")
          navigation.navigate('Dashboard')
        } else {
        setLevels(level)
        setCounter(totallevel)
        console.log(level)
        }
      }
      })
      return () => mounted = false;
    }, [])

    React.useEffect(() => {// rendering of question according to user level 
      let mounted = true; 
      firebase.database().ref(`fractions/${levels}`)
      .on('value', (qn) => {
        if (mounted){
            console.log(qn.val())
            var ans = qn.val().answer
            setAnswer(ans)
            setQuestions({
              answer: qn.val().answer,
              id: qn.val().id, 
              question: qn.val().question
            })
        } 
      })
      return () => mounted = false;
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
      if (correct == true && levels < 20) {
        setLevels(levels + 1)
        firebase.database().ref("users").child(users).child("fraclevel").set(levels + 1) //update of user 4 ops level 
        firebase.database().ref("users").child(users).child("totallevel").set(counter + 1) //update of user total level 
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
        <Text style = {styles.baseText}> Question No: {questionState.id}</Text>
        <Text style = {styles.baseText}> {questionState.question}</Text>

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