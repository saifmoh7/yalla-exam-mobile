import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style';
import { getExamsList } from '../../utiles/database';
import { Footer, Icon } from '../../components/comp';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExamsScreen({navigation, route}) {

  // const userData = route.params.userData || "";
  // console.log(userData)

  const [allExames, setAllExames] = useState([])
  const [loading, setLoading] = useState(false)
  const [showDes, setShowDes] = useState([])
  const [online, setOnline] = useState(false)
  const [guest, setGuest] = useState(true)
  const [userName, setUserName] = useState("")

  let {'width':sw} = Dimensions.get('screen')


  const getExams = async() => {

    setLoading(true);
    try {
      const examsList = await getExamsList()

      let tempExams = [];

      await examsList.exams.forEach(async exam => {
        tempExams.push({...exam});
      });
      if (tempExams) {
        setAllExames([...tempExams]);
        setOnline(true)
        await AsyncStorage.setItem('exams', JSON.stringify([...tempExams]))
        // console.log(allExames)
      } else {
        console.log("not found")
        setOnline(false)
      }
      setLoading(false);
      
    } catch (error) {
      console.log(error)
      try {
        setOnline(false)
        const examData = await AsyncStorage.getItem('exams')
        if (examData !== null) {
          let data = JSON.parse(examData)
          setAllExames(data)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }
  }

  const showAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'ok',
        onPress: async() => {
          await AsyncStorage.removeItem('userData');
        }
        // style: 'ok',
      },
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        // style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

  const checkUserName = async() => {

    const value = await AsyncStorage.getItem('userData');
    if (value !== null && value !== "guest") {
      const data = JSON.parse(value)
      console.log(data.userName);
      setGuest(false)
      setUserName(data.userName)
    }
    else{
      console.log(value)
      setGuest(true)
      setUserName(value)
    }
    
    getExams()

  }

  useEffect(() => {
    checkUserName()
  },[])


  return (
    <SafeAreaView style = {{...styles.master}}>
      <View style = {{...styles.headerContainer}}>
        <View>
            <Text style = {{...styles.appName}}>
                API 653 EXAM APP
            </Text>
        </View>
      </View>
      <View style = {{...styles.master1}}>

        <View style = {{...styles.userNameView}}>
          <Text style = {{...styles.userName}}>
              Welcome {userName}
          </Text>
          <Text style = {{...styles.userName}}>
              {online ? `online` : `offline`}
          </Text>
        </View>
        
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate({name : 'ScoresScreen'});
            showAlert()
            
          }}
        >
          <View style = {{...styles.scoreContainer}}>
            <View style = {{...styles.score}}>
              <Text style = {{...styles.fontScore}}>High Score</Text>
              <Text style = {{...styles.fontScore}}>100%</Text>
            </View>
            <View style = {{...styles.line}}></View>
            <View style = {{...styles.score}}>
              <Text style = {{...styles.fontScore}}>Latest Score</Text>
              <Text style = {{...styles.fontScore}}>100%</Text>
            </View>
          </View>
        </TouchableOpacity>

        <FlatList
          data = {allExames}
          onRefresh = {getExams}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          style = {{...styles.examsContainer}}
          renderItem = {({item: exam}) => (
            <TouchableOpacity
              // onPress={() => {
              //   SelectedExam(exam._id, exam.noQues, exam.examTitel)
              // }}
              style = {{...styles.tExamContainer}}
            >
              <View style = {{...styles.examContainer}}>
                <Image
                      source = {{uri: exam.examImageUrl}}
                      style = {{width : sw*60/411.4, height : sw*60/411.4, borderRadius : sw*15/411.4, backgroundColor: '#ffffff'}}
                />
                <View style = {{...styles.examDescription}}>
                  <Text style = {{fontSize: sw*16/411.4, color: '#ffffff'}}>{exam.examTitel}</Text>
                  {showDes.includes(exam._id) ? <Text style = {{fontSize: sw*10/411.4, color: '#ffffff', marginLeft: sw*4/411.4}}>{exam.examDes}</Text> : <React.Fragment></React.Fragment>}
                </View>
                <Icon
                      icon = "detail"
                      size = {35}
                      color = "#ffffff"
                      onPress = {() => {
                        if (showDes.includes(exam._id)) {
                          setShowDes(showDes.filter(id => id != exam._id))
                        }else{
                          setShowDes([...showDes,exam._id])
                        }
                      }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Footer/>
      
    </SafeAreaView>
  )
}