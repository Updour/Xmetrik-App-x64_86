'use strict';

import React, { Component } from 'react';

import _ from 'lodash'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  View, Text, FlatList, ScrollView, Alert, Image, TouchableOpacity
} from 'react-native';
import {
   Container, Content, Header, Left, Body, Right, Button, Card
} from 'native-base';

import {
  Headerd, styles, dev_net, setNotify, setNotfound, DotIndicator, shome, Statusbar, formatPrice
} from '../../helper'
import { PropsProfile } from './response'

export default class AccountScreen extends Component {
  state = {
    values: [],
    setValues: [],
    setName: '',
    isSwicth: false,
    isChange: false,
    isSetSender: false
  }

    componentDidMount() {
      this._onRetrieveValStorage()
    }

    _onRetrieveValStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('@keySign')
            let vals = await AsyncStorage.getItem('#keyLock')
            let parse = JSON.parse(val)
              if (_.isNull(vals)) {
               setNotfound(`Application lock not set`)
               this.setState({
                  id: _.get(parse[0], 'agenid'),
                  hp: _.get(parse[0], 'sender').replace('0', '+62'),
                  values: parse,
                  isSwicth: false,
                  isChange: false,
                }, () => this._onRetrieveValStockiests())
              }else {
                this.setState({
                  id: _.get(parse[0], 'agenid'),
                  hp: _.get(parse[0], 'sender').replace('0', '+62'),
                  values: parse,
                  isSwicth: true,
                  isChange: true,
                }, () => this._onRetrieveValStockiests())
              }
        } catch(e) {
            console.log(e);
        }
    }

      _onRetrieveValStockiests = async () => {
        try {
           let uril = dev_net()+`data-user/${this.state.id}`
           let results = await axios.get(uril)
           let pair = {uname: results.data.data[0].nama, active:results.data.data[0].active};
           if (_.isEqual(results.data.status, 404)) return setNotify(results.data.msg)
            // console.log([{...this.state.values[0], ...pair}])
            this.setState({
              setValues: [{...this.state.values[0], ...pair}],
              bal: _.get(results.data.data[0], 'saldo'),
              bonus: _.get(results.data.data[0], 'bonus'),
              lasBal: _.get(results.data.data[0], 'last_balance'),
              uname: _.get(results.data.data[0], 'nama'),
              isChange: true,
            }, () => setNotify(`preparing data ..`))
         }catch(e) {
            setNotify(e)
          }
      }

    _onChangeUnameUser = async (val) => {
      try {
        let uri = dev_net()+`data-user/change/${val}`
        let results = await axios.put(uri, {nama: this.state.setName})
        if (_.isEqual(results.data.status, 201)) {
          this.setState({ isChange: true }, () => this._onRetrieveValStockiests())
        }else {
          setNotify(`Internal Error`, results.data)
        }
      } catch(e) {
        setNotify(e)
        console.log(e);
      }
    }

    _onNotifyLogOutScreen = () => Alert.alert(
      "Peringatan !!",
      "Apakah anda yakin mau keluar dari aplikasi & menghapus data login?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
            text: "OK", onPress: async () => {
               await AsyncStorage.removeItem('@keySign')
               await AsyncStorage.removeItem('@keyHp')
               await AsyncStorage.removeItem('@keyPin')
               await AsyncStorage.removeItem('@keyPassword')
               await AsyncStorage.removeItem('@keyLog')
               setTimeout(() => this.props.navigation.navigate("sign"), 3000)
            }
        }
      ]
    );
  render() {
    let { navigation } = this.props
    let { id, hp, uname, bonus, bal, lasBal} = this.state;
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
                                        <Text style={shome.txtItems}>0</Text>
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
            </ScrollView>
            <View style={{marginTop: -65}}>
                <FlatList
                data={this.state.setValues}
                keyExtractor={(i, j) => j.toString()}
                renderItem={({item}) => <PropsProfile item={item}
                  onPressed={() => this._onChangeUnameUser(item.agenid)}
                  onChange={setName => this.setState({setName})}
                  val={item.uname}
                  setPropsName={() => this.setState({isChange: !this.state.isChange})}
                  nameVal={this.state.isChange}
                  setPin={() => this.setState({isChange: !this.state.isChange})}
                  setValPin={this.state.isChange}
                  setVal={this.state.isSwicth}
                  Sender={() => () => this.setState({ isSetSender: !this.state.isSetSender })}
                  Policy={() => navigation.navigate('policy')}
                  Lock={() => navigation.navigate('lock')}
                  About={() => navigation.navigate('about')}
                  Logout={this._onNotifyLogOutScreen}
                />}
                ListEmptyComponent={() => <DotIndicator color='blue' />}
              />
            </View>
          </Content>
      </Container>
    );
  }
}

