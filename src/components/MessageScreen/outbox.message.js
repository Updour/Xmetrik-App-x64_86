'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { FlatList, View, Text } from 'react-native';
import { Container, Content } from 'native-base'

import { styles, setNotify, RefreshScreen, EmptyData, dev_net, DotIndicator } from '../../helper'
import { ResultsOutbox  } from './results.message'


export default class OutboxMessage extends Component {
    state = {
        isOutbox: [],
        isSetElm: false,
        isSetAll: false,
        isRefresh: false
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
            }, () => setTimeout(() => this._onRetrieveValOutboxMessage(), 575))
        } catch(e) {
            console.log(e);
        }
    }

    _onRetrieveValOutboxMessage = async () => {
        try {
            let uril = dev_net()+`outbox-user/${this.state.agenid}`
            let results = await axios.get(uril)
            if (_.isEqual(results.data.status, 404)) {
                // console.log(results.data.data)
                this.setState({
                    isSetElm: false
                }, () => setNotify(results.data.msg))
            }else {
                this.setState({
                    isoutbox: results.data.data,
                    isSetElm: true,
                    isRefresh: false
                })
            }
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }

    _onShowingOutboxModal = val => {
        try {
            let urii = dev_net()+`outbox-users/${this.state.agenid}/${val}`
            this.setState({ isSetAll: !this.state.isSetAll }, async () => {
                let results = await axios.get(urii)
                console.log(urii, results.data)
                if (_.isEqual(results.data.status, 404)) {
                    this.setState({

                    }, () => setNotify(results.data.msg))
                }else {
                    this.setState({
                        isMessageOutbox: _.get(results.data.data[0], 'out_message'),
                    })
                }
            })
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }

    _onRefreshNewValData = () => {
        this.setState({
            isoutbox: [],
            isRefresh: true,
        }, () => this._onRetrieveValOutboxMessage())
    }
  render() {
    return (
      <Container>
      <RefreshScreen
        refreshing={this.state.isRefresh}
        onRefresh={this._onRefreshNewValData}
        style={styles.contentStyle}
      >
          <Content style={styles.contentStyle}>
            {
                this.state.isSetElm ?
                <FlatList
                    data={this.state.isoutbox}
                    keyExtractor={(i, j) => j.toString()}
                    renderItem={({item}) => <ResultsOutbox item={item}
                    onPress={() => this._onShowingOutboxModal(item.id)} />}
                    ListEmptyComponent={() => <DotIndicator color='blue' />}
                 /> : <EmptyData color='blue' />
             }
          </Content>
          </RefreshScreen>
          {
            this.state.isSetAll ?
                <View style={styles.contentStyle}>
              <View style={styles.snackStyles}>
              <Text selectable style={styles.txtSnack}>{this.state.isMessageOutbox}</Text>
              </View>
              </View> : null
          }
      </Container>
    );
  }
}
