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
    DotIndicator, EmptyData
} from '../../../helper'

import { PostPaidResult, PostPaidNonPln } from './results'

const PrinterManager = NativeModules.PrinterManager;

export default class PostpaidPrint extends Component {
    state = {
        values: [],
        isValSet: false,
        isSetElm: false,
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
            this.setState({ agenid: _.get(parse[0], 'agenid')
            })
        } catch(e) {
            console.log(e);
        }
    }

    _onRetrieveValPostPaidStruct = async () => {
        try {
            let { agenid, isNumber, isSetDate } = this.state;
            if (_.isEmpty(isNumber) || _.isEqual(isSetDate, '')) return setNotEmpty()
                let url = dev_net()+`trx-struck/${agenid}/${isNumber}/${setFormDate(new Date(isSetDate))}`
                // let url = dev_net()+`trx-struck/${'SD05758'}/${isNumber}/${setFormDate(new Date(isSetDate))}`
                let results = await axios.get(url)
                if (_.isEqual(results.data.status, 404)) {
                    this.setState({
                        isValSet: false,
                        isSetElm: false
                    }, () => setNotify(results.data.msg))
                }else {
                    this.setState({
                        values: results.data,
                        isValSet: true,
                        isSetElm: true
                    })
                }
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }

    _onSelectByDateStruct = async (val) => {
       this.setState({ isSetDate: val },
        () => setTimeout(() => {
            this._onRetrieveValPostPaidStruct()
        }, 250))
    }

    _onRemoveEveryState = () => {
        this.setState({
            isValSet: false,
            isSetElm: false,
            values: [],
            isNumber: '',
            isSetDate: ''
        })
    }

    // outing display data print
    _onActionReceiptOut = async () => {
        return _.map(this.state.values, item => {
            let {
                adm, bln, denda, kwh, ppn, sn, tagihan, tanggal, total_bayar,
                trfdaya, tujuan, uname, code, meter, member
            } = item

            if (_.isEqual(code, 'pgn')) { //pgn printout
                let txtx = `
===============================
 CETAK STRUK PASCABAYAR ${_.toUpper(code)}
     ${tanggal}
===============================

ID Pelanggan  : ${tujuan}
Nama          : ${uname}
Bulan         : ${bln}
Meter         : ${meter}
Tagihan/ Adm  : ${tagihan}/ ${adm}
Total Bayar   : ${total_bayar}
-------------------------------
${sn}
-------------------------------
  Terima Kasih Dan Selamat
    Bertransaksi Kembali
            `
            console.log('q', txtx)
        PrinterManager.printText(txtx)
            }

            if (_.isEqual(code.substr(0,4), 'pdam')) { //pdam printout
                let item = `
===============================
 CETAK STRUK PASCABAYAR ${_.toUpper(code)}
     ${tanggal}
===============================

ID Pelanggan  : ${tujuan}
Nama          : ${uname}
Bulan         : ${bln}
Tagihan/ Adm  : ${tagihan}/ ${adm}
Total Bayar   : ${total_bayar}
-------------------------------
${sn}
-------------------------------
  Terima Kasih Dan Selamat
    Bertransaksi Kembali
            `
            console.log('q', item)
        PrinterManager.printText(item)
            }

             if (_.isEqual(code, 'bpjs')) { //bpjs printout
                let tex = `
===============================
 CETAK STRUK PASCABAYAR ${_.toUpper(code)}
     ${tanggal}
===============================

ID Pelanggan  : ${tujuan}
Nama          : ${uname}
Bln/ Member   : ${bln}/ ${member}
Tagihan/ Adm  : ${tagihan}/ ${adm}
Total Bayar   : ${total_bayar}
-------------------------------
${sn}
-------------------------------
  Terima Kasih Dan Selamat
    Bertransaksi Kembali
            `
            console.log('q', tex)
        PrinterManager.printText(tex)
            }

             if (_.isEqual(code, 'speedy') || _.isEqual(code, 'halo') || _.isEqual(code, 'tel')) { //pgn printout
                let tel = `
===============================
 CETAK STRUK PASCABAYAR ${_.toUpper(code)}
     ${tanggal}
===============================

ID Pelanggan  : ${tujuan}
Nama          : ${uname}
Bulan/ Adm    : ${bln}/ ${adm}
Tagihan       : ${tagihan}
Total Bayar   : ${total_bayar}
-------------------------------
${sn}
-------------------------------
  Terima Kasih Dan Selamat
    Bertransaksi Kembali
            `
            console.log('q', tel)
        PrinterManager.printText(tel)
            }

             if (_.isEqual(code, 'pln')) { //pln printout
                let txt = `
===============================
 CETAK STRUK PASCABAYAR ${_.toUpper(code)}
     ${tanggal}
===============================

ID Pelanggan  : ${tujuan}
Nama          : ${uname}
Bln/ Daya     : ${bln}/ ${trfdaya}
Kwh           : ${kwh}
Denda/ Ppn    : ${denda}/ ${ppn}
Tagihan       : ${tagihan}
Admin         : ${adm}
Total Bayar   : ${total_bayar}
-------------------------------
${sn}
-------------------------------
  Terima Kasih Dan Selamat
    Bertransaksi Kembali
            `
            console.log('q', txt)
        PrinterManager.printText(txt)
            }
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
                        placeholder="ID Pelanggan"
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
           {
                this.state.isSetElm ?
                <FlatList
                     data={this.state.values}
                     keyExtractor={(i, j) => j.toString()}
                     renderItem={({item}) =>
                        _.isEqual(item.code, 'pgn') ||
                        _.isEqual(item.code, 'bpjs') ||
                        _.isEqual(item.code.substr(0,4), 'pdam') ||
                        _.isEqual(item.code, 'speedy') || _.isEqual(item.code, 'halo') || _.isEqual(item.code, 'tel') ?
                        <PostPaidNonPln item={item} /> : <PostPaidResult item={item} />
                    }
                     ListEmptyComponent={() => <DotIndicator color='blue' />}
                 /> : <EmptyData color='blue' />
             }

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
                        onPress={this._onActionReceiptOut}>
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
