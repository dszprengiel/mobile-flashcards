import React, {Component} from 'react'
import { View, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { addCardToDeck } from '../utils/helpers'


export default class AddCard extends Component{
   state={
    question: '',
    answer: ''
  }

  handleSubmit = () =>{
    addCardToDeck(this.props.navigation.state.params.title, {question: this.state.question, answer: this.state.answer}).then(()=>{
    this.props.navigation.navigate(
            'DeckDetails',
            {title: this.props.navigation.state.params.title}
        )})
  }

	render(){
		return(
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<Text style={{fontSize: 22}}>Enter your question and answer below</Text>
				<TextInput style={styles.TextInput} 
          onChangeText={(text) => this.setState({question: text})}
          placeholder="Enter Your Question"/>
        <TextInput style={styles.TextInput} 
          onChangeText={(text) => this.setState({answer: text})}
          placeholder="Enter Your Answer"/>
				<TouchableOpacity style={styles.SubmitBtn}
        onPress={()=>this.handleSubmit()}
        >
					<Text style={styles.SubmitText} >Submit</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
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
   SubmitBtn: {
    backgroundColor: '#000000',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 6,
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
  	width: 280
  }
})