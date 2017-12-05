import React, {Component} from 'react'
import { View, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { saveDeckTitle } from '../utils/helpers'

export default class AddDeck extends Component{
	state={
		title: ''
	}

  handleSubmit = title => {
  	saveDeckTitle(title).then(() => {
  		this.props.navigation.navigate('DeckDetails',
  			{ title: this.state.title,
  		    numOfCards: 0 
  		 	},
  		);
  		this.setState(() => ({
  		  title: '',
  		}));
  	})
  }

	render(){
		return(
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<Text style={{fontSize: 45, textAlign: 'center'}}>What is the title of your new deck?</Text>
				<TextInput style={styles.TextInput}
					onChangeText={(text) => this.setState({title: text})}
					value={this.state.title}
				/>
				<TouchableOpacity style={styles.SubmitBtn}
					onPress={()=>this.handleSubmit(this.state.title)}>
					<Text style={styles.SubmitText}>Submit</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}


}


const styles = StyleSheet.create({
  container: {
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20
  },
   SubmitBtn: {
    backgroundColor: '#000000',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 65,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmitText:{
  	color: '#ffffff',
  },
  TextInput:{
  	borderRadius: 5,
  	height: 60,
  	borderColor: 'gray',
  	borderWidth: 1,
  	marginTop: 25,
  	marginBottom: 25,
  	paddingLeft: 10,
  	paddingRight: 10,

  }
})
