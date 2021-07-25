import React from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import firebase from '../../database/firebase.js';

export default function TopicScreen({ navigation }) {
    return (
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Choose your topic!</Header>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("QuestionScreen")}
        >
          Four Operations
        </Button>
        <Button
          mode = "outlined"
          onPress = {() => navigation.navigate("FractScreen")}
        >
          Fractions
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("DecScreen")}
        >
          Decimals
        </Button>
      </Background>
    )
  }
  