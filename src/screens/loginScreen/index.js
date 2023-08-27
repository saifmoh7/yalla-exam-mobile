import React, { useReducer, useState } from 'react'
import { View, Text, SafeAreaView, ToastAndroid } from 'react-native'
import styles from './style';
import FormInput, { Footer, Icon } from '../../components/comp';
import { logIn } from '../../utiles/database';

export default function LoginScreen({navigation}) {

  const [loginOrSignUp, setLoginOrSignUp] = useState("login");
  const [loading, setLoading] = useState(true)

  const [userData, setUserData] = useReducer((prevState, data) => { return { ...prevState, ...data } }, {userName : "",email : "", password : "", confirmPassword : ""});

  const checkUserData = async() => {

    if (loginOrSignUp === "login") {
      if (userData.email.trim().length == 0) {
        ToastAndroid.show('Email Address Is Empty', ToastAndroid.SHORT);
      }
      else if(userData.password.trim().length == 0) {
        ToastAndroid.show('Password Is Empty', ToastAndroid.SHORT);
      }
      else{
        try {
          const data = await logIn(userData.email, userData.password)
          if (data.message != "login success") {
            console.log(data)
          } else {
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            console.log(data.message)
          }
        } catch (error) {
          console.log({error})
        }
      }
    }

    else if (loginOrSignUp === "signup") {
      if (userData.userName.trim().length == 0) {
        ToastAndroid.show('User Name Is Empty', ToastAndroid.SHORT);
      }
      else if (userData.email.trim().length == 0) {
        ToastAndroid.show('Email Address Is Empty', ToastAndroid.SHORT);
      }
      else if(userData.password.trim().length == 0) {
        ToastAndroid.show('Password Is Empty', ToastAndroid.SHORT);
      }
      else if(userData.confirmPassword.trim().length == 0) {
        ToastAndroid.show('Confirm Password Is Empty', ToastAndroid.SHORT);
      }
      else{
        if (userData.password === userData.confirmPassword) {
          console.log("Ok")
        } else {
          ToastAndroid.show('Confirm Password Is Different', ToastAndroid.SHORT);
        }
      }
    }
  }

  return (
    <SafeAreaView style = {{...styles.master}}>
        <View style = {{...styles.headerContainer}}>
            <Text style = {{...styles.appName}}>
                Yalla Exam
            </Text>
        </View>
        <View style = {{...styles.scrollView}}>
        
        <View style = {{...styles.formContainer}}>

          {
            loginOrSignUp === "signup" && 
            <FormInput
              labelText="User Name"
              placeholderText="Enter your User Name"
              onChangeText={value => setUserData({userName: value})}
              value={userData.userName}
              keyboardType= ""
              maxLength = {25}
              signin={true}
            />
          }
          
          <FormInput
              labelText="Email Address"
              placeholderText="Enter your Email Address"
              onChangeText={value => setUserData({email: value})}
              value={userData.email}
              keyboardType= {"email-address"}
              maxLength = {25}
              signin={true}
          />

          <FormInput
              labelText="Password"
              placeholderText="Enter your Password"
              onChangeText={value => setUserData({password: value})}
              value={userData.password}
              keyboardType= {"password"}
              maxLength = {25}
              signin={true}
          />
          {
            loginOrSignUp === "signup" && 
            <FormInput
              labelText="Confirm Password"
              placeholderText="Enter your Password"
              onChangeText={value => setUserData({confirmPassword: value})}
              value={userData.confirmPassword}
              keyboardType= ""
              maxLength = {25}
              signin={true}
            />
          }
          
        </View>     

        <View style = {{...styles.iconsContainer}}>
          <View style = {{...styles.icon}}>
                      <Icon
                      icon = "c-check"
                      size = {60}
                      color = "#E78230"
                      onPress={() => {
                        checkUserData()
                      }}
                  />
          </View>
          { 
            loginOrSignUp === "signup" ? 
            <View style = {{...styles.icon}}>
                      <Icon
                      icon = "login"
                      size = {60}
                      color = "#E78230"
                      onPress={() => {
                        setLoginOrSignUp("login")
                      }}
                  />
           </View> : 
           <View style = {{...styles.icon}}>
                      <Icon
                      icon = "signup"
                      size = {60}
                      color = "#E78230"
                      onPress={() => {
                        setLoginOrSignUp("signup")
                      }}
                  />
           </View>
          }         
        </View>          
      </View>
      <Footer/>
    </SafeAreaView>
  )
}