'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { FlatList } from 'react-native';
import { Container, Content } from 'native-base'

import { styles, setNotify, dev_net, RefreshScreen, EmptyData, DotIndicator } from '../../helper'
import { ResultsInbox } from './results.message'


export default class InboxMessage extends Component {
    state = {
        isInbox: [],
        isSetElm: false
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
                agenid: _.get(parse[0], 'agenid')
            }, () => setTimeout(() => this._onRetrieveValInboxMessage(), 725))
        } catch(e) {
            console.log(e);
        }
    }

    _onRetrieveValInboxMessage = async () => {
        try {
            let uril = dev_net()+`inbox-user/${this.state.agenid}`
            let results = await axios.get(uril)
            if (_.isEqual(results.data.status, 404)) {
                this.setState({
                    isSetElm: false
                }, () => setNotify(results.data.msg))
            }else {
                console.log(results.data)
                this.setState({
                    isInbox: results.data.data,
                    isSetElm: true,
                    isRefresh: false
                })
            }
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }

     _onRefreshNewValData = () => {
        this.setState({
            isInbox: [],
            isRefresh: true,
            isSetElm: false
        }, () => this._onRetrieveValInboxMessage())
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
                this.state.isSetElm ?
                <FlatList
                  data={this.state.isInbox}
                  keyExtractor={(i, j) => j.toString()}
                  renderItem={({item}) => <ResultsInbox item={item} /> }
                  ListEmptyComponent={() => <DotIndicator color='blue' />}
                /> : <EmptyData color='blue' />
             }

          </Content>
          </RefreshScreen>
      </Container>
    );
  }
}
