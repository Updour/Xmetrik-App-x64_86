'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { StackActions, NavigationActions } from 'react-navigation';
import { ScrollView, TouchableOpacity } from 'react-native'
import {
  Container, Content, Form, Item, Input, Label, Icon, Text, Switch, Card,
} from 'native-base';
import {
  netAuth, AuthStyles, styles, Submit, CantStorage, SaveLocal, SaveStorage, LogFailed, LogSuccess, Empty, SkypeIndicator
} from '../CollectionScreen'

import AuthenticationHeader from './ChildComponent/AuthenticationHeader'

export default class AuthenticationScreen extends Component {
  _isMounted = false;

  state = {
    isPinSwitches: true,
    isPasswordSwitches: true,
    isSwitchValue: false,
    hp: '',
    pin: '',
    password: ''
  }
  //
  componentDidMount() {
    this._onGetValueStorageLocally()
  }
  // changeIcon To Switch
  _onVisibleIconPinSwicthes = () => {
    this.setState({ isPinSwitches: !this.state.isPinSwitches})
  }

  // chnage icon password
  _onVisibleIconPasswordSwicthes = () => {
    this.setState({ isPasswordSwitches: !this.state.isPasswordSwitches })
  }

   // set to AsyncStorage
  _onSetValueStorageLocally = () => {
    const { hp, pin, password } = this.state;
    AsyncStorage.setItem('@keyPhone', hp);
    AsyncStorage.setItem('@keyPin', pin);
    AsyncStorage.setItem('@keyPassword', password);
    SaveLocal()
  }

 // get value when sav to asycstorage
  _onGetValueStorageLocally = () => {
    AsyncStorage.getItem('@keyPhone').then(val => {
      if (val === null) {
        this.setState({ isSwitchValue: false })
      }else {
        this.setState({ hp: val, isSwitchValue: true })
      }
    })
    AsyncStorage.getItem('@keyPin').then(val => {
      if (val === null) {
        this.setState({ isSwitchValue: false })
      }else {
        this.setState({ pin: val, isSwitchValue: true})
      }
    })
    AsyncStorage.getItem('@keyPassword').then(val => {
      if (val === null) {
        this.setState({ isSwitchValue: false })
      }else {
        this.setState({ password: val, isSwitchValue: true })
      }
    })
  }
   // switch to save data
  _onShowWhenSelectSwitches = (value) =>{
    this.setState({ isSwitchValue: value })
    if(value == true) {
      const { hp, pin, password } = this.state;
      if (hp === '' || pin === '' || password === '') {
        Empty()
        this.setState({ isSwitchValue: false })
      } else {
        this._onSetValueStorageLocally()
        SaveStorage()
        this.setState({ isSwitchValue: true })
      }
    } else {
      CantStorage()
    }
  }

  // login submit
  _onCheckedDataWhenMakeLogin = async () => {
                this.props.navigation.dispatch(resetAction);

    try {
      let { hp, pin, password } = this.state;
      let hd = hp.replace('+62', '0').replace('0', '+62')//.replace('62', '0')
      let uri = netAuth() +  hd +'/'+ pin + '/' + password
      if (pin === '' || password === '' || hd === '') { return Empty() }

        this._onSetValueStorageLocally()
        this.setState({ isSwitchValue: true })

      let results = await axios.get(uri)
      let data = results.data.data
      AsyncStorage.setItem('@keyData', JSON.stringify(data))

      if (data.upline && data.dealer === '1') {
        AsyncStorage.setItem('@keyDataMD', JSON.stringify(data))
          this.setState({ isSuccess: true })
            LogSuccess()
              setTimeout(() => {
                this.props.navigation.dispatch(resetAction);
              }, 3000)

        } else if (data.upline === '1' && data.dealer !== '1') {
            AsyncStorage.setItem('@keyDataSD', JSON.stringify(data))
                LogSuccess()
                this.setState({ isSuccess: true })
                  setTimeout(() => {
                    this.props.navigation.dispatch(resetAction);
                  }, 3000)

          } else if (data.upline !== '1' && data.dealer !=='1' ) {
            if (data.agenid && data.pin && data.sp !== 200) {
              AsyncStorage.setItem('@keyDataXM', JSON.stringify(data))
                LogSuccess()
                  this.setState({ isSuccess: true })
                    setTimeout(() => {
                      this.props.navigation.dispatch(resetAction);
                    }, 3000)
            } else {
              this.setState({ isSuccess: false })
              LogFailed()
            }
          }
      } catch(err) {
        console.log(err)
      }
    }

  render() {
    let {
      isSwitchValue, isSuccess, hp, password, pin,
      isPinSwitches, isPasswordSwitches
    } = this.state;
    let {
      formStyles, itemStyles, iconInaFocus, iconFocus,
      cardStyles, footerStyles, labelFocus, labelInaFocus,
      conInaLabel, iconLabel, inputStyles, textStyles,
      switchStyles, textSwitchStyles
    } = AuthStyles;

    return (
      <Container style={styles.contentStyle}>
      <AuthenticationHeader />
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
            <Icon name={isPinSwitches ? 'ios-lock' : 'ios-unlock'}
                style={pin ? iconInaFocus : iconFocus}
                onPress={this._onVisibleIconPinSwicthes}
                />
              <Label style={pin ? labelInaFocus : labelFocus }>Pin Transaksi</Label>
              <Input
                secureTextEntry= {isPinSwitches}
                onChangeText={pin => this.setState({pin})}
                value={pin}
              />
            </Item>
            <Item stackedLabel last style={itemStyles}>
            <Icon name={isPasswordSwitches ? 'ios-eye-off' : 'ios-eye'}
                style={password ? iconInaFocus : iconFocus}
                onPress={this._onVisibleIconPasswordSwicthes}/>
              <Label style={password ? labelInaFocus : labelFocus }>Password Transaksi</Label>
              <Input
                style={inputStyles}
                secureTextEntry= {isPasswordSwitches}
                onChangeText={password => this.setState({password})}
                value={password}
              />
            </Item>
          </Form>
        <Switch
          onValueChange={(value) => this._onShowWhenSelectSwitches(value)}
          style={switchStyles}
          value={isSwitchValue}
        />
          <Text style={textSwitchStyles}>Switch Untuk Simpan Data</Text>

       <Content >
            {isSuccess ?
              <SkypeIndicator color='red' style={{marginBottom: 10}}/> :
            <Submit onPress={this._onCheckedDataWhenMakeLogin}>
              <Text style={styles.textSubmit}>
                Login
              </Text>
          </Submit>}
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
    NavigationActions.navigate({ routeName: 'MainMenuBottomScreen' }),
  ],
});
