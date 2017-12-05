import React, {Component} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import FlipCard from 'react-native-flip-card'
import { getDeck, setLocalNotifications, clearLocalNotifications } from '../utils/helpers'


export default class Quiz extends Component{
	constructor(props) {
		super(props);

		this.state = {
			deck: {},
			numOfQuestions: 0,
			question: 1,
			answers: 0,
			showAnswer: false
		}
	}
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    }
  }

  rightAnswer = () =>{
    this.setState({
      answers: this.state.answers + 1,
      question: this.state.question + 1,
      showAnswer: false
    })
  }

  wrongAnswer = () =>{
    this.setState({
      question: this.state.question + 1,
      showAnswer: false
    })
  }

  componentDidMount(){
  	getDeck(this.props.navigation.state.params.title)
		  .then(result => {
		  	this.setState(() => ({
		  		'deck': result,
		  		'numOfQuestions': result.questions.length
		  	}))
		  })
  }
	render(){

  const { numOfQuestions } = this.state

  if(this.state.question <= numOfQuestions){
		return(
			<View style={styles.container}>
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.state.question} / {numOfQuestions}</Text>
      </View>
      {!this.state.showAnswer
        ?
        <View style={styles.group}>
				<Text style={{alignItems: 'center', textAlign: 'center', marginBottom: 25, fontSize: 30, fontWeight: 'bold'}}>{this.state.deck.questions[this.state.question-1].question} </Text>
        <TouchableOpacity
        	style={{marginBottom: 50}}
          onPress={()=>this.setState({
            showAnswer: true
          })}
        >
          <Text style={{color: '#FF0000', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>Answer</Text>
        </TouchableOpacity>
				<TouchableOpacity style={styles.RightBtn}
          onPress={()=>this.rightAnswer()}
        >
					<Text style={styles.RightText}>Correct</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.WrongBtn}
         onPress={()=>this.wrongAnswer()
            
        }
        >
					<Text style={styles.RightText}>Incorrect</Text>
				</TouchableOpacity>

        </View>

         :
         <View style={styles.group}>

          <Text style={{alignItems: 'center', textAlign: 'center', marginBottom: 25, fontSize: 30, fontWeight: 'bold'}}>{this.state.deck.questions[this.state.question-1].answer} </Text>
        <TouchableOpacity
        	style={{marginBottom: 50}}
         	onPress={()=>this.setState({
            showAnswer: false
          })}
        >
          <Text style={{color: '#FF0000', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>Question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.RightBtn}
         onPress={()=>this.correctAnswer()}
         >
          <Text style={styles.RightText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.WrongBtn}
        onPress={()=>this.incorrectAnswer()}
        >
          <Text style={styles.RightText}>Incorrect</Text>
        </TouchableOpacity>

        </View>
         

       }


  
			</View>

			)
	   }
    else{
            clearLocalNotifications()
                .then(setLocalNotifications())
      return(
      <View style={[styles.group, {padding: 20}]}>
        <Text style={{fontSize: 22, textAlign: 'center', marginBottom: 25}}>You got {(this.state.answers/numOfQuestions) * 100}% answers correct.</Text>
         <TouchableOpacity style={styles.Restart}
         onPress={()=>this.props.navigation.navigate('Quiz',
         {title: this.props.navigation.state.params.title})}
         >
          <Text style={styles.blackText}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ReturnToDeck}
        onPress={()=>this.props.navigation.navigate('DeckDetails',
         {title: this.props.navigation.state.params.title})}
        >
          <Text style={styles.RightText}>Return to Deck</Text>
        </TouchableOpacity>

      </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	padding: 20
  },
  group: {
    flex: 1,
    justifyContent: "center"
  },
   RightBtn: {
    backgroundColor: '#008000',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  RightText:{
  	color: '#ffffff',
  },
  blackText:{
    color: '#000000',
  },
  WrongBtn: {
    backgroundColor: '#FF0000',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput:{
  	borderRadius: 5,
  	height: 40,
  },
   Restart:{
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
    marginBottom: 10
  },
  ReturnToDeck:{
    backgroundColor: '#000000',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

