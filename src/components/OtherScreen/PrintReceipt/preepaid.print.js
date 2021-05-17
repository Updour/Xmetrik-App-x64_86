'use strict';

import React, { Component } from 'react';

import axios from 'axios'
import _ from 'lodash'
import Icons from 'react-native-vector-icons/MaterialIcons';
import { NativeModules, View, Text, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {
    Container, Content, Form, Item, Label, Icon, Input, Body,  DatePicker, Left, Right,
    Footer, Button, FooterTab
} from 'native-base'
import {
    styles, setFormDate, setNotfound, setNotify, setNotEmpty, dev_net,
} from '../../../helper'

import { PreePaidResult } from './results'

const PrinterManager = NativeModules.PrinterManager;

export default class PreepaidPrint extends Component {
    state = {
        values: [],
        isValSet: false,
        isNumber: '',
        isSetDate: ''
    }

    componentDidMount() {
        this._onRetrieveValStorage()
    }

    _onRetrieveValStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('@keySign')
            let parse = JSON.parse(val)
            return _.isNull(parse) ? setNotfound(parse) :
            this.setState({ agenid: _.get(parse[0], 'agenid')})
        } catch(e) {
            console.log(e);
        }
    }

    _onRetrieveValPostPaidStruct = async () => {
        try {
            let { agenid, isNumber, isSetDate } = this.state;
            if (_.isEmpty(isNumber) || _.isEqual(isSetDate, '')) return setNotEmpty()
                let url = dev_net()+`trx-unstruck/${agenid}/${isNumber}/${setFormDate(new Date(isSetDate))}`
                let results = await axios.get(url)
                if (_.isEqual(results.data.status, 404)) {
                    this.setState({
                        isValSet: false
                    }, () => setNotify(results.data.msg))
                }else {
                    this.setState({
                        values: results.data,
                        isValSet: true
                    })
                }
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }

    _onSelectByDateStruct = async (val) => {
       this.setState({isSetDate: val },
        () => setTimeout(() => {
            this._onRetrieveValPostPaidStruct()
        }, 250))
    }

    _onRemoveEveryState = () => {
        this.setState({
            isValSet: false,
            values: [],
            isNumber: '',
            isSetDate: ''
        })
    }

    // outing display data print
    _onReceiptOutDisplay = async () => {
        return _.map(this.state.values, item => {
            let {
                 tanggal, code, tujuan, uname, trfdaya, kwh, ppn, ppj, sn
            } = item
            let txt = `
===============================
 CETAK STRUK PRABAYAR ${_.toUpper(code)}
     ${tanggal}
===============================

ID Pelanggan  : ${tujuan}
Nama          : ${uname}
Trf/ Daya     : ${trfdaya}
Kwh           : ${kwh}/ ${ppn}
Ppj           : ${ppj}
-------------------------------
${sn}
-------------------------------
  Terima Kasih Dan Selamat
    Bertransaksi Kembali
            `
            console.log('q', txt)
        PrinterManager.printText(txt)
        })
    }


  render() {
    let { values, isValSet, isNumber, isSetDate } = this.state;
    return (
    <Container>
      <Content style={styles.contentStyle}>
        <Form style={styles.formView}>
            <View style={styles.itemWrap}>
                <Left>
                    <Input
                        onChangeText={isNumber => this.setState({isNumber})}
                        value={isNumber}
                        style={styles.txtNumb}
                        placeholder="Nomor Tujuan"
                        placeholderTextColor='#bfbfbf'
                    />
                </Left>
                <Right>
                    <DatePicker
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Tanggal"
                        textStyle={{ color: "green"}}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={this._onSelectByDateStruct}
                        value={isSetDate}
                        disabled={false}
                    />
                </Right>
                {
                    isValSet ?
                    <Icon name='close-circle-outline' style={{ padding: 7, marginTop: 4, color: 'red'}}
                    onPress={this._onRemoveEveryState}
                    /> :
                    <Icon name='search' style={{ padding: 7, marginTop: 4, color: '#66a3ff'}}
                    onPress={this._onRetrieveValPostPaidStruct}
                    />
                }
            </View>
          </Form>

          <FlatList
              data={this.state.values}
              keyExtractor={(i, j) => j.toString()}
              renderItem={({item}) => <PreePaidResult item={item}/> }
          />
      </Content>
        {
            isValSet ?
            <Footer style={styles.headerStyles}>
                <FooterTab style={styles.headerStyles}>
                    <Button vertical
                        onPress={() => PrinterManager.connect()}>
                        <Icons name="bluetooth-connected" size={19} color="#fff" />
                        <Text style={styles.txtStyl}>Connect</Text>
                    </Button>
                    <Button vertical
                        onPress={this._onReceiptOutDisplay}>
                        <Icons name="print" size={19} color="#fff" />
                        <Text style={styles.txtStyl}>Print</Text>
                    </Button>
                    <Button vertical
                        onPress={()=> PrinterManager.disconnect()}>
                        <Icons name="bluetooth-disabled" size={19} color="#fff"/>
                        <Text style={styles.txtStyl}>Disconnect</Text>
                    </Button>
                </FooterTab>
            </Footer> : null
        }
    </Container>
    );
  }
}
