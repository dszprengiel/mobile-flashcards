import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/helpers';
import DeckItem from './DeckItem';


export default class ListDecks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			decks: ''
		}
	}

  componentDidMount() {
    getDecks()
		  .then(result => {
		  	this.setState(() => ({
		  		'decks': result
		  	}))
		  })

  }
    componentWillUpdate() {
      getDecks()
        .then(result => {
          this.setState(() => ({
            'decks': result
          }))
        })

    }

  render() {
    const decks = this.state.decks
    const titles = Object.keys(decks || {});
  


    if (!decks) {
      return (
        <View style={styles.container}>
         <Text style={{fontSize: 25}}>No decks yet</Text>
        </View>
      );
    }
    return (
      <ScrollView style={{flex: 1, padding: 20}}>
        {titles.map(i =>(
        <DeckItem key={i} title={i} numOfCards={decks[i].questions.length} navigation={this.props.navigation}/>
    	))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		paddingVertical: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
})



