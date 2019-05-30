import React from "react";
import { StyleSheet } from "react-native";
var Dimensions = require("Dimensions");
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    flexDirection:"column",
    // justifyContent: "flex-end",
    justifyContent: "space-between",

    backgroundColor: "#249bbf"
  },
  containerLogout: {
    flex: 1,
    flexDirection:"column",
    // justifyContent: "flex-end",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
     
  },
  contact: {
    flex: 1,
    backgroundColor: "#F8F8FF"
  },
  color: {
    color: "#000000"
  },
  color1: {
    color: "#249bbf",
    paddingBottom: -6,
    paddingTop: 5
  },
  logo: {
    width: 180,
    height: 160,
    marginTop: 15
  },
  logoAndroid:{
    width: 150,
    height: 130,
    marginTop: 15
  },
  logoMain: {
    width: 250,
    height: 250,
    marginBottom: 150,    
    


  },
  logoPaws: {
    width: 300,
    height: 300,
    marginTop: 50,
    marginLeft: -40
  },
  messages: {
    width: 28,
    height: 24,
    marginLeft: 70,
    marginTop: 11
  },
  profile: {
    width: 35,
    height: 35,
    marginRight: 70,
    marginTop: 10
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  center1: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    top: 30
  },
  center2: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    borderWidth: 2,
    borderColor: '#249bbf',
    backgroundColor: "#fff",
    alignSelf:"center"
  },
  imgLogout: {
    overflow: "hidden",
    textAlign: "center",
    width: deviceWidth / 2.2,
    height: 50,
    borderRadius: 25,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#fff",
    alignSelf:"center",
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: "normal",
    color: '#249bbf',
    textAlignVertical: "center",
    padding: 14,

  },
  imgDelete: {
    overflow: "hidden",
    textAlign: "center",
    width: deviceWidth/2.2,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#fff",
    alignSelf:"center",
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: "normal",
    color: '#249bbf',
    textAlignVertical: "center",
    padding: 14,

  },
  img1: {
    borderWidth: 2,
    borderColor: '#249bbf',
    width: 90,
    height: 90,
    borderRadius: 45,
    margin: 10,
    backgroundColor: "#fff"
  },
  imgRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 2
  },
   imgRowProfile: {
    
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"

  },
  logoutDeleteButtons: {
    
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"

  },
  report: {
    margin: 5,
    position: "absolute",
    top: 0,
    right: 0,
    width: 25,
    height: 25,
    color: "#fff"
  },
  
  textInput: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: "#fff",
    minHeight: 100,
    borderColor: "#F0F0F0",
    borderWidth: 1,
    width: deviceWidth - 27,
    borderRadius: 22,
    marginBottom: 50,
    overflow: "hidden",
    marginBottom: 30,
    maxHeight: 200,
    fontSize: 16,
    numberOfLines: 10,
  },
  textInputAndroid: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: "#fff",
    borderColor: "#F0F0F0",
    borderWidth: 1,
    width: deviceWidth - 27,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 30,
    fontSize: 16,
  },
  bold: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: '#249bbf',
  },
  aboutBold: {
    paddingTop: 20,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: '#249bbf',
  },
  boldCards: {
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -1, height: 1},
         textShadowRadius: 10,
  },
  aboutMeCards: {
    padding: 10,
    fontSize: 18,
    fontWeight: "normal",
    color: '#fff',
         textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -1, height: 1},
         textShadowRadius: 10,
  },
  interestText: {
    padding: 10,
    fontSize: 18,
    fontWeight: "normal"
  },
  bold1: {
    padding: 10,
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  button: {
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    margin: 15,
    fontSize: 18,
    fontWeight: "normal",
    color: "#249bbf"
  },
  buttonShadows: {
    shadowColor: '#02457a',
    shadowOpacity: 0.2,
    shadowRadius: 7 ,
    shadowOffset : { width: 1, height: 1},
  },
  logoutButton: {
    borderRadius: 25,
    height: 50,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#249bbf",
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 15,
    margin: 11,
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: "bold",
    color: "#249bbf",
    borderWidth: 1,
    //marginBottom: 30,
    textAlignVertical: "center",
    marginTop: 50,
    
  },
  deleteAccount: {
    borderRadius: 25,
    height: 50,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    margin: 11,
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: "bold",
    color: "#d8d8d8",
   
    //marginBottom: 30,
    textAlignVertical: "center",
    marginTop: 50,
  },
  admin: {
    height: 50,
    overflow: "hidden",
    textAlign: "center",   
    padding: 15,
    margin: 11,
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
    //marginBottom: 30,
    textAlignVertical: "center",
    marginTop: 1,
  },
  contactButtons: {
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: 'white',
    height: 45,
    overflow: "hidden",
    textAlign: "center",   
    margin: 11,
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: "normal",
    color: '#02457a',
    //marginBottom: 30,
    textAlignVertical: "center",
    padding: 10,
    
  },
  logInbutton: {
    borderRadius: 25,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "#fff",
    textAlign: "center",
    color: "#249bbf",
    padding: 15,
    width: deviceWidth - 20,

    margin: 11,
    
   

    backgroundColor: "#FFFFFF",
    fontWeight: "bold"
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
   card: {
    width: deviceWidth - 15,
    height: deviceHeight -125,
    top: 1,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    overflow: "hidden"
    // top: -100,
  },
  cardsNo: {
    top: 7,
    resizeMode: 'contain',
    width: deviceWidth,
    height: deviceHeight -120,
    top: 7,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    overflow: "hidden"
   
    // top: -100,
  },
  iconStylez: {
    width: deviceWidth - 1000,
    height: 30
  },
  cardDescription: {
    padding: 10,
    justifyContent: "flex-end",
    flex: 1
  },
  cardInfo: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    color: "#fff"
  },
  border: {
    //borderTopColor: '#bbb',
    //borderTopWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 0.5
  }

});

module.exports = styles;
