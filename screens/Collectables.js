import React, { useState, useRef } from 'react'
import { StyleSheet, View, Animated} from 'react-native'
import Button from '../components/Button'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import firebase from '../../database/firebase.js';
import '@firebase/storage';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper'


export default function CollectableScreen({navigation}){
    var storage = firebase.storage();
    const [level, setLevel] = useState(0);
    const [imageUrl, setImageUrl] = useState(undefined);
    //const [collectableLevel, setCollectableLevel] = useState(0);
    const[levelCounter , setLevelCounter] = useState(0)
    var userId = firebase.auth().currentUser.uid; 
    

    /*const url = [
        {id: 1, link: storage.ref('animations/animation1.json')},
        {id: 2, link: storage.ref('animations/animation2.json')},
        {id: 3, link: storage.ref('animations/animation3.json')},
        {id: 4, link: storage.ref('animations/animation4.json')},
        {id: 5, link: storage.ref('animations/animation5.json')},
        {id: 6, link: storage.ref('animations/animation6.json')},
        {id: 7, link: storage.ref('animations/animation7.json')},
        {id: 8, link: storage.ref('animations/animation8.json')}

    ]

    const displayAnimations = []; */

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

    const levelA = Math.floor(level/5) + 1;
    

    React.useEffect(() => {
      setLevelCounter(levelA)
      console.log(levelCounter)
       storage
      .ref('animations/' + 'animation' + levelCounter + '.json') 
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  }, [levelCounter]);

    
  const onNextPressed = () => {
    if (levelCounter < level - 1){
      setLevelCounter(levelCounter + 1)
  }
  else if (levelCounter == 9){
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
      fontFamily: "Cochin",
      fontSize: 19
    },
    questionText: {
      fontFamily: "Cochin",
      fontSize: 25
    }
  });



    /*const getAnimations = () => {
        for (var i = 0; i < conllectableLevel; i++){
            displayAnimations.push(url[i])
        }
    }

    getAnimations();*/

return (
  <Background>
    <BackButton goBack={navigation.goBack} />  
        <View>
            <Text style = {styles.baseText}>A Collectable is obtained once every 5 levels, here are yours!</Text>
            <LottieView source = {{uri: imageUrl}}   autoPlay 
                        loop 
                        style={{
                        width:200,
                        height: 200,
                        marginBottom: 30}}/>
          <Button mode = "contained" onPress ={onNextPressed}>
            Next
          </Button>
          <Button mode = "contained" onPress ={onPreviousPressed}>
            Previous
          </Button>
        </View>
  </Background>
);


}