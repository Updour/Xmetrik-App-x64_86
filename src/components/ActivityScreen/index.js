'use strict';

import React, { Component } from 'react';

import { View, Text, FlatList } from 'react-native';
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'
import {
    Container, Content,
} from 'native-base';

import { Headerd, styles, Maintenance, DotIndicator } from '../../helper'
import { PropsMenus, menu } from './response'
export default class ActivityScreen extends Component {
  state = {
    setMenu: []
  }

  componentDidMount() {
    this._onRetrieveValStorage()
  }

  _onRetrieveValStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@keySign')
      let parse = JSON.parse(val)
      let dist = _.get(parse[0], 'distributor')
      let subdist = _.get(parse[0], 'sub_distributor')
      if (_.isNull(parse)) {
          setNotfound(parse)
      }else {
        return _.isEqual(dist, '0') || _.isEqual(subdist, '0') ?
          this.setState({ setMenu: _.filter(menu, i => _.isEqual(i.type, 'sd') || _.isEqual(i.type, 'xd')) }) :
          this.setState({ setMenu: _.filter(menu, i => _.isEqual(i.type, 'xd')) })
      }
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
       <Container>
         <Headerd onPress={() => this.props.navigation.navigate('Dashboard')}>
          <Text>Activity</Text>
         </Headerd>
           <Content style={styles.contentStyle}>
            <FlatList
              data={this.state.setMenu}
              keyExtractor={(i, j) => j.toString()}
              renderItem={({item}) => <PropsMenus item={item}
              onPress={() => this.props.navigation.navigate(item.nav)}/>}
              ListEmptyComponent={() => <DotIndicator color='blue' />}
            />
          </Content>
      </Container>
    );
  }
}

