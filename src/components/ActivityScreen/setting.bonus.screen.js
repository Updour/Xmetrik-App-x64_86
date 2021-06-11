'use strict';

import React, { Component } from 'react';

import axios from 'axios'
import _ from 'lodash'
import { View, Text, Button, Picker, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {
    Container, Content, Form, Item, Label, Icon, Input, Left, Right
} from 'native-base'
import {
    styles, Headerd, setNotfound, setNotEmpty, dev_net, RefreshScreen,
    EmptyData, DotIndicator, setNotify
} from '../../helper'
import { PropsShowBonus, PropsSetBonus } from './response'

export default class SettingBonusScreen extends Component {
    state = {
        values: [],
        setChild: [],
        isSetChild: '',
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
          let results = await axios.get(dev_net()+`data-downline/setting/bonus/${this.state.id}`)
          if (_.isEqual(results.data.status, 404)) {
            this.setState({
                isSetReload: false,
            })
          }else {
            this.setState({
                values: results.data.data,
                isSetElm: true,
                isSetReload: false,
            })
          }
        } catch(e) {
        console.log(e);
        }
    }

    _onRetrieveValFilteringBonus = async () => {
        try {
          let urii = dev_net()+`data-downline-filter/setting/bonus/${this.state.id}/${this.state.isSetChild}`
          let results = await axios.get(urii)
          console.log(results.data.data)
          if (_.isEqual(results.data.status, 404)) {
            this.setState({
                isSetReload: false,
            }, () => setNotify(results.data.msg))
          }else {
            this.setState({
                valuesing: results.data.data,
                isSetElm: true,
                isSetRemove: true,
                isChange: true
            })
          }
        } catch(e) {
        console.log(e);
        }
    }

     _onInsertSettingBonus = async (val) => {
        try {
            let { id, sender, pin, elmBonus} = this.state;
            if (_.isEmpty(elmBonus)) return setNotEmpty(elmBonus)
             let items = {
                agenid: id,
                sender: sender,
                in_message: `mk.${val.agenid}.${val.operator}.${elmBonus}.${pin}`,
                status: 'non_transaksi'
              }
            let response = await axios.post(dev_net()+`inbox-user/transaction`, items)
            if (_.isEqual(response.data.status, 201)) {
                setNotify(response.data.statusText)
                this.setState({
                    isChange: false,
                }, () => this._onRetrieveValueData())
            }
        } catch(e) {
            console.log(e);
        }
    }
    _onRemoveEveryState = () => {
        this.setState({
          isSetChild: '',
          isSetElm: false,
          isSetRemove: false,
          isSetReload: true,
          isChange: false
        }, () => this._onRetrieveValueData())
    }


  render() {
    return (
      <Container>
        <Headerd onPress={() => this.props.navigation.navigate('main')}>
          <Text>Setting Bonus</Text>
        </Headerd>
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
                    onValueChange={val => this.setState({isSetChild: val },
                      () => this._onRetrieveValFilteringBonus())}
                  >
                  <Picker.Item  label={'Pilih Agenid'} value={this.state.isSetChild} />
                  {
                    _.map(_.uniqBy(this.state.values, 'agenid'), (i, j) => (
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
                  onPress={this._onRetrieveValFilteringBonus}
                  />
                }
              </View>
            </Form>
          {
            this.state.isSetElm ?
              <FlatList
                  data={ this.state.isChange ? this.state.valuesing : this.state.values }
                  keyExtractor={(i, j) => j.toString()}
                  renderItem={({item}) => this.state.isChange ?
                <PropsSetBonus item={item}
                  onChangeText={elmBonus => this.setState({elmBonus})}
                  onPress={() => this._onInsertSettingBonus(item)}
                /> :
                <PropsShowBonus item={item}
                  onPress={() => this.setState({
                    isChange: true,
                    isSetRemove: true,
                    isSetChild: item.agenid,
                    valuesing: [item]
                  })}
                />
                }
                ListEmptyComponent={() => <DotIndicator color='blue' />}
            /> : <EmptyData color='blue' />
          }
          </Content>
        </RefreshScreen>
      </Container>
    );
  }
}
