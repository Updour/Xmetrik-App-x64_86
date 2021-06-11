'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage';

import { View, Text, Alert, TouchableOpacity } from 'react-native';
import {
   Container, Content, Item, Input, Button, Form, Label
} from 'native-base';
import { styles, setNotify, Headerd, sign, setNotEmpty } from '../../helper'

export default class ForgotingScreen extends Component {
    state = {
        setInput: ''
    }

    componentDidMount() {
        this._onRetrieveValStorage()
    }

    _onRetrieveValStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('#keyLock')
            let parsing = await AsyncStorage.getItem('@keySign')
            let parse = JSON.parse(parsing)
            return _.isNull(val) ? setNotfound(val) :
            this.setState({
                setSaveInput: _.toString(val),
                agenid: _.get(parse[0], 'agenid'),
                pin:  _.get(parse[0], 'pin'),
                sender:  _.get(parse[0], 'sender'),
                isSetButton: true
            })
        } catch(e) {
          setNotify(`Application lock isn't set `, e)
      }
    }

    _onVerifycationValueStorage = () => {
        let { agenid, pin, sender, setNumber, setAgenid, setPin } = this.state
        if (_.isEmpty(setNumber) || _.isEmpty(setAgenid) || _.isEmpty(setPin)) return setNotEmpty()

        let isSetAgenid = _.isEqual(_.toLower(agenid), _.toLower(setAgenid)) ? 'agenid' : setNotify(`Sorry, Agenid unavailable`)
        let isSetPin = _.isEqual(pin, setPin) ? 'pin' : setNotify(`Sorry, PIN unavailable`)
        let isSetHp = _.isEqual(sender, setNumber) ? 'hp' : setNotify(`Sorry, Nomor handphone unavailable`)

        if (_.isEqual(isSetAgenid, 'agenid') && _.isEqual(isSetPin, 'pin') &&
            _.isEqual(isSetHp, 'hp')) {
             Alert.alert(
              "Peringatan !!",
              "Apakah anda yakin mereset password aplikasi & menghapus data login?",
              [
              {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
              },
              {
                text: "OK", onPress: async () => {
                   await AsyncStorage.removeItem('@keySign')
                   await AsyncStorage.removeItem('@keyHp')
                   await AsyncStorage.removeItem('@keyPin')
                   await AsyncStorage.removeItem('@keyPassword')
                   await AsyncStorage.removeItem('#keyLock')
                   setTimeout(() => this.props.navigation.navigate("sign"), 1750)
                }
              }
           ]
           );
        }else {
            setNotify(`Sorry, users unavailable \n Please Contact customers services`)
        }
    }


  render() {
    let { setNumber, setAgenid, setPin} = this.state
    return (
      <Container style={styles.contentStyle}>
       <Headerd onPress={() => this.props.navigation.navigate('main')}>
            <Text>Registrasi Downline</Text>
        </Headerd>
      <Content >
              <Form style={styles.formView}>
               <Item stackedLabel last style={styles.itemStyles}>
                      <Label style={setAgenid ? sign.labelInaFocus : styles.labelFocus }>Agenid Pengguna</Label>
                      <Input
                          onChangeText={setAgenid => this.setState({ setAgenid })}
                          value={setAgenid}
                          placeholder="XMA0404"
                          placeholderTextColor='#bfbfbf'
                      />
                  </Item>
                  <Item stackedLabel style={styles.itemStyles}>
                      <Label style={setNumber ? sign.labelInaFocus : styles.labelFocus }>Nomor Handphone</Label>
                      <Input
                          onChangeText={setNumber => this.setState({ setNumber })}
                          value={setNumber}
                          placeholder="08123456789"
                          placeholderTextColor='#bfbfbf'
                          maxLength={15}
                          keyboardType='phone-pad'
                      />
                  </Item>

                  <Item stackedLabel last style={styles.itemStyles}>
                      <Label style={setPin ? sign.labelInaFocus : styles.labelFocus }>PIN Transaksi</Label>
                      <Input
                          onChangeText={setPin => this.setState({ setPin })}
                          value={setPin}
                          placeholder="123456"
                          placeholderTextColor='#bfbfbf'
                      />
                  </Item>
              </Form>
          </Content>
          <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={this._onVerifycationValueStorage}
                >
                    <Text style={styles.textSubmit}>Reset Password App</Text>
                </TouchableOpacity>
      </Container>
    );
  }
}

