'use strict';

import React, { Component } from 'react';

import _ from 'lodash'
import axios from 'axios'
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid, FlatList, Text, View, Button, TouchableOpacity } from 'react-native';
import {
    Container, Content, DatePicker, Left, Input, Item, Right, Form, Icon,
    Footer
} from 'native-base'
import {
    styles, setNotify, formatPrice, RefreshScreen, EmptyData, setNotEmpty, dev_net,
    DotIndicator, Snackbar, ModalContact, ListContact
} from '../../../helper'
import { PackpageProps } from '../response'

export default class PackageEletric extends Component {
    state = {
        setNominal: [],
        setContacts: [],
        setNumber: '',
        setSearch: '',
        setCount: '',
        setPrefix: '',
        setPriceSell: '',
        isSetCount: '',
        isSetRefresh: false,
        isSetSubmit: false,
        isSetDialog: false,
        isSnackbar: false,
        isSetRemove: false,
        isSetDenom: false,
    }

    componentDidMount() {
        this._onRetrieveValStorage()
    }

    _onRetrieveValStorage = async () => {
        try {
          let val = await AsyncStorage.getItem('@keySign')
          let parse = JSON.parse(val)
          return _.isNull(parse) ? setNotfound(parse) : this.setState({
            id: _.get(parse[0], 'agenid'),
            pin: _.get(parse[0], 'pin'),
            sender: _.get(parse[0], 'sender'),
            isSetRefresh: false
            })
      } catch(e) {
          console.log(e);
        setNotify(e)
      }
    }

    _onRetrieveValNumbSubStr = async val => {
        this.setState({ setNumber: val }, () => {
            let setByu = this.state.setNumber.substr(0, 6)
            if (_.isEmpty(this.state.setNumber) || _.isUndefined(this.state.setNumber)) {
                this.setState({
                    isSetOpr: false,
                    isSetDenom: false,
                    isSnackbar: false,
                }, () => setNotify('Number phone must filled'))
            }
                if (_.isEqual(setByu, '085154') || _.isEqual(setByu, '085155') ||
                    _.isEqual(setByu, '085156') || _.isEqual(setByu, '085157')) {
                    this.setState({
                        setPrefix: setByu,
                    }, () => this._onRetrieveValOperator())
                }else {
                    this.setState({
                        setPrefix: this.state.setNumber.substr(0, 4),
                    }, () => this._onRetrieveValOperator())
                }
        })
    }

    _onRetrieveValOperator = async () => {
        try {
            let { setNumber, setPrefix } = this.state;
            let numb = setNumber.substr(0, 2)
            if (_.isEmpty(setNumber) || numb !== '08') return setNotEmpty()
            let uri = dev_net()+`prefix-users/operator/${setPrefix}`
            let results = await axios.get(uri)
                if (_.isEqual(results.data.status, 404)) {
                    this.setState({
                        isSetOpr: false,
                        isSetDenom: false,
                        isSnackbar: false,
                    }, () => setNotify(results.data.msg))
                }else {
                    this.setState({
                        isOperator: _.get(results.data.data[0], 'opr_prefik').toUpperCase(),
                        isSetDenom: true,
                        isSetOpr: true,
                        isSetRemove: true
                    }, () => this._onRetrieveValNominal())
                }
        } catch(e) {
            setNotify('opr ', e)
            console.log(e);
        }
    }

    _onRetrieveValNominal = async () => {
        try {
            let { id, isOperator } = this.state;
            let urii = dev_net()+`prefix-code-trx/markup/${id}/${isOperator}`
            let results = await axios.get(urii)
            if (_.isEqual(results.data.status, 404)) {
                this.setState({ isSetDenom: false }, () => setNotify(results.data.msg))
            }else {
                console.log(results.data.data)
                this.setState({
                    setNominal: results.data.data,
                    isSetSubmit: false,
                    isSetDenom: true,
                    isSnackbar: true
                })
            }
        } catch(e) {
            setNotify('denom ', e.Error)
            console.log(e);
        }
    }

   // view contact
    _onRetrieveStorageContacts = async () => {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.'
            }).then(() => {
                Contacts.getAll((err, contacts) => {
                    if (_.isEqual(err, 'denied')) return setNotify('Access Denied')
                    let isContact =  _.map(contacts, i  => ({
                       label: i.phoneNumbers[0] && i.phoneNumbers[0].label,
                       name: i.displayName,
                       number: i.phoneNumbers[0] && i.phoneNumbers[0].number
                    }))
                    this.setState({
                        setContacts: _.sortBy(isContact, ['name']),
                        isSetDialog: true
                    })
                })
            })
    }

     // search contact
     _onRetrieveSearchContact = text => {
        const newData = _.filter(this.state.setContacts, item => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        this.setState({ setContacts: newData, setSearch: text })
    }

    // insert transacation
    _onSendingValsetMessages = async () => {
        try {
            let {
                id, pin, sender, setDenom, setNumber, setNominal, setCount, setPriceSell,
                isOperator
            } = this.state;
            if (_.isEmpty(setNumber) || _.isEmpty(isOperator)) return setNotEmpty(setPriceSell)
                let uri = dev_net()+`inbox-user/transaction`
                let isSetSender =  _.split(setNumber, '.', 1).toString()
                let isSlicing = '.'+_.split(setNumber, '.', 2).slice(1)
                let isSetCount = _.isEqual(isSlicing, '.') ? '' : isSlicing
                let items = {
                    agenid: id,
                    sender: sender,
                    in_message: `${setDenom}.${isSetSender}.${pin}${isSetCount}`,
                    status: 'transaksi'
                }
                let reponse = await axios.post(uri, items)
                if (_.isEqual(reponse.data.status, 201)) {
                    this.setState({ isSetSubmit: false }, () => setNotify(reponse.data.statusText))
                    setTimeout(() => this.props.navigation.navigate('Report'), 1020);
                }
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }


    // set mode default
    _onRefreshNewValData = () => {
        this.setState({
            setNominal: [],
            setNumber: '',
            setCount: '',
            setPrefix: '',
            isSetOpr: '',
            setSearch: '',
            setPriceSell: '',
            isSetCount: '',
            isSetRefresh: true,
            isSetDialog: false,
            isSetSubmit: false,
            isSnackbar: false,
            isSetDenom: false,
            isSetRemove: false
        }, () => this._onRetrieveValStorage())
    }
  render() {
    return (
        <Container>
            <RefreshScreen
                refreshing={this.state.isSetRefresh}
                onRefresh={this._onRefreshNewValData}
                style={styles.contentStyle}
            >
                <Content>
                    <Form style={styles.formView}>
                        <View style={styles.itemWrap}>
                            <Input style={styles.txtNumb}
                                placeholder="Nomor Handphone"
                                onChangeText={setNumber => this._onRetrieveValNumbSubStr(setNumber.replace(/[^0-9]/g, ''))}
                                value={this.state.setNumber}
                                maxLength={15}
                                keyboardType='phone-pad'
                            />
                        <Right>
                        {
                            this.state.isSetOpr ? <Text style={{color: 'red'}}>{this.state.isOperator}</Text> : null
                        }
                        </Right>
                            {
                                this.state.isSetRemove ?
                                <Icon name='ios-backspace'
                                    style={{ padding: 6, marginTop: 4, color: '#66a3ff'}}
                                    onPress={this._onRefreshNewValData}
                                /> :
                                <Icon name='ios-contact'
                                    style={{ padding: 6, marginTop: 4, color: '#66a3ff'}}
                                    onPress={this._onRetrieveStorageContacts}
                                />
                            }
                        </View>
                    </Form>
                {
                    this.state.isSetDenom ?
                  <FlatList
                      columnWrapperStyle={{justifyContent: 'space-between'}}
                      data={this.state.setNominal}
                      numColumns={2}
                      keyExtractor={(i, j) => j.toString()}
                      renderItem={({item}) => <PackpageProps item={item}
                            onPress={() => {
                                if (_.isEmpty(this.state.setNumber)) return setNotEmpty()
                                    this.setState({
                                        setPriceSell: item.harga_jual,
                                        setDenom: item.kode,
                                        isSetSubmit: true
                                    })
                            }}
                      />}
                      ListEmptyComponent={() => <DotIndicator color='blue' />}
                  /> : <EmptyData color='blue' />
                }
              </Content>
          </RefreshScreen>
              {
                this.state.isSnackbar ?
                <Footer style={[styles.headerStyles, {height: 48}]}>
                    <Left style={[styles.itemWrap, {marginLeft: 8}]}>
                        <Text style={[styles.textRight, {color: '#fff'}]}>Total Bayar </Text>
                        <Text style={[styles.textRight, {color: '#ccffcc',  fontWeight: 'bold', fontStyle:'italic' }]}>Rp: {formatPrice(this.state.setPriceSell)}</Text>
                    </Left>
                    <Right style={{ marginRight: 8 }}>
                    {
                        this.state.isSetSubmit ?
                        <Button
                            onPress={this._onSendingValsetMessages}
                            title="Beli Pulsa"
                            color="#841584"
                        /> :
                        <Button
                            title="Beli Pulsa"
                            disabled
                            color="#841584"
                        />
                    }

                    </Right>
                </Footer> : null
              }
          {/*modal contact*/}
          <ModalContact
              visible={this.state.isSetDialog}
              onRequestClose={() => this.setState({ isSetDialog:false })}
              onPress={() => this.setState({ isSetDialog:false })}
              refreshing={this.state.isRefresh}
              onRefresh={this._onRefreshNewValData}
              data={this.state.setContacts && this.state.setContacts.length > 0 ? this.state.setContacts : this.state.contacts}
              renderItem={({item}) =>
                  <ListContact item={item} onPress={() => {
                    let isHp = item.number.replace('+62', '0').replace(' ', '').replace('-', '').replace('-', '')
                    this.setState({
                        isSetDialog:false
                        }, () => this._onRetrieveValNumbSubStr(isHp))}}
                  />
             }
          >
              <Item rounded>
                  <Icon name="ios-search"/>
                      <Input placeholder="Pencarian Nomor Handphone"
                          onChangeText={setSearch => this._onRetrieveSearchContact(setSearch)}
                          value={this.state.setSearch}
                          autoFocus={true}
                      />
                  <Icon name="ios-close" style={{ fontSize: 30, marginRight: 13 }}
                        onPress={() => this.setState({
                            setSearch: ''
                        }, () => this._onRetrieveStorageContacts())}
                  />
              </Item>
          </ModalContact>
      </Container>
    );
  }
}
