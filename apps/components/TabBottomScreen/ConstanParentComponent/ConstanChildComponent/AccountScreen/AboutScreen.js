'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Image, Text, StatusBar } from 'react-native';

export default class AboutScreen extends Component {

	render() {
		return (
			<View style={styles.container}>
			<StatusBar backgroundColor="#ebebeb" barStyle="light-content" />
				<Text style={styles.textName}>X-Metrik</Text>
					<Text style={styles.textVersion}>Versi App 1.20.13</Text>
						<Image source={require('../../../../../assets/images/account/profile.jpg')}
						style={styles.imgStyles}/>
					<Text style={styles.textCopyright}>{'\u00A9'} Hak Cipta Dilindungi Oleh Tim X-Metrik</Text>
				<Text style={styles.textYear}>2010 - {new Date().getFullYear()}</Text>
			</View>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#efefef',
		alignItems: 'center',
		justifyContent: 'center'
	},
	imgStyles: {
		resizeMode: 'stretch',
		alignItems: 'center',
		height: 200,
		width: 300,
		marginTop: 6
	},
	textName: {
		fontSize: 42,
		fontWeight: '700',
		fontFamily: 'roboto',
		color: 'blue',
		textAlign: 'center'
	},
	textVersion: {
		fontSize: 18,
		fontWeight: '500',
		fontFamily: 'roboto',
		color: '#333',
		textAlign: 'center',
		top: -8
	},
	textCopyright: {
		fontFamily: 'roboto',
		color: 'red'
	},
	textYear: {
		fontFamily: 'roboto',
		color: '#333'
	}
});