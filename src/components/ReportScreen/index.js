'use strict';

import React, { Component } from 'react';

import { Text } from 'react-native';
import { Container, TabHeading, Tab, Tabs } from 'native-base';
import { Headerd, styles } from '../../helper'

import TodayReport from './today.reports'
import YesterdayReport from './yesterday.reports'

export default class ReportScreen extends Component {
  render() {
    return (
       <Container>
         <Headerd onPress={() => this.props.navigation.navigate('Inbox')}>
       <Text>Reports Transaction</Text>
       </Headerd>
        <Tabs>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
                <Text style={styles.txtStyl}>Laporan Hari ini</Text>
              </TabHeading>
            }>
              <TodayReport />
            </Tab>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>Laporan Bulan ini</Text>
              </TabHeading>
            }>
              <YesterdayReport />
             </Tab>
        </Tabs>
      </Container>
    );
  }
}

