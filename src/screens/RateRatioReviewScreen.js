import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import firebase from '../../database/firebase.js';

export default function RateRatioReviewScreen({navigation}){
    const[levelCounter , setLevelCounter] = useState(0)
    const [level, setLevel] = useState(0)
    const [answer, setAnswer] = useState('')
    const [questionState, setQuestions] = useState({
        answer: '', 
        id: '', 
        question:'', 
        method: ''
      })
    const user = firebase.auth().currentUser
    console.log(level)

    useEffect(() => { 
      let mounted = true; 
        firebase.database().ref(`users/${user.uid}`)
        .on('value', (user) => {
          if (mounted){
          var level = user.val().rlevel
          setLevel(level)
          console.log(level)
        }
      })
      return () => mounted = false;
      }, [user.uid])

    useEffect(() => {// rendering of question according to user level 
        let mounted = true; 
        firebase.database().ref(`rateandratio/${levelCounter}`)
        .on('value', (qn) => {
          if (mounted){
          console.log(qn.val())
          var ans = qn.val().answer
          setAnswer(ans)
          setQuestions({
            answer: qn.val().answer,
            id: qn.val().id, 
            question: qn.val().question, 
            method: qn.val().method
          })
        }
      })
      return () => mounted = false;
      }, [levelCounter])

      const onNextPressed = () => {
        if (levelCounter < level - 1){
          setLevelCounter(levelCounter + 1)
      }
      else if (levelCounter == 19){
          alert("You've reached the end!")
      } else {
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
          fontFamily: "sans-serif-light",
          fontSize: 19, 
          alignItems: 'center'
        },
        questionText: {
            fontFamily: "sans-serif-light",
            fontSize: 19,
            fontWeight: "bold"
          }
      });

      return(
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Header>Rate and Ratio</Header>
          <Text style = {styles.questionText}>Question {questionState.id} </Text>
          <Text style = {styles.baseText}>{questionState.question}</Text>
          <Text style = {styles.baseText}>Answer: {questionState.answer}</Text>
          <Text style = {styles.baseText}>{questionState.method}</Text>

          <Button mode = "contained" onPress ={onNextPressed}>
            Next
          </Button>
          <Button mode = "contained" onPress ={onPreviousPressed}>
            Previous
          </Button>

        </Background>
      )


}