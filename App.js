import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import { Constants } from 'expo';
import { Entypo } from '@expo/vector-icons'
import { setLocalNotifications } from './utils/helpers'
import ListDecks from './components/ListDecks'
import AddDeck from './components/AddDeck'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const TabsNavigation = TabNavigator({
  ListDecks:{
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: 'Decks',
       tabBarIcon: ({ tintColor }) => <Entypo name='list' size={30} color={tintColor} />
    }
  },
  AddDeck:{
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Create a New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
    }
  },
 
},
 {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#474954' : '#7CDEDC',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? '#7CDEDC' : '#474954',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigation = StackNavigator({
  Home: {
    screen: TabsNavigation,
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
       headerTintColor: "#ffffff",
      headerStyle: {
        backgroundColor: '#000000',
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: "#ffffff",
      title: "Add a New Card",
      alignItem: 'center',
      headerStyle: {
        backgroundColor: '#000000',
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
       headerTintColor: "#ffffff",
      headerStyle: {
        backgroundColor: '#000000',
      }
    }
  },
})

export default class App extends Component {
  componentDidMount(){
    setLocalNotifications()
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <FlashCardsStatusBar />
        <MainNavigation />
      </View>
    );
  }
}