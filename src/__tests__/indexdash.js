'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import {
  View, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container, Header, Title, Content, Text, Card, Icon, Button

} from 'native-base';
import { Statusbar, styles, shome } from '../../helper'


export default class DashboardScreen extends Component {
    _isMounted = false;
    state = {}

    componentDidMount() {
        this._onMakeValStorageLocally()
    }
     _onMakeValStorageLocally = async () => {
        let onNumb = await AsyncStorage.getItem('@keySign')
        console.log('1', onNumb)
    }

  render() {
    return (
        <Container>
            <Header style={styles.headerStyles}>
                <Text style={shome.txtTitle}>X-METRIK</Text>
                <Statusbar />
            </Header>
            <Content style={styles.contentStyle}>
                <View>
                    <Content style={shome.contentTop} />
                        <Content style={shome.contentRender}>
                            <Card style={shome.cardStyles}>
                                <View style={shome.contenAgent}>
                                    <Text style={shome.cardText}>SD08008</Text>
                                    <Icon name='ios-refresh' style={shome.cardReload}
                                    onPress={{}}
                                    />
                                </View>
                            <View style={{alignItems: "center"}}>
                                <View style={shome.wrapContent}>
                                    <Text style={shome.RpStyleSal}>Rp </Text>
                                    <Text style={shome.textPriceSal}>10000</Text>
                                </View>
                            </View>
                            <View style={shome.content}>
                                <View style={shome.wrapContent}>
                                    <Text style={shome.RpStyle}>Bonus: </Text>
                                    <Text style={shome.textPrice}>10000000</Text>
                                    <Text style={shome.RpStyle}>Komisi: </Text>
                                    <Text style={shome.textPrice}>10000000</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={shome.btnDeposits}
                                onPress={{}}>
                                <Text style={shome.textDeposits}>Deposit</Text>
                            </TouchableOpacity>
                        </Card>
                <Text>aaaa</Text>
                    </Content>
                </View>
            </Content>
        </Container>
    );
  }
}


'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import {
  View, Image, Text, TouchableOpacity, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container, Header, Title, Content, Card, Button, Icon, Left, Body, Right
} from 'native-base';
import Icons from 'react-native-vector-icons/Ionicons';
import { Statusbar, styles, shome } from '../../helper'


export default class DashboardScreen extends Component {
    _isMounted = false;
    state = {}

    componentDidMount() {
        this._onMakeValStorageLocally()
    }
     _onMakeValStorageLocally = async () => {
        let onNumb = await AsyncStorage.getItem('@keySign')
        console.log('1', onNumb)
    }

  render() {
    return (
        <Container>
        <Header style={shome.header}>
        <Left>
         <Image
          style={{width: 35, height: 35, marginTop: 4}}
          source={require('../../assets/images/dashboard/avatar.png')}
        />
        </Left>
        <Body>
        <Text style={shome.txtBody}>Jhonson</Text>
        <Text style={shome.txtBody}>+628817628371623</Text>
        </Body>
        <Right>
        <Button transparent style={{alignSelf: 'flex-end'}}>
        <Icon name='ios-arrow-forward' style={{color: '#e6ffff'}}/>
        </Button>
        </Right>
        </Header>
        <Statusbar />
        <Content style={styles.contentStyle}>
        <View>
        <Content style={shome.contentTop} />
        <Content style={shome.contentRender}>
        <View style={shome.cardStyl}>
        <View style={shome.viewRow}>
        <View style={shome.viewText}>
        <Text style={shome.txtIdd}>SD0899812</Text>
        <Text style={shome.txtId}>Rp. 90000000</Text>
        </View>
        <TouchableOpacity style={shome.btnDeposits}>
        <Text style={shome.textDeposits}>Top Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={shome.btnRefresh}>
        <Icons name="md-refresh" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        </View>
        <View style={shome.cardStyles}>
        <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        <Card style={shome.itemDetil}>
        <Text style={shome.txtItem}>Commission</Text>
        <View style={shome.itemWrap}>
        <Text style={shome.txtItemd}>Rp. </Text>
        <Text style={shome.txtItems}>10.000.000</Text>
        </View>
        </Card>
        <Card style={shome.itemDetil}>
        <Text style={shome.txtItem}>Bonus</Text>
        <View style={shome.itemWrap}>
        <Text style={shome.txtItemd}>Rp. </Text>
        <Text style={shome.txtItems}>10.000.000</Text>
        </View>
        </Card>
        <Card style={shome.itemDetil}>
        <Text style={shome.txtItem}>Last Balance</Text>
        <View style={shome.itemWrap}>
        <Text style={shome.txtItemd}>Rp. </Text>
        <Text style={shome.txtItems}>10.000.000</Text>
        </View>
        </Card>
        </ScrollView>
        </View>
        </View>

        <Content style={shome.contentStyl}>
        <View style={shome.itemWrap}>
            <Text style={shome.txtMenu1}>Menu Apps</Text>
            <View style={{flex: 1}}>
            <Text style={shome.txtMenu2}>See All</Text>
            </View>
        </View>

         <View style={shome.itemWrap}>
        <View style={shome.itemFtDetil}>
            <Icons name='ios-phone-portrait'
                size={35} color='blue'
                style={shome.iconMenu}
            />
            <Text style={shome.ftItem}>Pulsa & Data</Text>
        </View>
        <View style={shome.itemFtDetil}>
        <Text style={shome.ftItem}>Buy PLN, PDAM .. </Text>
        <Icons name='ios-flash-off' size={35} color='blue' style={{textAlign: 'center'}}/>
        <Text style={shome.ftItems}>PPOB</Text>
        </View>
        <View style={shome.itemFtDetil}>
        <Text style={shome.ftItem}>Last Balance</Text>
        <Icons name='ios-phone-portrait' size={35} color='blue' style={{textAlign: 'center'}}/>
        <Text style={shome.ftItems}>PLN TOKEN</Text>
        </View>
        </View>
        <View style={shome.itemWrap}>
        <View style={shome.itemFtDetil}>
        <Text style={shome.ftItem}>Last Balance</Text>
        <Icons name='ios-phone-portrait' size={35} color='blue' style={{textAlign: 'center'}}/>
        <Text style={shome.ftItems}>E-WALLET</Text>
        </View>
        <View style={shome.itemFtDetil}>
        <Text style={shome.ftItem}>Last Balance</Text>
        <Icons name='ios-phone-portrait' size={35} color='blue' style={{textAlign: 'center'}}/>
        <Text style={shome.ftItems}>GAME</Text>
        </View>
        <View style={shome.itemFtDetil}>
        <Text style={shome.ftItem}>Last Balance</Text>
        <Icons name='ios-phone-portrait' size={35} color='blue' style={{textAlign: 'center'}}/>
        <Text style={shome.ftItems}>TRANSFER</Text>
        </View>
        </View>
        </Content>
        </Content>
        </View>
        </Content>
        </Container>
    );
  }
}
