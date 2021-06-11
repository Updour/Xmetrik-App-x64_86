'use strict';

import React, { Component } from 'react';

import _ from 'lodash'
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Text, Form, Input, Item, Button } from 'native-base'
import { Grid, Col } from 'react-native-easy-grid';
import { Headerd, setNotify, setNotEmpty, styles } from '../../helper'

export default class LockScreen extends Component {
  state = {
    setInput: '',
    isSetButton: false
  }

  componentDidMount() {
    this._onRetrieveValStorage()
  }

    _onRetrieveValStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('#keyLock')
            return _.isNull(val) ? setNotfound(val) :
            this.setState({
                setInput: _.toString(val),
                isSetButton: true
            })
        } catch(e) {
          setNotify(`Application lock isn't set `, e)
        }
    }

    // save to local
   _onSaveValueStorageLocally = async () => {
    try {
      if (_.isEmpty(this.state.setInput)) return setNotEmpty(this.state.setInput)
          if (_.size(this.state.setInput) < 6) return setNotify(`Password minimum 6 character`)
            await AsyncStorage.setItem('#keyLock', this.state.setInput)
          setNotify(`Key saved successfully`)
              this.setState({ isSetButton: true },
                () => setTimeout(() => this.props.navigation.navigate('check'), 1500))
      }catch (error) {
        NotifyResponse('Internal server save error ',error)
      }
    }

    _onRemoveValStorageLocally = () => {
    Alert.alert(
      "PERINGATAN !!",
      "Password yang sudah di hapus tidak bisa di kembalikan lagi ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => setTimeout(async () => {
          await AsyncStorage.removeItem('#keyLock');
          this.setState({ isSetButton: false, setInput: '' },
            () => setNotify(`Key removed successfully`))
        }, 1500)}
      ],
      { cancelable: false }
    );
   }
  render() {
    return (
     <Container>
     <Headerd onPress={() => this.props.navigation.navigate('Account')}>
     <Text style={{color: '#fff', fontFamily: 'roboto'}}>Lock Application</Text>
     </Headerd>
     <View style={styles.cntStyle}>
            <Grid style={styles.cntStyle}>
              <Col>
          <Text style={styles.textLabel}>
          {this.state.isSetButton ? 'Password aplikasi Anda Adalah:' : 'Masukan Password Aplikasi Anda' }
          </Text>
            <Item rounded style={styles.itemStyle}>
              <Input
                style={styles.textInput}
                maxLength={8}
                secureTextEntry={true}
                placeholder='*** *** ***'
                showSoftInputOnFocus
                autoFocus
                keyboardType='number-pad'
                editable={this.state.isSetButton ? false : true }
                value={this.state.setInput.toString()}
                onChangeText={setInput => this.setState({ setInput })}
              />
            </Item>
        </Col>
            </Grid>
            {this.state.isSetButton ?
              <Button block rounded
                style={styles.btnStyle}
                onPress={this._onRemoveValStorageLocally}>
                <Text>reset Password</Text>
              </Button> :
              <Button block rounded
                style={styles.btnStyles}
                onPress={this._onSaveValueStorageLocally}>
                <Text>simpan</Text>
              </Button>
            }
          </View>
     </Container>
    );
  }
}
