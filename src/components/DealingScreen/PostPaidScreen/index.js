'use strict';

import React, { Component } from 'react';

import _ from 'lodash'
import axios from 'axios'
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid, Picker, FlatList, Text, View, Button, TouchableOpacity } from 'react-native';
import {
    Container, Content, DatePicker, Left, Input, Item, Right, Form, Icon,
    Footer
} from 'native-base'
import {
    styles, setNotify, formatPrice, RefreshScreen, EmptyData, setNotEmpty, dev_net,
    DotIndicator, Snackbar, ModalContact, ListContact, Headerd
} from '../../../helper'
import { PostPaidProps, PostPaidMsgProps } from '../response'

export default class PostPaidScreen extends Component {
    state = {
        setNominal: [],
        setContacts: [],
        setMsgOutbox: [],
        setTypes: [],
        setNumber: '',
        isSetType: '',
        setSearch: '',
        setCode: '',
        isSetCount: '',
        isSetMsgOut: false,
        isSetButton: false,
        isSetRemove: false,
        isSetRefresh: false,
        isSetSubmit: false,
        isSetSubmits: false,
        isSetDialog: false,
        isSnackbar: false,
        isSetDenom: false,
    }

    componentDidMount() {
        this._onRetrieveValStorage()
        // this._onRetrieveValOutbox()
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    _onRetrieveValStorage = async () => {
        try {
          let val = await AsyncStorage.getItem('@keySign')
          let parse = JSON.parse(val)
          return _.isNull(parse) ? setNotfound(parse) : this.setState({
            id: _.get(parse[0], 'agenid'),
            pin: _.get(parse[0], 'pin'),
            sender: _.get(parse[0], 'sender')
            }, () => this._onRetrieveValTypeGames())
      } catch(e) {
          console.log(e);
        setNotify(e)
      }
    }

    _onRetrieveValTypeGames = async val => {
      try {
        let results = await axios.get(dev_net()+`product-users/operator/ppob`)
        if (_.size(results.data.data) > 0) {
          this.setState({
            setTypes: _.uniqBy(results.data.data, 'jenis')
          }, () => this._onRetrieveValStatusPpob())
        }
      } catch(e) {
        console.log(e);
      }
    }

    // reccive data status pending
    _onRetrieveValStatusPpob = async () => {
      try {
        let uri = dev_net()+`trx-data-response/ppob/${this.state.id}/${'ppob'}`
        let results = await axios.get(uri)
        if (_.isEqual(results.data.status, 404)) {
          this.setState({
            isSetMsgOut: false,
            isSetDenom: false,
            isSetRefresh: false
           })
        }else {
          return _.map(results.data.data, item => {
            if (_.isEqual(item.status_ppob, 'pay')) {
              this.setState({
                isSetMsgOut: false,
                isSetRefresh: false
              })
            }else {
            if (_.isEqual(item.status, '2')) {
              this.setState({
                setMsgOutbox: results.data.data,
                setCode: item.kode,
                setNumber: item.tujuan,
                isSetRefresh: false,
                isSetMsgOut: true,
                isSnackbar: true,
                isSetButton: true,
                isSetRemove: true,
                isSetSubmits: true,
              })
            }
            if (_.isEqual(item.status, '4')) {
              this.setState({
                setMsgOutbox: results.data.data,
                setCode: item.kode,
                setNumber: item.tujuan,
                isSetRefresh: false,
                isSetButton: true,
                isSetMsgOut: true,
                isSetRemove: true,
                isSetDenom: false,
              })
            }
            if (_.isEqual(item.status, '3') || _.isEqual(item.status, '5')) {
              this.setState({
                setMsgOutbox: results.data.data,
                setCode: item.kode,
                setNumber: item.tujuan,
                isSetRefresh: false,
                isSetMsgOut: true,
                isSetButton: false,
                isSetRemove: true,
                isSetDenom: false,
              })
            }
          }
          })
        }
      } catch(e) {
        console.log(e);
      }
    }

    _onRetrieveValNumbSubStr = async val => {
        this.setState({ setNumber: val }, () => {
            if (_.size(this.state.setNumber) > 6) {
                this.setState({
                        isOperator: 'ppob'
                    }, () => this._onRetrieveValNominal())
            }else {
               this.setState({
                       isSetDenom: false,
                    }, () => this._onRetrieveValNominal())
            }
        })
    }

    _onRetrieveValOutbox = async () => { //list type ppob data show menu
      this.interval = setInterval(async () => {
        let { id, setNumber, setCode } = this.state;
        let uri = dev_net()+`trx-data-now/ppob/${id}/${setCode}/${setNumber}`
        let results = await axios.get(uri)
        // console.log('interval', results)
        if (_.isEqual(results.data.status, 404)) {
          this.setState({ isSetMsgOut: false, isSetDenom: false },
            () => setNotify(results.data.msg))
        }else {
          return _.map(results.data.data, item => {
            if (_.isEqual(item.status, '2')) {
              this.setState({
                setMsgOutbox: results.data.data,
                isSetMsgOut: true,
                isSetButton: true,
                isSetSubmits: true,
              }, () => clearInterval(this.interval))
            }
            if (_.isEqual(item.status, '4')) {
              this.setState({
                setMsgOutbox: results.data.data,
                isSetButton: true,
                isSetMsgOut: true,
                isSetDenom: false
              }, () => clearInterval(this.interval))
            }
            if (_.isEqual(item.status, '3') || _.isEqual(item.status, '5')) {
              this.setState({
                setMsgOutbox: results.data.data,
                isSetMsgOut: true,
                isSetButton: false,
                isSetDenom: false
              }, () => clearInterval(this.interval))
            }
          })
        }
      }, 5000)
    }


    _onRetrieveValNominal = async () => {
        try {
            let { id, isOperator, setNumber, isSetType } = this.state;
            if (_.isEmpty(setNumber)) return setNotEmpty()
            let urii = dev_net()+`prefix-all-trx/markup/walgame/${id}/${isOperator}/${isSetType}`
            let results = await axios.get(urii)
            if (_.isEqual(results.data.status, 404)) {
                this.setState({
                  isSetDenom: false,
                  isSetMsgOut: false,
                  isSnackbar: false,
                }, () => setNotify(results.data.msg))
            }
            else {
                this.setState({
                    setNominal: results.data.data,
                    isSetMsgOut: false,
                    isSnackbar: false,
                    isSetButton: false,
                    isSetSubmits: false,
                    isSetDenom: true,
                    isSnackbar: true,
                    isSetRemove: true
                })
            }
        } catch(e) {
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
            let { id, pin, sender, setCode, setNumber, isSetType } = this.state;
            if (_.isEmpty(setNumber)) return setNotEmpty()
                let uri = dev_net()+`inbox-user/transaction`
                let statsu = this.state.isSetButton ? 'pay' : 'tag'
                let items = {
                    agenid: id,
                    sender: sender,
                    in_message: `${statsu}.${setCode}.${setNumber}.${pin}`,
                    status: 'transaksi'
                }
                console.log(items)
                let response = await axios.post(uri, items)
                if (_.isEqual(response.data.status, 201)) {
                    this.setState({
                      isSetSubmit: false,
                      isSetSubmits: false,
                      isSetDenom: false,
                    }, () => this._onRetrieveValOutbox())
                let nav =  this.state.isSetButton ? this.props.navigation.navigate('Report') : null
                    setTimeout(() => nav, 1020);
                }
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }


    // set mode default
    _onResetDefault = () => {
        this.setState({
            setNominal: [],
            setNumber: '',
            setSearch: '',
            setCode: '',
            isSetCount: '',
            isSetType: '',
            isSetDialog: false,
            isSetMsgOut: false,
            isSetButton: false,
            isSetSubmit: false,
            isSetSubmits: false,
            isSnackbar: false,
            isSetDenom: false,
            isSetRemove: false
        }, () => clearInterval(this.interval))
    }

    _onRefreshValData = () => {
      this.setState({
        isSetRefresh: true
      }, () => this._onRetrieveValStatusPpob())
    }
  render() {
    return (
        <Container>
        <Headerd onPress={() => this.props.navigation.navigate('main')}>
        <Text>Pembayaran PPOB</Text>
        </Headerd>
            <RefreshScreen
                refreshing={this.state.isSetRefresh}
                onRefresh={this._onRefreshValData}
                style={styles.contentStyle}
            >
                <Content>
                    <Form style={styles.formView}>
                        <View style={styles.itemWrap}>
                            <Input style={styles.txtNumb}
                                placeholder="ID Pelanggan"
                                onChangeText={setNumber => this._onRetrieveValNumbSubStr(setNumber.replace(/[^0-9]/g, ''))}
                                value={this.state.setNumber}
                                maxLength={19}
                                keyboardType='phone-pad'
                            />
                        <Right>
                        {this.state.isSetRemove ?
                         <Input style={styles.txtNumb}
                                value={_.toUpper(this.state.setCode)}
                                editable={false}
                            /> :
                         <Picker
                            selectedValue={this.state.isSetType}
                            onValueChange={val => this.setState({ isSetType: val },
                              () => this._onRetrieveValNominal())}
                            style={[styles.txtNumb,{ width: 150, height: 50, color:'blue' }]}
                        >
                            <Picker.Item  label={'Pilih Jenis'} />
                            {
                                _.map(this.state.setTypes, (i, j) => (
                                    <Picker.Item key={j} color='#595959' label={_.upperCase(i.jenis)} value={i.jenis} />
                                ))
                            }
                        </Picker>
                      }
                        </Right>
                        {
                                this.state.isSetRemove ?
                                <Icon name='ios-backspace'
                                    style={{ padding: 6, marginTop: 4, color: '#66a3ff'}}
                                    onPress={this._onResetDefault}
                                /> :
                                <Icon name='ios-contact'
                                    style={{ padding: 6, marginTop: 4, color: '#66a3ff'}}
                                    onPress={this._onRetrieveStorageContacts}
                                />
                            }
                        </View>
                    </Form>

                  {
                    this.state.isSetMsgOut ?
                    <FlatList
                      data={this.state.setMsgOutbox}
                      keyExtractor={(i, j) => j.toString()}
                      renderItem={({item}) => <PostPaidMsgProps item={item} /> }
                      ListEmptyComponent={() => <DotIndicator color='blue' />}
                    /> : null
                  }

                {
                    this.state.isSetDenom ?
                  <FlatList
                      columnWrapperStyle={{justifyContent: 'space-between'}}
                      data={this.state.setNominal}
                      numColumns={2}
                      keyExtractor={(i, j) => j.toString()}
                      renderItem={({item}) => <PostPaidProps item={item}
                            onPress={() => {
                                if (_.isEmpty(this.state.setNumber)) return setNotEmpty()
                                    this.setState({
                                        setCode: item.kode,
                                        isSetSubmit: true
                                    })
                            }}
                      />}
                      ListEmptyComponent={() => <DotIndicator color='blue' />}
                  /> : null
                }
                {/*<EmptyData color='blue' />*/}
              </Content>
          </RefreshScreen>
              {
                this.state.isSnackbar ?
                <Footer style={[styles.headerStyles, {height: 48}]}>
                    {
                      this.state.isSetButton ?
                      <Left style={[styles.itemWrap, {marginLeft: 8}]}>
                        <Text style={[styles.textRight, {color: '#fff'}]}>Bayar Tagihan  </Text>
                        <Text style={[styles.textRight, {color: '#ccffcc',  fontWeight: 'bold', fontStyle:'italic' }]}>{_.toUpper(this.state.setCode)}</Text>
                    </Left> :
                    <Left style={[styles.itemWrap, {marginLeft: 8}]}>
                        <Text style={[styles.textRight, {color: '#fff'}]}>Cek Tagihan  </Text>
                        <Text style={[styles.textRight, {color: '#ccffcc',  fontWeight: 'bold', fontStyle:'italic' }]}>{_.toUpper(this.state.setCode)}</Text>
                    </Left>
                    }
                    {
                      this.state.isSetButton ?
                      <Right style={{ marginRight: 8 }}>
                      {
                        this.state.isSetSubmits ?
                        <Button
                            onPress={this._onSendingValsetMessages}
                            title="Bayar Tagihan"
                            color="#841584"
                        /> :
                        <Button
                            title="Bayar Tagihan"
                            disabled
                            color="#841584"
                        />
                      }
                      </Right>:
                      <Right style={{ marginRight: 8 }}>
                      {
                        this.state.isSetSubmit ?
                        <Button
                            onPress={this._onSendingValsetMessages}
                            title="Cek Tagihan"
                            color="#841584"
                        /> :
                        <Button
                            title="Cek Tagihan"
                            disabled
                            color="#841584"
                        />
                      }
                      </Right>
                    }
                </Footer> : null
              }
          {/*modal contact*/}
          <ModalContact
              visible={this.state.isSetDialog}
              onRequestClose={() => this.setState({ isSetDialog:false })}
              onPress={() => this.setState({ isSetDialog:false })}
              refreshing={this.state.isSetRefresh}
              onRefresh={this._onResetDefault}
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
