'use strict';

import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'
import { View, Text } from 'react-native';
import { List,  ListItem, Left, Button, Icon, Body, Right } from 'native-base'
import { styles, formatPrice } from '../../helper'

const PropsToday = ({item, onPress}) => {
    let {
        entry_date, ket_status, status_ppob, kode, operator, success_date, tipe_sender,
        tujuan, vsn, tagihan, atas_nama, adm, total_bayar
    } = item
    let { listStyles, txtLeft, txtRight, headerStyles, txtCenter } = styles
    return (
            <View style={styles.listStyles} >
                 <List style={listStyles}>
                 {
                    _.isEqual(ket_status, 'sukses') &&
                    <ListItem noIndent style={styles.txtSuccs}>
                        <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} BERHASIL</Text>
                    </ListItem>
                }

                {
                    _.isEqual(ket_status, 'gagal') &&
                    <ListItem noIndent style={styles.txtFail}>
                        <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} GAGAL</Text>
                    </ListItem>
                }
                {
                    _.isEqual(ket_status, 'process') &&
                    <ListItem noIndent style={styles.txtProcs}>
                        <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} SEDANG PROSESS</Text>
                    </ListItem>
                }
                {
                    _.isEqual(ket_status, 'error') &&
                    <ListItem noIndent style={styles.txtError}>
                        <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} KONEKSI TIMEOUT</Text>
                    </ListItem>
                }
                {
                    _.isEqual(ket_status, 'pending') &&
                    <ListItem noIndent style={styles.txtPend}>
                        <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} DALAM ANTRIAN</Text>
                    </ListItem>
                }

                    <ListItem noIndent>
                        <Text style={txtLeft}>Nomor Tujuan</Text>
                        <Text style={txtRight}>{tujuan}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Masuk</Text>
                        <Text style={txtRight}>{entry_date}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Sukses</Text>
                        <Text style={txtRight}>{success_date}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Type/ Produk</Text>
                        <Text style={txtRight}>{`${_.toUpper(operator)}/ ${kode.toUpperCase()}`}</Text>
                    </ListItem>
                    {
                        _.isEqual(operator, 'ppob') &&
                        <View>
                        <ListItem noIndent>
                            <Text style={txtLeft}>Tagihan/ Admin</Text>
                            <Text style={txtRight}>Rp. {`${formatPrice(tagihan)}/ ${adm}`}</Text>
                        </ListItem>
                        <ListItem noIndent>
                            <Text style={txtLeft}>Atas Nama</Text>
                            <Text style={txtRight}>{atas_nama}</Text>
                        </ListItem>
                        <ListItem noIndent>
                            <Text style={txtLeft}>Total Bayar</Text>
                            <Text style={txtRight}>Rp. {formatPrice(total_bayar)}</Text>
                        </ListItem>
                        </View>
                    }
                    <ListItem noIndent>
                        <Text style={txtLeft}>ID Pengirim</Text>
                        <Text style={txtRight}>{tipe_sender}</Text>
                    </ListItem>
                     <ListItem noIndent button={true}>
                        <Text selectable={true} style={txtCenter}>{vsn}</Text>
                    </ListItem>
                </List>
            </View>
    )
}


const PropsMutation = ({item, onPress}) => {
    let {
        tanggal, status, produk, no_tujuan, vsn, debet, kredit, last_saldo, saldo
    } = item
    let { listStyles, txtLeft, txtRight, headerStyles, txtCenter } = styles
    return (
            <View style={styles.listStyles} >
                 <List style={listStyles}>
                 {
                    _.isEqual(status, 'sukses') &&
                    <ListItem noIndent style={styles.txtSuccs}>
                        <Text style={styles.txtCondition}>BERHASIL</Text>
                    </ListItem>
                }

                {
                    _.isEqual(status, 'Gagal') &&
                    <ListItem noIndent style={styles.txtFail}>
                        <Text style={styles.txtCondition}>GAGAL</Text>
                    </ListItem>
                }
                {
                    _.isEqual(status, 'pending') &&
                    <ListItem noIndent style={styles.txtProcs}>
                        <Text style={styles.txtCondition}>SEDANG PROSESS</Text>
                    </ListItem>
                }
                {
                    _.isEqual(status, 'Refund') &&
                    <ListItem noIndent style={styles.txtError}>
                        <Text style={styles.txtCondition}>REFUND</Text>
                    </ListItem>
                }
                    <ListItem noIndent>
                        <Text style={txtLeft}>Nomor Tujuan</Text>
                        <Text style={txtRight}>{no_tujuan}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal</Text>
                        <Text style={txtRight}>{tanggal}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Produk</Text>
                        <Text style={txtRight}>{produk.toUpperCase()}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Debet</Text>
                        <Text style={txtRight}>Rp. {formatPrice(debet)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Kredit</Text>
                        <Text style={txtRight}>Rp. {formatPrice(kredit)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Saldo Awal</Text>
                        <Text style={txtRight}>Rp. {formatPrice(last_saldo)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Saldo Akhir</Text>
                        <Text style={txtRight}>Rp. {formatPrice(saldo)}</Text>
                    </ListItem>
                     <ListItem noIndent button={true}>
                        <Text selectable={true} style={txtCenter}>{vsn}</Text>
                    </ListItem>
                </List>
            </View>
    )
}


export {PropsToday, PropsMutation}


