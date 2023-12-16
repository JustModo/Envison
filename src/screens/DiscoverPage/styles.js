import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    position: 'relative',
    rowGap: 10
  },
  container:{
    width:'90%',
    flex: 1, 
    backgroundColor:'transparent', 
    flexDirection:'column', 
    padding:20, 
    borderRadius:20, 
    borderWidth:2, 
    borderColor:'#ffffff',
    marginBottom: 70
  }
});