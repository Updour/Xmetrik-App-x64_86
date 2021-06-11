'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList, View } from 'react-native';
import {
    Container, Content, DatePicker, Left, Input, Right, Form, Icon
} from 'native-base'
import {
    styles, setNotify, RefreshScreen, setFormDate, EmptyData, dev_net, DotIndicator
} from '../../helper'
import { PropsToday } from './response'

export default class TransactionDaily extends Component {
    state = {
        reports: [],
        isSetDate: '',
        isRefresh: false,
        isSetElm: false,
        isValSet: false
    }

    componentDidMount() {
        this._onRetrieveValStorage()
    }

    _onRetrieveValStorage = async () => {
        try {
          let val = await AsyncStorage.getItem('@keySign')
          let parse = JSON.parse(val)
          let { agenid, saldo, bonus, sender, nama,  } = parse[0]
          return _.isNull(parse) ? setNotfound(parse) :
          this.setState({
            id: _.get(parse[0], 'agenid'),
            isRefresh: false
        })
      } catch(e) {
          console.log(e);
      }
    }

    _onSelectByDateReports = async () => {
        try {
            let { id, isSetDate } = this.state;
          let results = await axios.get(dev_net()+`trx-data-all/${id}/${setFormDate(new Date(isSetDate))}`)
            if (_.isEqual(results.data.status, 404)) {
                this.setState({
                    isValSet: false,
                    isSetElm: false
                }, () => setNotify(results.data.msg))
            }else {
                // console.log('a', isSetDate, results.data.data)
                this.setState({
                    reports: results.data.data,
                    isRefresh: false,
                    isValSet: true,
                    isSetElm: true
                })
            }
        } catch(e) {
          console.log(e);
      }
    }

    _onSelectByDateStruct = async (val) => {
       this.setState({ isSetDate: val },
        () => setTimeout(() => {
            this._onSelectByDateReports()
        }, 250))
    }

   _onRefreshNewValData = () => {
        this.setState({
            reports: [],
            isRefresh: true,
            isSetElm: false,
            isValSet: false,
            isSetDate: '',
        }, () => this._onRetrieveValStorage())
    }
  render() {
    return (
      <Container>
          <RefreshScreen
            refreshing={this.state.isRefresh}
            onRefresh={this._onRefreshNewValData}
            style={styles.contentStyle}
          >
              <Content>
               <Form style={styles.formView}>
            <View style={styles.itemWrap}>
                <Left>
                    <Input
                        style={styles.txtNumb}
                        placeholder="Cari berdasarkan"
                        placeholderTextColor='#bfbfbf'
                        editable={false}
                    />
                </Left>
                <Right>
                    <DatePicker
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Tanggal transaksi"
                        textStyle={{ color: "green"}}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={this._onSelectByDateStruct}
                        value={this.state.isSetDate}
                        disabled={false}
                    />
                </Right>
                {
                    this.state.isValSet ?
                    <Icon name='close-circle-outline' style={{ padding: 7, marginTop: 4, color: 'red'}}
                    onPress={this._onRefreshNewValData}
                    /> :
                    <Icon name='search' style={{ padding: 7, marginTop: 4, color: '#66a3ff'}}
                    onPress={this._onSelectByDateReports}
                    />
                }
            </View>
          </Form>
                {
                  this.state.isSetElm ? <FlatList
                       data={this.state.reports}
                       keyExtractor={(i, j) => j.toString()}
                       renderItem={({item}) => <PropsToday item={item} /> }
                       ListEmptyComponent={() => <DotIndicator color='blue' />}
                   /> : <EmptyData color='blue' />
                }
              </Content>
          </RefreshScreen>
      </Container>
    );
  }
}
