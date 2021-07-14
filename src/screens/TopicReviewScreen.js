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

export default function TopicReviewScreen({ navigation }) {
    return (
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Choose your topic!</Header>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("ReviewScreen")}
        >
          Four Operations
        </Button>
        <Button
          mode = "outlined"
          onPress = {() => navigation.navigate("FractReviewScreen")}
        >
          Fractions
        </Button>
      </Background>
    )
  }