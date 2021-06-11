'use strict';

import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { List, Input, ListItem, Left, Button, Icon, Body, Right } from 'native-base'
import { styles, formatPrice } from '../../helper'

const PropsDownline = ({item, onPress}) => {
    let { agenid, nama, alamat, kota, saldo } = item
    let { listStyles, txtLeft, txtRight, txtCenter } = styles
    return (
            <View style={styles.listStyles} >
                 <List style={listStyles}>
                 <ListItem noIndent button={true}>
                        <Text selectable={true} style={txtCenter}>{nama}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Agenid</Text>
                        <Text style={txtRight}>{_.toUpper(agenid)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Alamat</Text>
                        <Text style={txtRight}>{alamat}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Kota</Text>
                        <Text style={txtRight}>{kota}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Sisa Saldo</Text>
                        <Text style={txtRight}>Rp. {formatPrice(saldo)}</Text>
                    </ListItem>

                </List>
            </View>
    )
}

const PropsShowBonus = ({item, onPress}) => {
    let { up_price, operator, agenid, nama, kota } = item
    let { listStyles, txtLeft, txtRight, txtCenter } = styles
    return (
            <TouchableOpacity onPress={onPress}>
                 <List style={listStyles} pointerEvents="none">
                 <ListItem noIndent button={true}>
                        <Text selectable={true} style={txtCenter}>{_.toUpper(operator)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Agenid</Text>
                        <Text style={txtRight}>{_.toUpper(agenid)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Nama</Text>
                        <Text style={txtRight}>{_.toUpper(nama)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Harga Markup</Text>
                        <Text style={txtRight}>{formatPrice(up_price)}</Text>
                    </ListItem>
                   {/* <ListItem noIndent button={true}>
                        <Text selectable={true} style={txtCenter}>Tekan untuk setting bonus</Text>
                    </ListItem>*/}
                </List>
             </TouchableOpacity>
    )
}

const PropsSetBonus = ({item, onPress, onChangeText, value}) => {
    let { up_price, operator, agenid, nama, kota } = item
    let { listStyles, txtLeft, txtRight, txtCenter, btnSubmit, textSubmit } = styles
    return (
       <List style={listStyles}>
           <ListItem noIndent button={true}>
            <Text selectable={true} style={txtCenter}>{_.toUpper(operator)}</Text>
           </ListItem>
           <ListItem noIndent>
               <Text style={txtLeft}>Agenid</Text>
               <Text style={txtRight}>{_.toUpper(agenid)}</Text>
           </ListItem>
           <ListItem noIndent>
               <Text style={txtLeft}>Nama</Text>
               <Text style={txtRight}>{_.toUpper(nama)}</Text>
           </ListItem>
           <ListItem noIndent>
               <Text style={txtLeft}>Harga Markup</Text>
               <Input
                   style={styles.txtNumb}
                   placeholder="Input Harga Markup"
                   placeholderTextColor='#bfbfbf'
                   onChangeText={onChangeText}
                   value={value}
                   maxLength={3}
                   keyboardType='phone-pad'
                   autoFocus={true}
               />
           </ListItem>
           <TouchableOpacity onPress={onPress} style={btnSubmit}>
                <Text style={textSubmit}>Save Changes</Text>
           </TouchableOpacity>
       </List>
    )
}
// data menu
const menu = [
        {
            "id": 1,
            "type": "sd",
            "nav": "bonus",
            "img": require("../../assets/images/activity/setting.png"),
            "uname": "Setting Bonus",
            "info": "Melakukan setting bonus downline"
        },
        {
            "id": 2,
            "type": "sd",
            "nav": "reg",
            "img": require("../../assets/images/activity/reg.png"),
            "uname": "Registrasi Downline",
            "info": "Melakukan pendaftaran downline baru"
        },
        {
            "id": 3,
            "type": "sd",
            "nav": "checkup",
            "img": require("../../assets/images/activity/fl.png"),
            "uname": "Daftar Downline",
            "info": "Melihat data downline"
        },
        {
            "id": 4,
            "type": "xd",
            "nav": "withdraw",
            "img": require("../../assets/images/activity/transfer.png"),
            "uname": "Transfer & Tarik Saldo",
            "info": "Melakukan transfer & tarik saldo"
        },
        {
            "id": 5,
            "type": "xd",
            "nav": "topup",
            "img": require("../../assets/images/activity/ticket.png"),
            "uname": "Deposit",
            "info": "Melakukan penambahan saldo transaksi"
        }
    ]
// menu activity
const PropsMenus = ({item, onPress}) => {
    let { type, nav, img, uname, info } = item
    let { listStyles, txtLeft, imgStyle, txtNote } = styles
    return (
        <TouchableOpacity onPress={onPress}>
            <List style={listStyles} pointerEvents="none">
                <ListItem avatar>
                    <View>
                        <Image style={imgStyle} source={img} />
                    </View>
                    <Body>
                        <Text style={[txtLeft, {fontWeight: '600', color: '#404040', fontSize: 15, fontStyle: 'italic'}]}>{uname}</Text>
                        <Text style={txtNote}>{info}</Text>
                    </Body>
                    <Right>
                        <Text style={txtNote}>activity</Text>
                    </Right>
                </ListItem>
            </List>
            </TouchableOpacity>
    )
}


export {
    menu,
    PropsDownline,
    PropsMenus,
    PropsShowBonus,
    PropsSetBonus
}


