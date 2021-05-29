import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
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

export default function TreeScreen({navigation}){
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Image source={require('../assets/sapling.png')} style={styles.image} />
            
        </Background>
    )

}

const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      marginBottom: 8,
    },
  })
  