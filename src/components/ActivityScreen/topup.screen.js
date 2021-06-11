'use strict';

import React, { Component } from 'react';

import axios from 'axios'
import _ from 'lodash'
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {
    Container, Content, Form, Item, Label, Icon, Input, Left, Right
} from 'native-base'
import {
    styles, Headerd, setNotfound, setNotify, setNotEmpty, dev_net,
} from '../../helper'

export default class TopUpScreen extends Component {
    state = {
        values: [],
        isSetSubmit: false,
        setNumber: '',

    }

    componentDidMount() {
        this._onRetrieveValStorage()
    }

    _onRetrieveValStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('@keySign')
            let parse = JSON.parse(val)
            return _.isNull(parse) ? setNotfound(parse) :
            this.setState({
                id: _.get(parse[0], 'agenid'),
                pin: _.get(parse[0], 'pin'),
                sender: _.get(parse[0], 'sender')
            })

        } catch(e) {
            console.log(e);
        }
    }

    _onConvertStrNumber = async val => {
        this.setState({ setNumber: val }, () => {
            if (_.size(this.state.setNumber) > 3) {
                this.setState({
                    isSetSubmit: true
                })
            }else {
             this.setState({
                 isSetSubmit: false,
             })
         }
     })
    }

   _onInsertTopUpBalance = async () => {
    try {
        let { id, sender, setNumber, pin } = this.state;
        if (_.isEmpty(setNumber)) return setNotEmpty(setNumber)
         let uri = dev_net()+`inbox-user/transaction`
         let items = {
            agenid: id,
            sender: sender,
            in_message: `dep.${setNumber}.${pin}`,
            status: 'transaksi'
        }
        let response = await axios.post(uri, items)
        if (_.isEqual(response.data.status, 201)) {
            setNotify(response.data.statusText)
            this.setState({
                isSetSubmit: false,
            }, () => setTimeout(() => this.props.navigation.navigate('Inbox'), 2000))
        }
    } catch(e) {
        console.log(e);
    }
   }

    _onRemoveEveryState = () => {
        this.setState({
            isSetSubmit: false,
            setNumber: '',
        })
    }


  render() {
    let { values, isValSet, setNumber, isSetDate } = this.state;
    return (
    <Container>
    <Headerd onPress={() => this.props.navigation.navigate('main')}>
        <Text>Topup Saldo</Text>
        </Headerd>
      <Content style={styles.contentStyle}>
        <Form style={styles.formView}>
            <View style={styles.itemWrap}>
                <Left>
                    <Input
                        onChangeText={setNumber => this._onConvertStrNumber(setNumber.replace(/[^0-9]/g, ''))}
                        value={setNumber}
                        style={styles.txtNumb}
                        placeholder="10.000.000"
                        placeholderTextColor='#bfbfbf'
                        maxLength={15}
                        keyboardType='phone-pad'
                    />
                </Left>
                <Right>
                    <View style={{ marginRight: 8}}>
                    {
                        this.state.isSetSubmit ?
                        <Button
                            onPress={this._onInsertTopUpBalance}
                            title="topup saldo"
                            color="#66a3ff"
                        /> :
                        <Button
                            onPress={this._onInsertTopUpBalance}
                            title="topup saldo"
                            disabled
                            color="#66a3ff"
                        />
                    }

                    </View>
                </Right>
                {
                    this.state.isSetSubmit ?
                    <Icon name='ios-backspace'
                    style={{ padding: 6, marginTop: 4, color: '#66a3ff'}}
                    onPress={this._onRemoveEveryState}
                    /> :
                    null
                }
            </View>
          </Form>
      </Content>
    </Container>
    );
  }
}
