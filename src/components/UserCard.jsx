import { StyleSheet, View, Text, Image } from 'react-native'
const logo = require('../../assets/placeholder.jpg')

export default function UserCard ({ name, font }) {


  return (
    <View style={style.container}>
        <Image source={logo} style={style.image}></Image>
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <Text style={[style.text, { fontSize: 25 }]}>{name}</Text>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff'
  },
  image: {
    height: 100, width: 100, borderRadius: 100, borderWidth: 3, borderColor: '#ffffff'
  },
  text: {
    color: '#ffffff', paddingStart: 30, fontWeight: 'bold'
  }

})
