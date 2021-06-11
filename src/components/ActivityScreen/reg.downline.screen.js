'use strict';

import React, { Component } from 'react';

import axios from 'axios'
import _ from 'lodash'
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Content, Form, Item, Label, Input } from 'native-base'
import {
    styles, Headerd, setNotfound, setNotify, setNotEmpty, dev_net, sign
} from '../../helper'

export default class RegDownlineScreen extends Component {
    state = {
        values: [],
        isSetSubmit: false,
        setNumber: '',
        setName: '',
        setCity: '',
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
                sender: _.get(parse[0], 'sender'),
                pin: _.get(parse[0], 'pin'),
                password: _.get(parse[0], 'password'),
            })
        } catch(e) {
            console.log(e);
        }
    }

    _onInsertNewDownlineAgen = async () => {
        try {
            let { id, sender, setNumber, setName, setCity, pin, password } = this.state;
            if (_.isEmpty(setNumber) || _.isEmpty(setName) || _.isEmpty(setCity)) return setNotEmpty(setNumber)
               let items = {
                agenid: id,
                sender: sender,
                in_message: `daftar.${setNumber}.${setName}.${setCity}.${pin}.${password}`,
                status: 'non_transaksi'
            }
            let response = await axios.post(dev_net()+`inbox-user/transaction`, items)
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

  render() {
    let { setNumber, setName, setCity } = this.state;
    return (
    <Container style={styles.contentStyle}>
        <Headerd onPress={() => this.props.navigation.navigate('main')}>
            <Text>Registrasi Downline</Text>
        </Headerd>
          <Content >
              <Form style={styles.formView}>
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
                      <Label style={setName ? sign.labelInaFocus : styles.labelFocus }>Nama Agen</Label>
                      <Input
                          onChangeText={setName => this.setState({ setName })}
                          value={setName}
                          placeholder="mage selena"
                          placeholderTextColor='#bfbfbf'
                      />
                  </Item>
                  <Item stackedLabel last style={styles.itemStyles}>
                      <Label style={setCity ? sign.labelInaFocus : styles.labelFocus }>Alamat</Label>
                      <Input
                          onChangeText={setCity => this.setState({ setCity },
                            () => _.size(this.state.setCity) > 4 ?
                            this.setState({ isSetSubmit: true }) :
                            this.setState({ isSetSubmit: false }))
                            }
                          value={setCity}
                          placeholder="Kota Probolinggo"
                          placeholderTextColor='#bfbfbf'
                      />
                  </Item>
              </Form>
          </Content>
          {
            this.state.isSetSubmit ?
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={this._onInsertNewDownlineAgen}
                >
                    <Text style={styles.textSubmit}>Registrasi</Text>
                </TouchableOpacity> :
                <TouchableOpacity
                    onPress={() => setNotEmpty()}
                    style={[styles.btnSubmit, {backgroundColor: '#bfbfbf'}]}>
                    <Text style={styles.textSubmit}>Registrasi</Text>
                </TouchableOpacity>
          }

    </Container>
    );
  }
}
