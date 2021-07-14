import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import QuestionScreen from './src/screens/QuestionScreen'
import TreeScreen from './src/screens/Tree'
import ReviewScreen from './src/screens/ReviewScreen'
import TopicScreen from './src/screens/TopicScreen'
import FractScreen from './src/screens/FractScreen'
import FractReviewScreen from './src/screens/FractReviewScreen'
import TopicReviewScreen from './src/screens/TopicReviewScreen'

StatusBar.setBarStyle('light-content')
const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name = "QuestionScreen" component = {QuestionScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name = "TreeScreen" component = {TreeScreen}/>
          <Stack.Screen name = "ReviewScreen" component = {ReviewScreen}/>
          <Stack.Screen name = "TopicScreen" component = {TopicScreen}/>
          <Stack.Screen name = "FractScreen" component = {FractScreen}/>
          <Stack.Screen name = "TopicReviewScreen" component = {TopicReviewScreen}/>
          <Stack.Screen name = "FractReviewScreen" component = {FractReviewScreen}/>
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
