'use strict';

import React, { Component } from 'react';

import axios from 'axios'
import _ from 'lodash'
import { View, Text, Button, Picker, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {
    Container, Content, Form, Item, Label, Icon, Input, Left, Right, ListItem, List
} from 'native-base'
import {
    styles, Headerd, setNotfound, setNotEmpty, dev_net, RefreshScreen,
    EmptyData, DotIndicator, setNotify
} from '../../helper'
import { PropsShowBonus, PropsSetBonus, PropsSetMoreBonus } from './response'

export default class MoreBonusScreen extends Component {
    state = {
        values: [],
        setChild: [],
        setOperator: [],
        isSetChild: '',
        isSetOprx: '',
        isSetBonus: '',
        isSetElm: false,
        isChange: false,
        isSetRemove: false,
        isSetReload: false,
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
                isSetReload: false
            }, () => this._onRetrieveValueData())
        } catch(e) {
            console.log(e);
        }
    }

    _onRetrieveValueData = async () => {
        try {
          let results = await axios.get(dev_net()+`/data-user/downline/${this.state.id}`)
          if (_.isEqual(results.data.status, 404)) {
            this.setState({
                isSetReload: false,
            })
          }else {
            this.setState({
                values: results.data.data,
                isSetReload: false
            })
          }
        } catch(e) {
        console.log(e);
        }
    }
    // select operator by uid
    _onRetrieveValUidOperator = async (val) => {
        try {
          let results = await axios.get(dev_net()+`/setting-bonus-recent/downline/${val}`)
          if (_.isEqual(results.data.status, 404)) {
            this.setState({
                isSetReload: false,
            })
          }else {
            this.setState({
                setOperator: results.data,
                isAgenid: val,
                isSetElm: true,
                isSetRemove: true,
                isSetReload: false,
            })
          }
        } catch(e) {
        console.log(e);
        }
    }


     _onInsertRecentBonus = async () => {
        try {
            let { id, sender, pin, isAgenid, isSetOprx, isSetBonus} = this.state;
            if (_.isEmpty(isSetOprx) || _.isEmpty(isSetBonus)) return setNotEmpty()
             let items = {
                agenid: id,
                sender: sender,
                in_message: `mk.${isAgenid}.${isSetOprx}.${isSetBonus}.${pin}`,
                status: 'non_transaksi'
              }
            let response = await axios.post(dev_net()+`inbox-user/transaction`, items)
            if (_.isEqual(response.data.status, 201)) {
                setNotify(response.data.statusText)
                setTimeout(() => this.props.navigation.navigate('Inbox'), 1000);
            }
        } catch(e) {
            console.log(e);
        }
    }

    _onRemoveEveryState = () => {
        this.setState({
          isSetChild: '',
          setOperator: '',
          isSetOprx: '',
          isSetElm: false,
          isSetRemove: false,
          isSetReload: true,
          isChange: false
        }, () => this._onRetrieveValueData())
    }


  render() {
    return (
      <Container style={styles.contentStyle}>
        <RefreshScreen
          refreshing={this.state.isSetReload}
          onRefresh={this._onRemoveEveryState}
          style={styles.contentStyle}
        >
          <Content style={styles.contentStyle}>
            <Form style={styles.formView}>
              <View style={styles.itemWrap}>
                <Left>
                  <Input
                    style={styles.txtNumb}
                    placeholder="Pencarian agenid"
                    placeholderTextColor='#bfbfbf'
                    disabled
                  />
                </Left>
                <Right>
                  <Picker
                    style={{width: 150, height: 50, color:'red' }}
                    selectedValue={this.state.isSetChild}
                    onValueChange={val => this.setState({
                      isSetChild: val },
                      () => this._onRetrieveValUidOperator(val))}
                  >
                  <Picker.Item  label={'Pilih Agenid'} value={this.state.isSetChild} />
                  {
                    _.map(this.state.values, (i, j) => (
                      <Picker.Item key={j} color='#595959' label={_.upperCase(i.agenid)} value={i.agenid} />
                      ))
                  }
                  </Picker>
                </Right>
                {
                  this.state.isSetRemove ?
                  <Icon name='close-circle-outline' style={{ padding: 7, marginTop: 4, color: 'red'}}
                  onPress={this._onRemoveEveryState}
                  /> :
                  <Icon name='search' style={{ padding: 7, marginTop: 4, color: '#66a3ff'}}
                  onPress={this._onRetrieveValUidOperator}
                  />
                }
              </View>
            </Form>
         {
            this.state.isSetElm ?
              <List style={styles.listStyles}>
              <ListItem noIndent>
               <Text style={styles.txtLeft}>Operator</Text>
                <Picker
                    style={{width: 150, height: 50, color:'red' }}
                    selectedValue={this.state.isSetOprx}
                    onValueChange={val => this.setState({isSetOprx: val })}
                  >
                  <Picker.Item  label={'Pilih Operator'} value={this.state.isSetOprx} />
                  {
                    _.map(this.state.setOperator, (i, j) => (
                      <Picker.Item key={j} color='#595959' label={_.upperCase(i.opx)} value={i.opx} />
                      ))
                  }
                  </Picker>
           </ListItem>
           <ListItem noIndent>
               <Text style={styles.txtLeft}>Harga Markup</Text>
               <Input
                   style={styles.txtNumb}
                   placeholder="Input Harga Markup"
                   placeholderTextColor='#bfbfbf'
                   onChangeText={isSetBonus => this.setState({ isSetBonus })}
                   value={this.state.isSetBonus.toString()}
                   maxLength={3}
                   keyboardType='phone-pad'
                   autoFocus={true}
               />
           </ListItem>
           </List>
           : null
          }
          </Content>
        </RefreshScreen>

        {
            _.isEmpty(this.state.isSetOprx) ? null:
           <TouchableOpacity onPress={this._onInsertRecentBonus} style={styles.btnSubmit}>
                <Text style={styles.textSubmit}>Save Bonus</Text>
           </TouchableOpacity>
         }
      </Container>
    );
  }
}
