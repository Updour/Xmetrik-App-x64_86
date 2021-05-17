'use strict';

import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'
import { View, Text } from 'react-native';
import { List,  ListItem, Left, Button, Icon, Body, Right } from 'native-base'
import { styles } from '../../helper'

const PropsToday = ({item, onPress}) => {
    let { entry_date, ket_status, kode, operator, success_date, tipe_sender, tujuan, vsn } = item
    let { listStyles, txtLeft, txtRight, headerStyles, txtCenter } = styles
    return (
            <View style={styles.listStyles} >
                 <List style={listStyles}>
                 {
                    _.isEqual(ket_status, 'sukses') &&
                    <ListItem noIndent style={styles.txtSuccs}>
                        <Text style={styles.txtCondition}>BERHASIL</Text>
                    </ListItem>
                }

                {
                    _.isEqual(ket_status, 'gagal') &&
                    <ListItem noIndent style={styles.txtFail}>
                        <Text style={styles.txtCondition}>GAGAL</Text>
                    </ListItem>
                }
                {
                    _.isEqual(ket_status, 'process') &&
                    <ListItem noIndent style={styles.txtProcs}>
                        <Text style={styles.txtCondition}>SEDANG PROSESS</Text>
                    </ListItem>
                }
                {
                    _.isEqual(ket_status, 'error') &&
                    <ListItem noIndent style={styles.txtError}>
                        <Text style={styles.txtCondition}>KONEKSI TIMEOUT</Text>
                    </ListItem>
                }
                    <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Masuk</Text>
                        <Text style={txtRight}>{entry_date}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Sukses</Text>
                        <Text style={txtRight}>{success_date}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Produk</Text>
                        <Text style={txtRight}>{kode.toUpperCase()}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>ID Pengirim</Text>
                        <Text style={txtRight}>{tipe_sender}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Nomor Tujuan</Text>
                        <Text style={txtRight}>{tujuan}</Text>
                    </ListItem>
                     <ListItem noIndent button={true}>
                        <Text selectable={true} style={txtCenter}>{vsn}</Text>
                    </ListItem>
                </List>
            </View>
    )
}


export {PropsToday}
