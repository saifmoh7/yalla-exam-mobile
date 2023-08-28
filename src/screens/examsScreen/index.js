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

  let {'width':sw} = Dimensions.get('screen')


  const getExams = async() => {
    const value = await AsyncStorage.getItem('userData');
    if (value !== null || value === "guset") {
      const data = JSON.parse(value)
      console.log(data.userName);
    }
    else{
      console.log(value)
    }

    setLoading(true);
    try {
      const examsList = await getExamsList()
      // console.log({examsList})
      let tempExams = [];

      try {
        await examsList.exams.forEach(async exam => {
          tempExams.push({...exam});
        });
      } catch (error) {
        console.log(error)
      }

      if (tempExams) {
        setAllExames([...tempExams]);
        // console.log(allExames)
      } else {console.log("not found")}
      setLoading(false);
    } catch (error) {
      console.log(error)
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
        onPress: () => Alert.alert('Cancel Pressed'),
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