import React, { useState, useRef } from 'react'
import { StyleSheet, View, Animated} from 'react-native'
import Button from '../components/Button'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import firebase from '../../database/firebase.js';
import '@firebase/storage';
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler'



export default function CollectableScreen({navigation}){
    var storage = firebase.storage();
    const [level, setLevel] = useState(0);
    const [imageUrl, setImageUrl] = useState(undefined);
    var userId = firebase.auth().currentUser.uid; 
    

    const url = [
        {id: 1, link: storage.ref('animations/animation1.json')},
        {id: 2, link: storage.ref('animations/animation2.json')},
        {id: 3, link: storage.ref('animations/animation3.json')},
        {id: 4, link: storage.ref('animations/animation4.json')},
        {id: 5, link: storage.ref('animations/animation5.json')},
        {id: 6, link: storage.ref('animations/animation6.json')},
        {id: 7, link: storage.ref('animations/animation7.json')},
        {id: 8, link: storage.ref('animations/animation8.json')}

    ]

    const displayAnimations = [];

    React.useEffect(() => { 
      let mounted = true; 
      firebase.database().ref(`users/${userId}`)
      .on('value', (user) => {
        if (mounted){
        var level = user.val().totallevel
        setLevel(level)
        }
      })
    return () => mounted = false;
    }, [])

    const conllectableLevel = Math.floor(level/5) + 1;

    const getAnimations = () => {
        for (var i = 0; i < conllectableLevel; i++){
            displayAnimations.push(url[i])
        }
    }

    getAnimations();

return (
  <Background>
    <ScrollView>
    <BackButton goBack={navigation.goBack} />  
        <View>
            <Text>A Collectable is obtained once every 5 levels, here are yours!</Text>
                {displayAnimations.map((id, link) => {
                    return <LottieView source = {{displayAnimations: displayAnimations.link}} key = {id}/>
                })}
        </View>
        </ScrollView>
  </Background>
);


}