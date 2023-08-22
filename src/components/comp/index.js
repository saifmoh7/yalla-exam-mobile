import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import styles from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
  faArrowLeft, 
  faBars, 
  faCheck, 
  faCircleCheck, 
  faCircleInfo, 
  faCircleQuestion, 
  faHouse,
  faReply, 
  faXmark,
  faRightToBracket,
  faUserPlus,
  faSignIn,
  faSignOut,
  faHome,
  faTrashCan,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';

export function Footer() {

  let {'width':sw} = Dimensions.get('screen')

  return (
    <View style= {{...styles.footerContainer}}>
        <Text style = {{fontSize: sw*15/411.4, color: '#ffffff'}}>To Connect examsapp@saif7.com</Text>
    </View>
  )
}


export const Icon = (props) => {
   const icons = {
       'login' : faRightToBracket,
       'arrow-back' : faArrowLeft,
       'close' : faXmark,
       'check' : faCheck,
       'c-check' : faCircleCheck,
       'replay' : faReply,
       'home' : faHouse,
       'menu' : faBars,
       'detail' : faCircleInfo,
       'signup' : faUserPlus,
       'signin' : faSignIn,
       'signout' : faSignOut,
       'circle-question':faCircleQuestion,
       'home' : faHome,
       'upgrade' : faUpload,
       'delete' : faTrashCan
   }
   let { icon , ...attr } = props
  return <TouchableOpacity onPress={typeof props.onPress === 'function' ? props.onPress : () => {}}>
    <FontAwesomeIcon icon={icons[icon]||icons['circle-question']}  { ...attr } />
  </TouchableOpacity>
}

