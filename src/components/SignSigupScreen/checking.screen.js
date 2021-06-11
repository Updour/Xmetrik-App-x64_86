'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage';

import { View, Text, BackHandler } from 'react-native';
import {
   Container, Content, Item, Input, Button
} from 'native-base';
import { styles, setNotify, Statusbar } from '../../helper'

export default class CheckingScreen extends Component {
    state = {
        setInput: ''
    }

    componentDidMount() {
        this._onRetrieveValStorage()
         BackHandler.addEventListener('backPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
       BackHandler.removeEventListener('backPress', this.handleBackButtonClick)
    }
    handleBackButtonClick = () => {
      BackHandler.exitApp();
       return true;
    }
    handleBackButtonClick = () => {
       return true;
    }

    _onRetrieveValStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('#keyLock')
            return _.isNull(val) ? setNotfound(val) :
            this.setState({
                setSaveInput: _.toString(val),
                isSetButton: true
            })
        } catch(e) {
          setNotify(`Application lock isn't set `, e)
      }
    }

    _onVerifycationValueStorage = () => {
        let { setInput, setSaveInput} = this.state
        if (_.isEqual(setInput, setSaveInput)) {
            setNotify(`Congratulations, Successfully logged in`)
            setTimeout(() => this.props.navigation.navigate('Dashboard'), 1055);
        }else {
            setNotify(`Sorry, password is incorrectly`)
        }
    }


  render() {
    return (
      <Container style={styles.headerStyles}>
      <Statusbar />
      <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
      <Text style={styles.textLabel}>Masukan Password Aplikasi</Text>
            <Item rounded style={styles.itemStyle}>
              <Input
                style={styles.textInput}
                maxLength={8}
                secureTextEntry={true}
                placeholder='*** *** ***'
                showSoftInputOnFocus
                autoFocus
                keyboardType='number-pad'
                onSubmitEditing={this._onVerifycationValueStorage}
                value={this.state.setInput.toString()}
                onChangeText={setInput => this.setState({ setInput })}
              />
            </Item>
            <Button transparent onPress={() => this.props.navigation.navigate('forgot')}>
            <Text style={styles.textSubmit}>Lupa Password ?</Text>
            </Button>
        </View>
      </Container>
    );
  }
}

