'use strict';

import React, { Component } from 'react';

import axios from 'axios'
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'
import Icons from 'react-native-vector-icons/Ionicons';
import Icond from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/FontAwesome'

import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Card, Right, Left, Icon, ListItem, Button, Body, Switch } from 'native-base'
import { shome, dev_net, setNotify, styles } from '../../../helper'
import { RecentInbox } from './elm.response'

export default class StatusDashboard extends Component {
  state = {
    inbox: [],
    isSetElemt: false
  }

  componentDidMount() {
    this._onRetrieveValStorage()
  }

  _onRetrieveValStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@keySign')
      let parse = JSON.parse(val)
      return _.isNull(parse) ? setNotfound(parse) :
      this.setState({ agenid: _.get(parse[0], 'agenid')},
        () => setTimeout(() => this._onRetrieveValInbox(), 350))
    } catch(e) {
      console.log(e);
    }
  }

  _onRetrieveValInbox = async () => {
    try {
      let { agenid } = this.state;
      let results = await axios.get(dev_net()+`inbox-user/${'agenid'}`)
      if (_.isEqual(results.data.status, 404)) {
        this.setState({
          isSetElemt: false,
          isSetNotify: results.data.msg
        }, () => setNotify(results.data.msg))
      }else {
        this.setState({
          inbox: _.slice(results.data.data, 0, 2),
          isSetElemt: true
        })
      }
    } catch(e) {
      setNotify(e)
      console.log(e);
    }
  }
  render() {
    return (
      <View>
        <View style={shome.itemWrap}>
          <Text style={shome.txtMenu1}>Status Transaction</Text>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => setNotify('menu unaviable')}>
              <Text style={shome.txtMenu2}>See All</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Icond name='refresh' size={16} color='red' style={{padding: 9}}
              onPress={() => setNotify('menu unaviable')}/>
            </View>
        </View>
        {
          this.state.isSetElemt ?
          <FlatList
              data={this.state.inbox}
              keyExtractor={(i, j) => j.toString()}
              renderItem={({item}) => <RecentInbox item={item}
              onPress={() => setNotify('menu unaviable')}/> }
          /> : <Text style={styles.txtCenter}>{this.state.isSetNotify}</Text>
        }

      </View>
    );
  }
}
