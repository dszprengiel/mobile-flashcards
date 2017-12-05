import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default class DeckItem extends Component {
    render() {
        return (
            <View style={styles.container}>
	            <TouchableOpacity key={this.props.title}
	                onPress={() => this.props.navigation.navigate(
	                            'DeckDetails',
	                            { title: this.props.title,
	                            numOfCards: this.props.numOfCards },
	                        )}>
	                <View>
	                    <Text style={{fontSize: 22}}>{this.props.title}</Text>
	                    <Text style={{fontSize: 16}}>{this.props.numOfCards} {this.props.numOfCards == 1 ? 'card' : 'cards'}</Text>
	                </View>
	            </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1
     },
  })