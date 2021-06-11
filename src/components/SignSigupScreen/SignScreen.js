'use strict';

import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { ScrollView, TouchableOpacity } from 'react-native'
import {
  Container, Content, Form, Item, Input, Label, Icon, Text, Switch, Card,
} from 'native-base';
import {
    sign, styles, Submit, dev_net, setNotfound, isEmpty, SaveLocal, setNotify, SkypeIndicator
} from '../../helper'
import Header from './SignSigupHeader'

export default class SignScreen extends Component {
  _isMounted = false;
    state = {
        isTxtPin: true,
        isTxtPassword: true,
        isValSwitch: false,
        hp: '',
        pin: '',
        password: ''
    }

    componentDidMount() {
        this._isMounted = true;
        this._onRetrieveValStorage()
        this._onMakeValStorageLocally()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _onRetrieveValStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('@keySign')
            let vals = await AsyncStorage.getItem('#keyLock')
            let parse = JSON.parse(val)
            if (_.isNull(parse)) return
              this.props.navigation.dispatch(resetAction)
            if (_.isNull(vals)) {
              this.props.navigation.dispatch(resetAction)
            }else {
              this.props.navigation.navigate('check')
            }
            // console.log(vals)
            // return _.isNull(vals) ? this.props.navigation.dispatch(resetAction) : this.props.navigation.navigate('check')
        } catch(e) {
            console.log(e);
        }
    }
      // set to AsyncStorage
    _onSetValLocalStorage = () => {
        const { hp, pin, password } = this.state;
            AsyncStorage.setItem('@keyHp', hp);
            AsyncStorage.setItem('@keyPin', pin);
            AsyncStorage.setItem('@keyPassword', password);
        setNotify(`Data Saved Successfully`)
    }

    // get value when sav to asycstorage
      _onMakeValStorageLocally = async () => {

        let onNumb = await AsyncStorage.getItem('@keyHp')
        let chp = _.isEmpty(onNumb) ? this.setState({ isSwitchValue: false }) :
        this._isMounted && this.setState({ hp: onNumb, isSwitchValue: true })

            // pin
        let onPin = await AsyncStorage.getItem('@keyPin')
        let cpin =  _.isEmpty(onPin) ? this.setState({ isSwitchValue: false }) :
        this._isMounted && this.setState({ pin: onPin, isSwitchValue: true })

            // show password
        let onPass = await AsyncStorage.getItem('@keyPassword')
        let cpassword =  _.isEmpty(onPass) ? this.setState({ isSwitchValue: false }) :
        this._isMounted && this.setState({ password: onPass, isSwitchValue: true })
      }

    // switch save locally data
    _onSwitchtoSaveLocally = val => {
        const { hp, pin, password } = this.state;
        this.setState({ isValSwitch: val },
            () => {
                if(_.isEqual(val, true)) {
                    if (_.isEmpty(hp) || _.isEmpty(pin) || _.isEmpty(password)) {
                        this.setState({ isValSwitch: false }, () => isEmpty())
                    }else {
                        this.setState({ isValSwitch: true }, () => this._onSetValLocalStorage())
                        setNotify('Successfully Save')
                    }
                }else {
                    setNotify('Data Storage Not Save')
                }
            })
    }

    // sign user
    _onSignOrSigupUser = async () => {
        try {
            let { hp, pin, password } = this.state
            let numb = hp.replace('+62', '0')
            let uri = dev_net()+`sign-user/${numb}/${pin}/${password}`
            if (_.isEmpty(hp) || _.isEmpty(pin) || _.isEmpty(password)) return isEmpty()
            this.setState({ isValSwitch: true }, () => this._onSetValLocalStorage())

            let results = await axios.get(uri)
            if (_.isEmpty(results.data.data)) return setNotify(results.data.msg)
                setNotify(results.data.statusText)
            AsyncStorage.setItem('@keySign', JSON.stringify(results.data.data))
            let { agenid, distributor, sub_distributor } = results.data.data[0]

            if (_.isEqual(distributor, '0', ) && _.isEqual(sub_distributor, '0')) {
                this.setState({ isSign: true },
                    () => setTimeout(() => this.props.navigation.dispatch(resetAction)
                        , 3000))
                // AsyncStorage.setItem('@keyAD', JSON.stringify(results.data.data))
                AsyncStorage.setItem('@keyLog', JSON.stringify('dist'))
            }
                if (_.isEqual(sub_distributor, '0')) {
                   this.setState({ isSign: true },
                    () => setTimeout(() => this.props.navigation.dispatch(resetAction)
                        , 3000))
                   AsyncStorage.setItem('@keyLog', JSON.stringify('subdist'))
               }else {
                   this.setState({ isSign: true },
                    () => setTimeout(() => this.props.navigation.dispatch(resetAction)
                        , 3000))
                   AsyncStorage.setItem('@keyLog', JSON.stringify('reseller'))
               }
        } catch(e) {
             setNotify(e)
            console.log(e);
        }
    }
  render() {
    let {
      isValSwitch, isSign, hp, password, pin, isTxtPin, isTxtPassword
    } = this.state;
    let {
      formStyles, itemStyles, iconInaFocus, iconFocus, cardStyles, labelFocus,
      labelInaFocus, inputStyles, switchStyles, textSwitchStyles
    } = sign;
    return (
      <Container style={styles.contentStyle}>
      <Header />
      <ScrollView>
        <Content style={{ backgroundColor: '#000000', top: -80}}/>
        <Card style={cardStyles}>
          <Form>
            <Item stackedLabel style={itemStyles}>
             <Icon active name='ios-person' style={hp ? iconInaFocus : iconFocus }/>
              <Label style={hp ? labelInaFocus : labelFocus }>Nomor Handphone</Label>
              <Input
                keyboardType='phone-pad'
                onChangeText={hp => this.setState({hp})}
                value={hp}
                // autoFocus
              />
            </Item>
            <Item stackedLabel last style={itemStyles}>
            <Icon name={isTxtPin ? 'ios-lock' : 'ios-unlock'}
                style={pin ? iconInaFocus : iconFocus}
                onPress={()=> this.setState({isTxtPin: !this.state.isTxtPin})}
                />
              <Label style={pin ? labelInaFocus : labelFocus }>Pin Transaksi</Label>
              <Input
                secureTextEntry= {isTxtPin}
                onChangeText={pin => this.setState({pin})}
                value={pin}
              />
            </Item>
            <Item stackedLabel last style={itemStyles}>
            <Icon name={isTxtPassword ? 'ios-eye-off' : 'ios-eye'}
                style={password ? iconInaFocus : iconFocus}
                onPress={() => this.setState({isTxtPassword: !this.state.isTxtPassword})}/>
              <Label style={password ? labelInaFocus : labelFocus }>Password Transaksi</Label>
              <Input
                style={inputStyles}
                onChangeText={password => this.setState({password})}
                secureTextEntry= {isTxtPassword}
                value={password}
              />
            </Item>
          </Form>
        <Switch
          onValueChange={val => this._onSwitchtoSaveLocally(val)}
          style={switchStyles}
          value={isValSwitch}
        />
          <Text style={textSwitchStyles}>Switch Untuk Simpan Data</Text>

       <Content >
       {isSign ?
        <SkypeIndicator color='red' style={{marginBottom: 10}}/> :
            <Submit onPress={this._onSignOrSigupUser}>
              <Text style={styles.textSubmit}>
                Sign
              </Text>
          </Submit>
      }
          </Content>
        </Card>
      </ScrollView>
      </Container>
    );
  }
}
const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'main' }),
  ],
});


