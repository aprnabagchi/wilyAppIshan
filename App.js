import React, { Component } from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import BookTransaction from './Screens/BookTransactionScreen';
import SearchScreen from './Screens/SearchScreen';
import Login from './Screens/LoginScreen';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Transaction: { screen: BookTransaction },
    Search: { screen: SearchScreen },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName
        
        if(routeName === 'Transaction'){
          return (
            <Image source = {require('./assets/book.png')} style={{alignSelf:'center',width:30,height:30}} />
          )
        } 
        else if(routeName==='Search'){
          return(
            <Image source = {require('./assets/searchingbook.png')} style={{alignSelf:'center',width:30,height:30}} />
          )
        }
      },
    }),
  }
);

const switch_nav = createSwitchNavigator({
  LoginScreen:{screen:Login},
  TabNavigator:{screen:TabNavigator}
})

const AppContainer = createAppContainer(switch_nav);
