'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import {
  View, Image, Text, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container, Header, Title, Content, Card, Button, Icon, Left, Body, Right
} from 'native-base';
import Icons from 'react-native-vector-icons/Ionicons';
import Icond from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/FontAwesome'

import { Statusbar, styles, setNotify, setNotfound, shome, dev_net, formatPrice } from '../../helper'
import MenuDashboard from './components/menu.dashboard'
import StatusDashboard from './components/status.menu'
import RecentDashboard from './components/recent.menu'

export default class DashboardScreen extends Component {
    _isMounted = false;
    state = {
        users: [],
    }

    componentDidMount() {
        this._isMounted = true;
        this._onRetrieveValStorage()
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    _onRetrieveValStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('@keySign')
            let parse = JSON.parse(val)
            let { agenid, saldo, bonus, sender, nama,  } = parse[0]
            if (this._isMounted) {
            return _.isNull(parse) ? setNotfound() :
            this.setState({
                id: _.get(parse[0], 'agenid'),
                hp: _.get(parse[0], 'sender').replace('0', '+62'),
                // uname: _.get(parse[0], 'nama')
            }, () => setTimeout(() => this._onRetrieveValStockiests(), 575))
        }
        } catch(e) {
            console.log(e);
        }
    }

    _onRetrieveValStockiests = async () => {
        try {
         let uril = dev_net()+`data-user/${this.state.id}`
         let results = await axios.get(uril)
             if (_.isEqual(results.data.status, 404)) {
                this.setState({
                }, () => setNotify(results.data.msg))
            }else {
                this.setState({
                    bal: _.get(results.data.data[0], 'saldo'),
                    bonus: _.get(results.data.data[0], 'bonus'),
                    komisi: _.get(results.data.data[0], 'komisi'),
                    lasBal: _.get(results.data.data[0], 'last_balance'),
                    uname: _.get(results.data.data[0], 'nama'),
                }, () => setNotify(`preparing data ..`))
            }
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }

    _onRemoveLocallyStorage = async () => {
       await AsyncStorage.removeItem('@keySign')
       await AsyncStorage.removeItem('@keyHp')
       await AsyncStorage.removeItem('@keyPin')
       await AsyncStorage.removeItem('@keyPassword')
       await AsyncStorage.removeItem('@keyLog')
       setTimeout(() => this.props.navigation.navigate("sign"), 3000);
    }
    _onNotifyLogOutScreen = () =>
    Alert.alert(
      "Peringatan !!",
      "Apakah anda yakin mau keluar dari aplikasi & menghapus data login?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
            text: "OK", onPress: () => this._onRemoveLocallyStorage()
        }
      ]
    );
  render() {
    let { id, hp, uname, bonus, bal, lasBal, komisi } = this.state;
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
                    <Text style={shome.txtBody}>{uname}</Text>
                    <Text style={shome.txtBody}>{hp}</Text>
                </Body>
                <Right>
                    <Button transparent style={{alignSelf: 'flex-end'}}
                    onPress={this._onNotifyLogOutScreen}>
                        <Icons name='ios-log-out' size={24} style={{color: '#e6ffff'}}/>
                    </Button>
                </Right>
            </Header>
        <Statusbar />
        <Content style={styles.contentStyle}>
        <ScrollView
          showsHorizontalScrollIndicator={false}>
                <Content style={shome.contentTop}></Content>
                    <Content style={shome.contentRender}>
                        <View style={shome.cardStyl}>
                            <View style={shome.viewRow}>
                                <View style={shome.viewText}>
                                    <Text style={shome.txtIdd}>{id}</Text>
                                    {formatPrice(bal) == 'NaN' ?
                                    <Text style={shome.txtId}>Rp. 0</Text> :
                                    <Text style={shome.txtId}>Rp. {formatPrice(bal)}</Text>
                                    }
                                </View>
                                <TouchableOpacity style={shome.btnDeposits}
                                onPress={() => this.props.navigation.navigate('topup')}>
                                    <Text style={shome.textDeposits}>Top Up</Text>
                                </TouchableOpacity>
                                 <TouchableOpacity style={shome.btnRefresh}
                                 onPress={this._onRetrieveValStockiests}>
                                <Icons name="md-refresh" size={30} color="#4F8EF7" />
                                </TouchableOpacity>

                            </View>

                            <View style={shome.cardStyles}>
                            <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                            <Card style={shome.itemDetil}>
                                <Text style={shome.txtItem}>Bonus</Text>
                                    <View style={shome.itemWrap}>
                                        <Text style={shome.txtItemd}>Rp. </Text>
                                        <Text style={shome.txtItems}>{formatPrice(bonus)}</Text>
                                    </View>
                            </Card>
                            <Card style={shome.itemDetil}>
                                <Text style={shome.txtItem}>Commission</Text>
                                    <View style={shome.itemWrap}>
                                        <Text style={shome.txtItemd}>Rp. </Text>
                                        <Text style={shome.txtItems}>{formatPrice(komisi)}</Text>
                                    </View>
                            </Card>
                            <Card style={shome.itemDetil}>
                                <Text style={shome.txtItem}>Last Balance</Text>
                                    <View style={shome.itemWrap}>
                                        <Text style={shome.txtItemd}>Rp. </Text>
                                        <Text style={shome.txtItems}>{formatPrice(lasBal)}</Text>
                                    </View>
                            </Card>
                            </ScrollView>
                            </View>
                        </View>
                </Content>
                    <View style={[shome.contentStyl, {marginTop: -57}]}>
                        <MenuDashboard {...this.props} />
                    </View>
                    <View style={[shome.contentStyl, {height: 200}]}>
                        <RecentDashboard {...this.props} />
                    </View>
            </ScrollView>
        </Content>
        </Container>
    );
  }
}
