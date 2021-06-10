import React, { useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, View, RecyclerViewBackedScrollView } from 'react-native'
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
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [userAnswer, setUserAnswer] = useState("")
    const [textInput, setTextInput] = useState("")
    const user = firebase.auth().currentUser;  
   // console.log(user.uid)
    const questionsArray = []
    const answersArray = []



  /*  const getQuestion = () => {
      const users =  firebase.database().ref("users")
      users.on("value", (snapshot) => {
        const level = snapshot.child(user.uid).child("level").val()
        setQuestion(questionsArray[level - 1])
      })
    }

    const getAnswer = () => {
      const users = firebase.database().ref("users")
      users.on("value", (snapshot) => {
        const level = snapshot.child(user.uid).child("level").val()
        setAnswer(answersArray[level - 1])
      })
    } */


    const getQuestion = async() => {
      return await firebase.database().ref("users").get()
      .then(function(snapshot){
        const level = snapshot.child(user.uid).child("level").val()
        return questionsArray[level - 1]
      }).then(value => {
         setQuestion(value)
        })
     
    }

    const getAnswer = async() => {
      return await firebase.database().ref("users").get()
      .then(function(snapshot){
        const level = snapshot.child(user.uid).child("level").val()
        return answersArray[level - 1]
      }).then(value => {
        setAnswer(value)
      })
     
    } 


    const populateQuestions = async() => {
      const questions = await firebase.database().ref(`questions`).once("value").then(function(snapshot){
        snapshot.forEach(child => {
        questionsArray.push(child.child("question").val())
        }
      )
      //return questionsArray[getUserLevel()]
      }
      )
  
    }

    const populateAnswers = async() => {
      const questions = await firebase.database().ref(`questions`).once("value").then(function(snapshot){
        snapshot.forEach(child => {
        answersArray.push(child.child("answer").val())
        }
      )
      //return answersArray[getUserLevel()]
      }
      )
    }

    const updateLevel = async() => {
      return await firebase.database().ref("users").get()
      .then(function(snapshot){
        const level = snapshot.child(user.uid).child("level").val()
        const newLevel = level + 1
        firebase.database().ref("users").child(user.uid).child("level").set(newLevel)
      })
      
    }

    const answerValidator = (text) => {
      if (text == answer){
        alert("correct!")
        return true
      }
      else{
        alert("Wrong answer!")
        return false
      }
    }

    const onSubmitPressed = () => {
      const correct = answerValidator(userAnswer)
      if (correct == true) {
        updateLevel()
      }
      setUserAnswer("")
    }

    const clearText = (val) =>{
      setTextInput('');
  }


    populateQuestions()
    populateAnswers()
    getQuestion()
    getAnswer()
    
    
  
   
    return(
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Header>Questions</Header>
        <Text>{question}</Text>
        <TextInput
        label = "Answer"
        onChangeText = {(text) => setUserAnswer(text)}
        
        />
        <Button mode = "contained" onPress ={onSubmitPressed}>
          Submit
        </Button>

        
      </Background>
    )
}