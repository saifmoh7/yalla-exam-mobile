import React, { useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import styles from './style';
import FormInput, { Footer, Icon } from '../../components/comp';

export default function LoginScreen({navigation}) {

  const [userName, setUserName] = useState('');

  return (
    <SafeAreaView style = {{...styles.master}}>
        <View style = {{...styles.headerContainer}}>
            <Text style = {{...styles.appName}}>
                API 653 EXAM APP
            </Text>
        </View>
        <View style = {{...styles.scrollView}}>
        
        <View style = {{...styles.formContainer}}>
          
          <FormInput
              labelText="User Name"
              placeholderText="Enter your User Name"
              onChangeText={value => setUserName(value)}
              value={userName}
              keyboardType= ""
              maxLength = {25}
              signin={true}
          />  
          
        </View>     

        <View style = {{...styles.iconsContainer}}>
          <View style = {{...styles.icon}}>
                      <Icon
                      icon = "c-check"
                      size = {60}
                      color = "#E78230"
                      onPress={() => {
                        checkNoOfQues()
                      }}
                  />
          </View>         
        </View>          
      </View>
      <Footer/>
    </SafeAreaView>
  )
}