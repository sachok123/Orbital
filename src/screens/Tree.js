import React, { useState, useRef } from 'react'
import { StyleSheet, View, Animated} from 'react-native'
import Header from '../components/Header'
import Button from '../components/Button'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import firebase from '../../database/firebase.js';
import '@firebase/storage';


export default function TreeScreen({navigation}){

    const [imageUrl, setImageUrl] = useState(undefined);
    const [level, setLevel] = useState(0);

    var userId = firebase.auth().currentUser.uid; 

    React.useEffect(() => {// rendering of question according to user level 
      let mounted = true; 
      firebase.database().ref(`users/${userId}`)
      .on('value', (user) => {
        if (mounted){
        var level = user.val().totallevel
        setLevel(level)
        //console.log(level)
        }
      })
      return () => mounted = false;
    }, [])

    React.useEffect(() => {
      let mounted = true; 
      firebase.storage()
      .ref('/' + 'level' + level + '.png') 
      .getDownloadURL()
      .then((url) => {
        if (mounted){
        setImageUrl(url);
        console.log(level)
        }
      })
      .catch((e) => console.log('Errors while downloading => ', e));
      return () => mounted = false;
  }, [level]);

    const jumpValue = new Animated.Value(0);
    const ActiveAnim = () => {
      Animated.spring(jumpValue, {
        toValue: 1,
        friction: 1,
        useNativeDriver: true
      }).start(() => jumpValue.setValue(0));
    };

  
  
return (
  <Background>
  <BackButton goBack={navigation.goBack} />
  <Header> Level {level}</Header>
  <View>
  <Animated.Image
        style={{ transform: [{ scale: jumpValue }], width: 200, height: 200, marginBottom: 30 }}
        source={{uri: imageUrl}} >
  </Animated.Image>
  <Button
        mode="outlined"
        style={{ alignItems : 'center', justifyContent : 'center'}}
        onPress={ActiveAnim}>
          See Your Tree!
        </Button>
    </View>
  </Background>
);
}


  