'use strict';

import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icond from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/FontAwesome'
import { shome, setNotify } from '../../../helper'

export default class MenuDashboard extends Component {
  render() {
    let { navigation } = this.props;
    return (
      <View>
      <View style={shome.itemWrap}>
            <Text style={shome.txtMenu1}>Menu Apps</Text>
            <View style={{flex: 1}}>
            <Text style={shome.txtMenu2}>See All</Text>
            </View>
        </View>
        <View style={shome.itemWrap}>
        <View style={shome.itemFtDetil}>
            <TouchableOpacity transparent
            onPress={() => navigation.navigate('eletric')}>
            <Icons name='ios-phone-portrait'
                size={35} color='blue'
                style={shome.iconMenus}
            />
            </TouchableOpacity>
            <Text style={shome.ftItem}>Pulsa & Data</Text>
        </View>
        <View style={shome.itemFtDetil}>
         <TouchableOpacity transparent
            onPress={() => navigation.navigate('ppob')}>
            <Icond name='flash-off'
                size={35} color='red'
                style={shome.iconMenu}
            />
            </TouchableOpacity>
            <Text style={shome.ftItem}>Ppob</Text>
        </View>
        <View style={shome.itemFtDetil}>
         <TouchableOpacity transparent
            onPress={() => navigation.navigate('game')}>
            <Icond name='gamepad'
                size={35} color='green'
                style={shome.iconMenu}
            />
            </TouchableOpacity>
            <Text style={shome.ftItem}>Games</Text>
        </View>
        <View style={shome.itemFtDetil}>
         <TouchableOpacity transparent
            onPress={() => navigation.navigate('plnt')}>
            <Icond name='flash-off'
                size={35} color='#a8b319'
                style={shome.iconMenu}
                solid
            />
            </TouchableOpacity>
            <Text style={shome.ftItem}>Token Pln</Text>
        </View>
        <View style={shome.itemFtDetil}>
             <TouchableOpacity transparent
             onPress={() => navigation.navigate('ewallet')}>
                <Icons name='ios-wallet'
                    size={35} color='#00aaff'
                    style={shome.iconMenu}
                />
            </TouchableOpacity>
            <Text style={shome.ftItem}>E-Wallet</Text>
        </View>
        </View>

        <View style={shome.itemWrap}>
        <View style={shome.itemFtDetil}>
            <TouchableOpacity transparent
                onPress={() => navigation.navigate('print')}>
                <Icons name='ios-print'
                    size={35} color='#0047b3'
                    style={shome.iconMenu}
                />
            </TouchableOpacity>
            <Text style={shome.ftItem}>Cetak Struck</Text>
        </View>
        <View style={shome.itemFtDetil}>
        <TouchableOpacity transparent
            onPress={() => setNotify('menu unaviable')}>
            <Icons name='ios-repeat'
                size={35} color='#cc0000'
                style={shome.iconMenu}
            />
            </TouchableOpacity>
            <Text style={shome.ftItem}>Tranfers</Text>
        </View>
        <View style={shome.itemFtDetil}>
        <TouchableOpacity transparent
            onPress={() => navigation.navigate('prices')}>
            <Icons name='ios-pricetags'
                size={35} color='#994d00'
                style={shome.iconMenu} solid
            />
            </TouchableOpacity>
            <Text style={shome.ftItem}>Harga</Text>
        </View>
        <View style={shome.itemFtDetil}>
        <TouchableOpacity transparent
            onPress={() => navigation.navigate('Activity')}>
            <Icond name='clear-all'
                size={35} color='#cc0000'
                style={shome.iconMenu} solid
            />
            </TouchableOpacity>
            <Text style={shome.ftItem}>More ..</Text>
        </View>
        </View>
      </View>
    );
  }
}
