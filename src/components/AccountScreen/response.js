'use strict';

import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'
import { View, Text, Switch, Image, Button, TouchableOpacity } from 'react-native';
import { List, Input, ListItem, Left, Icon, Body, Right } from 'native-base'
import { styles, sign, formatPrice } from '../../helper'

const PropsProfile = ({
    item, onPress, Logout, Policy, About, Lock, setVal, setPin, Sender,
    pinVal, setValPin, nameVal, setPropsName, onChange, val, onPressed
}) => {
    let { agenid, uname, alamat, active, sender, tgl_daftar, pin, tgl_aktif } = item
    let { listStyles, txtLeft, txtInfo, txtRight, txtCenter } = styles
    return (
        <View>
            <Text style={txtInfo}>Personal Information</Text>
                 <List style={listStyles}>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Alamat</Text>
                        <Text style={txtRight}>{_.toUpper(alamat)}</Text>
                    </ListItem>
                    <ListItem noIndent style={{backgroundColor: '#ccffee'}}>
                    <TouchableOpacity style={styles.itemWrap} onPress={setPin}>
                        <Text style={txtLeft}>PIN Pengguna</Text>
                        <Text style={txtRight}>{setValPin ? '******' : pin}</Text>
                        </TouchableOpacity>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Daftar</Text>
                        <Text style={txtRight}>{tgl_daftar}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Terahir Aktif</Text>
                        <Text style={txtRight}>{moment(active).startOf('hour').fromNow()}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Terahir Login</Text>
                        <Text style={txtRight}>{moment(tgl_aktif).startOf('hour').fromNow()}</Text>
                    </ListItem>
                     <ListItem noIndent style={{backgroundColor: '#ccffee'}}>
                        <TouchableOpacity style={styles.itemWrap} onPress={setPropsName}>
                            {
                                nameVal ?
                                <Text selectable={true} style={txtCenter}>{uname}</Text> :
                                <View style={{ flex: 1, justifyContent: 'center',}}>
                                <Input
                                    onChangeText={onChange}
                                    placeholder={val}
                                />
                                <Button
                                    onPress={onPressed}
                                    title="Ganti Nama"
                                    color="#66a3ff"
                                />
                                </View>
                            }
                        </TouchableOpacity>
                    </ListItem>
                </List>

                <Text style={[txtInfo, {marginTop: 2}]}>About Application</Text>
                <List style={[listStyles, {marginTop: 8}]}>
                    <ListItem noIndent style={{backgroundColor: '#ccffee'}}>
                        <TouchableOpacity style={styles.itemWrap} onPress={Lock}>
                            <Text style={txtLeft}>Kunci Aplikasi</Text>
                            <Switch value={setVal} />
                        </TouchableOpacity>
                    </ListItem>
                    <ListItem noIndent>
                        <TouchableOpacity style={styles.itemWrap} onPress={Policy}>
                            <Text style={txtLeft}>Kebijakan & Privasi</Text>
                            <Icon name='ios-arrow-forward' style={[txtRight, {marginTop: 2}]} />
                        </TouchableOpacity>
                    </ListItem>
                    <ListItem noIndent>
                        <TouchableOpacity style={styles.itemWrap} onPress={About}>
                            <Text style={txtLeft}>Tentang Aplikasi</Text>
                            <Icon name='ios-arrow-forward' style={[txtRight, {marginTop: 2}]} />
                        </TouchableOpacity>
                    </ListItem>
                </List>
                 <List style={[listStyles, {marginTop: 8}]}>
                   <ListItem noIndent>
                        <TouchableOpacity style={styles.itemWrap} onPress={Logout}>
                            <Text style={txtLeft}>Logout Aplikasi</Text>
                            <Icon name='ios-arrow-forward' style={[txtRight, {marginTop: 2}]} />
                        </TouchableOpacity>
                    </ListItem>
                </List>

            </View>
    )
}
export { PropsProfile }

