'use strict';

import React, { Component } from 'react';

import { Text } from 'react-native';
import { Container, TabHeading, Tab, Tabs } from 'native-base';
import { Headerd, styles } from '../../../helper'

import RegularEletric from './regular.eletric'
import PackageEletric from './package.eletric'

export default class EletricScreen extends Component {
  render() {
    return (
       <Container>
         <Headerd onPress={() => this.props.navigation.navigate('Dashboard')}>
       <Text>Pulsa</Text>
       </Headerd>
        <Tabs>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
                <Text style={styles.txtStyl}>Regular</Text>
              </TabHeading>
            }>
            <RegularEletric {...this.props}/>
            </Tab>
            <Tab heading={
              <TabHeading style={styles.headerStyles}>
              <Text style={styles.txtStyl}>Paket Data</Text>
              </TabHeading>
            }>
              <PackageEletric {...this.props}/>
             </Tab>

        </Tabs>
      </Container>
    );
  }
}

