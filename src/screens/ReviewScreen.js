import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
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
import { event } from 'react-native-reanimated'

export default function ReviewScreen({navigation}){
    const[levelCounter , setLevelCounter] = useState(0)
    const [level, setLevel] = useState(0)
    const [answer, setAnswer] = useState('')
    const [questionState, setQuestions] = useState({
        answer: '', 
        id: '', 
        question:''
      })
    const user = firebase.auth().currentUser
    console.log(user.uid)
    console.log(level)


    useEffect(() => {
  
        firebase.database().ref(`users/${user.uid}`)
        .on('value', (user) => {
          var level = user.val().level
          setLevel(level)
          console.log(level)
        })
  
      }, [user.uid])




    useEffect(() => {// rendering of question according to user level 

        firebase.database().ref(`questions/${levelCounter}`)
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
  
      }, [levelCounter])

      const onNextPressed = () => {
          if (levelCounter < level){
              setLevelCounter(levelCounter + 1)
          }
          else {
              alert("Complete the next question first!")
          }

      }

      const onPreviousPressed = () =>{
          if(levelCounter == 0 ){
              alert("Can't go back further!")
          }
          else{
              setLevelCounter(levelCounter - 1)
          }
      }

      const styles = StyleSheet.create({
        baseText: {
          fontFamily: "Cochin",
          fontSize: 19
        },
        questionText: {
          fontFamily: "Cochin",
          fontSize: 25
        }
      });

      return(
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Header>Questions</Header>
          <Text style = {styles.baseText}>Level: {levelCounter} </Text>
          <Text style = {styles.baseText}>Question No: {questionState.id}</Text>
          <Text style = {styles.baseText}>Question: {questionState.question}</Text>
          <Text style = {styles.baseText}>Answer: {questionState.answer}</Text>
  
          <Button mode = "contained" onPress ={onNextPressed}>
            Next
          </Button>
          <Button mode = "contained" onPress ={onPreviousPressed}>
            Previous
          </Button>

        </Background>
      )
  



}