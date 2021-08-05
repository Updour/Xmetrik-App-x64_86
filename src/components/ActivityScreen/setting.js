'use strict';

import React, { Component } from 'react';

import { Text } from 'react-native';
import { Container, TabHeading, Tab, Tabs,ScrollableTab } from 'native-base';
import { Headerd, styles } from '../../helper'

import SettingBonusScreen from './setting.bonus.screen'
import MoreBonusScreen from './setting.more.bonus.screen.js'

export default class ReportScreen extends Component {
  render() {
    return (
       <Container>
         <Headerd onPress={() => this.props.navigation.navigate('main')}>
       <Text>Settings Bonus</Text>
       </Headerd>
        <Tabs renderTabBar={()=> <ScrollableTab style={styles.headerStyles}/>}>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
                <Text style={styles.txtStyl}>Bonus Downline</Text>
              </TabHeading>
            }>
              <SettingBonusScreen {...this.props}/>
            </Tab>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>Bonus Downline Baru</Text>
              </TabHeading>
            }>
              <MoreBonusScreen {...this.props}/>
             </Tab>

        </Tabs>
      </Container>
    );
  }
}

