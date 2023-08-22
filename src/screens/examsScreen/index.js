import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getExamsList } from '../../utiles/database';
import { Icon } from '../../components/comp';

export default function ExamsScreen({navigation}) {

  const [allExames, setAllExames] = useState([])
  const [loading, setLoading] = useState(false)
  const [showDes, setShowDes] = useState([])
  const [online, setOnline] = useState(false)

  let {'width':sw} = Dimensions.get('screen')


  const getExams = async() => {

    setLoading(true);
    try {
      const examsList = await getExamsList()
      console.log({examsList})
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
        console.log(allExames)
      } else {console.log("not found")}
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }


  const checkUserName = async() => {

      getExams()

  }

  useEffect(() => {
    checkUserName()
  },[])


  return (
    <View>
      <Text></Text>
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
                        source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
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
  )
}