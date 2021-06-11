'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native';
import { Container, Content } from 'native-base'
import {
  styles, setNotify, RefreshScreen, EmptyData, dev_net, DotIndicator
} from '../../helper'

import { PropsMutation } from './response'
export default class MutationToday extends Component {
    state = {
        mutations: [],
        isRefresh: false,
        isSetElm: false,
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
        }, () => setTimeout(() => this._onRetrieveValTransaction(), 575))
      } catch(e) {
          console.log(e);
      }
    }

    _onRetrieveValTransaction = async () => {
        try {
          let results = await axios.get(dev_net()+`mutation-data/today/${this.state.id}`)
            if (_.isEqual(results.data.status, 404)) {
                this.setState({
                    isSetElm: false,
                }, () => setNotify(results.data.msg))
            }else {
                this.setState({
                    mutations: results.data.data,
                    isRefresh: false,
                    isSetElm: true
                })
            }
        } catch(e) {
          console.log(e);
      }
    }

   _onRefreshNewValData = () => {
        this.setState({
            isInbox: [],
            isRefresh: true,
            isSetElm: false
        }, () => this._onRetrieveValTransaction())
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
                {
                  this.state.isSetElm ? <FlatList
                       data={this.state.mutations}
                       keyExtractor={(i, j) => j.toString()}
                       renderItem={({item}) => <PropsMutation item={item} /> }
                       ListEmptyComponent={() => <DotIndicator color='blue' />}
                   /> : <EmptyData color='blue' />
                }
              </Content>
          </RefreshScreen>
      </Container>
    );
  }
}
