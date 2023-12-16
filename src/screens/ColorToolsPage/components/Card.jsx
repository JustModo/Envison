import React from 'react'
import { View, Text, Pressable} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Card({ name, icon, onPress }) {

  return (
    <View style={{minHeight:100, width: "100%", borderWidth:2, borderColor:'white', borderRadius:10, justifyContent:'center' }}>
        <Pressable onPress={onPress} style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
            {icon && (<MaterialIcons name={icon} size={50} color="white" />)}
            {name && (<Text style={{color:'white', fontWeight:'bold', fontSize:20}}>{name}</Text>)}
        </Pressable>
    </View>
  )
}
