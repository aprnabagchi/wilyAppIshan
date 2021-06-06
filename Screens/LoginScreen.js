import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  login=async(email,password)=>{
    if(email && password){
      try{
        const response = await firebase.auth().signInWithEmailAndPassword(email,password)
        if(response){
          this.props.navigation.navigate('TabNavigator')
          alert('login successgul!')
        }
      }
      catch(error){
        switch(error.code){
          case 'auth/user-not-found':
            alert('User does not exist.')
            break
          case 'auth/invalid-email':
            alert('Incorrect email or password.')
            break
        }
      }
    }
    else{
      alert('Enter email and password.')
    }
  }
  render() {
    return (
      <KeyboardAvoidingView style={{ alignItems: 'center', marginTop: 20 }}>
        <ImageBackground source={require('../assets/booklogo.jpg')}>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.loginText}>username: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="abc@example.com"
              placeholderTextColor='#Ff00F8'
              keyboardType="email-adress"
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            /> 
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.loginText}>password: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="type your password"
              placeholderTextColor='#Ff00F8'
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={()=>{
              this.login(this.state.email,this.state.password)
            }}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    width: 200,
    height: 40,
    borderWidth: 1.5,
    fontSize: 15,
    fontWeight:'bold',
    margin: 20,
  },
  loginText:{
    fontSize:18,
    alignSelf:'center'
  },
  loginButton:{
    height:40,
    width:'40%',
    backgroundColor:'#00C1C1',
    alignSelf:'center'
  }
});
