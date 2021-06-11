'use strict';

import React, { Component } from 'react';

import axios from 'axios'
import _ from 'lodash'
import { View, Text, Button, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {
    Container, Content, Form, Item, Label, Icon, Input, Left, Right
} from 'native-base'
import {
    styles, Headerd, setNotfound, setNotEmpty, dev_net, RefreshScreen, EmptyData
} from '../../helper'
import { PropsDownline } from './response'

export default class CheckUpDownlineScreen extends Component {
    state = {
        values: [],
        isSetElm: false,
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
                id: _.get(parse[0], 'agenid')
            }, () => this._onRetrieveValueData())
        } catch(e) {
            console.log(e);
        }
    }

    _onRetrieveValueData = async () => {
        try {
          let results = await axios.get(dev_net()+`/data-user/downline/${this.state.id}`)
          if (_.isEqual(results.data.status, 404)) {
            this.setState({
                isSetReload: false,
            })
          }else {
            this.setState({
                values: results.data.data,
                isSetReload: false,
                isSetElm: true
            })
          }
        } catch(e) {
        console.log(e);
        }
    }

    _onRemoveEveryState = () => {
        this.setState({
            isSetElm: false,
            isSetReload: true,
        }, () => this._onRetrieveValueData())
    }


  render() {
    let { values, isValSet, setNumber, isSetDate } = this.state;
    return (
        <Container>
          <Headerd onPress={() => this.props.navigation.navigate('main')}>
            <Text>List Downline</Text>
          </Headerd>
            <RefreshScreen
              refreshing={this.state.isSetReload}
              onRefresh={this._onRemoveEveryState}
              style={styles.contentStyle}
            >
            <Content style={styles.contentStyle}>
              {
                this.state.isSetElm ? <FlatList
                data={this.state.values}
                keyExtractor={(i, j) => j.toString()}
                renderItem={({item}) => <PropsDownline item={item} /> }
                ListEmptyComponent={() => <DotIndicator color='blue' />}
                /> : <EmptyData color='blue' />
              }
            </Content>
            </RefreshScreen>
      </Container>
    );
  }
}
