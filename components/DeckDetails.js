import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { getDeck } from '../utils/helpers';

export default class DeckDetails extends Component{
	constructor(props) {
		super(props);

		this.state = {
			currentDeck: '',
			numOfQuestions: 0
		}
	}
	static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    }
  }

  componentDidMount(){
  	getDeck(this.props.navigation.state.params.title)
		  .then(result => {
		  	this.setState(() => ({
		  		'currentDeck': result,
		  		'numOfQuestions': result.questions.length
		  	}))
		  })
  }

	render(){
		 const {title} = this.state.currentDeck
		 const {numOfQuestions} = this.state

		return(
			
			<View style={styles.container}>
				<Text style={{fontSize: 30, marginBottom: 15}}> {title} </Text>
				<Text style={{fontSize: 22, color: 'gray', marginBottom: 25}}> {numOfQuestions} {numOfQuestions == 1 ? 'card' : 'cards'}</Text>
				<TouchableOpacity style={styles.AddCardBtn}
				 onPress={() => this.props.navigation.navigate(
              		'AddCard',
              		{title}	
           	 		)}
				>
					<Text style={styles.AddCardText}>Create New Question</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.StartQuizBtn}
				 onPress={() => this.props.navigation.navigate(
              		'Quiz',	
              		{title}
           	 		)}>
					<Text style={styles.StartQuizText}>Start Quiz</Text>
				</TouchableOpacity>
			</View>

			)
	}


}


const styles = StyleSheet.create({
  container: {
  	flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    padding: 20
  },
   StartQuizBtn: {
    backgroundColor: '#000000',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 220
  },
  StartQuizText:{
  	color: '#ffffff',
  },
  AddCardBtn: {
    backgroundColor: '#ffffff',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderWidth: 3,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width:220,
    marginBottom: 15
  },
  AddCardText:{
  	color: '#000000',
  },
  TextInput:{
  	borderRadius: 5,
  	height: 40,
  }
})