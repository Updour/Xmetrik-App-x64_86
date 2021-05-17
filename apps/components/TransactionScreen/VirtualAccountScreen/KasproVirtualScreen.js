'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


import { View, FlatList, TouchableOpacity } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import {
  Container, Content, Text, Card, Form, Item, Label, Picker, Switch, Icon, Input, Footer
} from 'native-base'
import {
  vNetKaspro, styles, netInbox, timer, types, ModalPopUp, MaterialIndicator,
  Empty, formatPrice, ReloadScreen, PleaseWait, CheckedData, Processed, timers
} from '../../CollectionScreen'

import VirtualAccountResponse from './PropsResponse/VirtualAccountResponse'
import KasproHeader from './PropsHeaderComponent/KasproHeader'


export default class KasproVirtualScreen extends Component {
  _isMounted = false;
  state= {
    ArrCode: [],
    input: '',
    code: '',
    price: '',
    counter: 1,
    refreshing: false,
    modalVisible: false,
    isShowButton: false,
    isBuying: false,
    isClicking: false,
    isChecking: false,
    isSwitchValue: false,
    types: types()
  }
  componentDidMount() {
    this._isMounted = true;
    this._onRetrieveValueDataStorage()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

   // retrieve storage
  _onRetrieveValueDataStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@keyData')
      let parsed = JSON.parse(val)
      this.setState({
        id : parsed.agenid,
        hp: parsed.hp,
        pin: parsed.pin,
        refreshing: false
      })
    }catch(err) {
      throw err;
    }
  }

  // show chilf form render
  _onShowingChildMenuForm = value => {
    this.setState({ input: value }, () => {
      if (this.state.input) {
        this.setState({ isShowButton: true })
      }
      if (this.state.input.length === 10) {
        this._onRetreiveValueDataCodeVoucher()
        this.setState({ isShowButton: true })
      }
    })
  }
  // code voucher
  _onRetreiveValueDataCodeVoucher = async () => {
    try {
      if (this.state.input ==='') { return Empty() }
        this.setState({ modalVisible: true })
      let results = await axios.get(vNetKaspro())
      let data = results.data.data
      if (this._isMounted) {
        this.setState({ ArrCode: data,  })
      }
    }catch(err) {
      throw err;
    }
  }
  // buying voucher
  _onBuyingDataCodeVoucher = async () => {
    try {
      let { code, input, isBuying, id, hp, pin, types, counter, isSwitchValue } = this.state;
      if (code === '' || input === '') { return Empty() }
        this.setState({ isBuying: true, isClicking: true })
      if (isSwitchValue === false) {
         let posts = {
        in_hpnumber: hp,
        in_message: code +'.'+ input +'.'+ pin,
        agenid: id,
        tipe: types
      }
      let results = await axios.post(netInbox(), posts)
      setTimeout(() => {
        // this._onNavigateToProcessTransaction()
        this.setState({ isBuying: false, isChecking: true })
      }, timers())
      return
      }
      let posts = {
        in_hpnumber: hp,
        in_message: code +'.'+ input +'.'+ pin +'.'+ counter,
        agenid: id,
        tipe: types
      }
      let results = await axios.post(netInbox(), posts)
      setTimeout(() => {
        // this._onNavigateToProcessTransaction()
        this.setState({ isBuying: false, isChecking: true })
      }, timers());
    }catch(err) {
      throw err;
    }
  }
     // switch to save data
  _onLoopingTwoTransaction = value => {
    this.setState({ isSwitchValue: value })
    if(value == true) {
      const { code, input } = this.state;
      if (code === '' || input === '') {
        Empty()
        this.setState({ isSwitchValue: false })
      } else {
        this.state.counter++
        this.setState({ isSwitchValue: true })
      }
    } else {
      this.setState({ isSwitchValue: false, counter: 1 })
    }
  }

  //
  _onReloadScreenAndData = () => {
    this.setState({
      refreshing: true,
      input: '',
      code: '',
      isClicking: '',
      counter: 1,
    }, ()=> this._onRetrieveValueDataStorage())
  }
  render() {
    let {
      input, counter, code, ArrCode, modalVisible, isShowButton, isBuying,
      isClicking, isChecking, isSwitchValue
    } = this.state;

    let {
      contentStyle, cardStyles, formStyles, iconAStyles, iconInStyles, labelAStyles,
      labelInStyles, footerStyles, SubmitStyle, textStyle, textItemPrice, ItemPrice,
      SubmitBlockStyle, textSwitchStyles
    } = styles;
    return (
      <Container>
      <KasproHeader {...this.props} onPress={this._onReloadScreenAndData}/>
      <ReloadScreen
        refreshing={this.state.refreshing}
        onRefresh={this._onReloadScreenAndData}
        style={contentStyle}
      >
        <Content>
          <Card style={cardStyles}>
            <Form style={formStyles}>
              <Item floatingLabel>
                <Icon name="ios-person" style={input ? iconAStyles : iconInStyles}/>
                  <Label style={input ? labelAStyles : labelInStyles}>Nomor Handphone</Label>
                  <Input
                    onChangeText={input => this._onShowingChildMenuForm(input.replace(/[^0-9]/g, ''))}
                    value={input}
                    keyboardType='phone-pad'
                  />
              </Item>
              {isShowButton ?
              <View>
              <Item floatingLabel>
                <Icon name="ios-cart" style={code ? iconAStyles : iconInStyles}/>
                <Label style={code ? labelAStyles : labelInStyles}>Kode Produk</Label>
                  <Input
                    onChangeText={code => this.setState({code})}
                    value={code}
                    editable={false}
                    keyboardType='phone-pad'
                  />
                <Icon name="ios-arrow-dropdown" style={code ? iconAStyles : iconInStyles}
                onPress={this._onRetreiveValueDataCodeVoucher}
                />
              </Item>
              <Grid>
                <Col>
                  <Text style={textItemPrice}>Harga</Text>
                </Col>
                <Col>
                  <Text style={ItemPrice}>Rp. {formatPrice(this.state.price)}</Text>
                </Col>
              </Grid>
                { isSwitchValue ? <Item floatingLabel>
                <Icon name="ios-cash" style={counter ? iconAStyles:iconInStyles}/>
                  <Label style={counter ? labelAStyles : labelInStyles}>Nomor Transaksi</Label>
                  <Input
                    onChangeText={counter => this.setState({counter})}
                    value={counter.toString()}
                    keyboardType='phone-pad'
                  />
                  <Icon name="ios-close-circle-outline" onPress={() => this.setState({ counter: 1 })} />
              </Item>: null
              }
            <Item style={{marginTop: 8}}>
            <Switch
              onValueChange={value => this._onLoopingTwoTransaction(value)}
              value={isSwitchValue}
            />
              <Label style={textSwitchStyles}>Switch untuk transaksi ke 2 | 3 | 4</Label>
            </Item>
            </View> : null
          }
            </Form>
          </Card>
          {isClicking ?
              <Content style={contentStyle}>
              {isChecking? <CheckedData onPress={() => this.props.navigation.navigate('process')} /> : <Processed />}
              </Content> :
              <Content>
              {isBuying? <Text style={{textAlign: 'center'}}>canceled</Text>: null}
              </Content>
            }
        {/*for modal pop up*/}
        <ModalPopUp visible={modalVisible}
          onRequestClose={() => this.setState({modalVisible:false})}
          onPress={() => this.setState({ modalVisible:false })}
        >
          <Content>
          <FlatList
            data={ArrCode}
            keyExtractor={(i, j) => j.toString()}
            ListEmptyComponent={MaterialIndicator}
            renderItem={({item}) =>
            <VirtualAccountResponse item={item}
            onPress={()=> this.setState({ code: item.vtype, price: item.harga, modalVisible: false })}
            />
            }
          />
          </Content>
        </ModalPopUp>
        </Content>
        </ReloadScreen>
        {isShowButton ?
          <Footer style={footerStyles}>
          {isBuying ? <PleaseWait />:
            <TouchableOpacity onPress={this._onBuyingDataCodeVoucher} style={SubmitStyle}>
            <Text style={textStyle}>BELI</Text>
            </TouchableOpacity>
          }
          </Footer> :
          <Footer style={footerStyles}>
          <TouchableOpacity style={SubmitBlockStyle}>
          <Text style={textStyle}>BELI</Text>
          </TouchableOpacity>
          </Footer>
        }
      </Container>
    );
  }
}
