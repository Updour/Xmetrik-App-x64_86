'use strict';

import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'
import { View, Text, TouchableOpacity } from 'react-native';
import { List,  ListItem } from 'native-base'
import { styles, formatPrice } from '../../helper'

const EletricProps = ({item, onPress}) => {
    let { harga_jual, nominal } = item
    let { denomStyle, txtDenom, txtItalix } = styles
    return (
       <TouchableOpacity onPress={onPress} style={styles.denomStyle}>
               <List style={denomStyle} >
                   <Text style={txtDenom}>{formatPrice(nominal)}</Text>
                   <Text style={txtItalix}>Harga {formatPrice(harga_jual)}</Text>
               </List>
       </TouchableOpacity>
       )
}

const PackpageProps = ({item, onPress}) => {
    let { harga_jual, nominal, keterangan } = item
    let { denomStyle, txtDenom, txtItalix, txtKnote } = styles
    return (
       <TouchableOpacity onPress={onPress} style={styles.denomStyle}>
               <List style={denomStyle} >
                   <Text style={txtDenom}>Rp. {formatPrice(harga_jual)}</Text>
                   <Text style={txtKnote}>{keterangan}</Text>
               </List>
       </TouchableOpacity>
       )
}

const PostPaidProps = ({item, onPress}) => {
    let { kode, keterangan } = item
    let { denomStyle, txtDenom, txtItalix, txtKnote } = styles
    return (
       <TouchableOpacity onPress={onPress} style={styles.denomStyle}>
               <List style={denomStyle} >
                   <Text style={txtDenom}>{_.toUpper(kode)}</Text>
                   <Text style={txtKnote}>{keterangan}</Text>
               </List>
       </TouchableOpacity>
       )
}


const PostPaidMsgProps = ({item, onPress}) => {
    let {
        date, dates, tujuan, atas_nama, kode, adm, reff, status_gagal, status_ppob,
      tagihan, status, total_bayar,  vsn
    } = item
    let { listStyles, txtLeft, txtRight, headerStyles, txtCenter } = styles
    return (
        <View style={styles.listStyles} >
          {
            _.isEqual(status, '2') ?
            <List style={listStyles} >
                    <ListItem noIndent style={styles.txtSuccs} onPress={onPress}>
                        <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} {_.toUpper(kode)} SUKSES</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Sukses</Text>
                        <Text style={txtRight}>{date}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>ID Pelanggan</Text>
                        <Text style={txtRight}>{tujuan}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Nama Pelanggan</Text>
                        <Text style={txtRight}>{atas_nama.toUpperCase()}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Tagihan</Text>
                        <Text style={txtRight}>Rp. {formatPrice(tagihan)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Admin</Text>
                        <Text style={txtRight}>Rp. {formatPrice(adm)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Total Bayar</Text>
                        <Text style={txtRight}>Rp. {formatPrice(total_bayar)}</Text>
                    </ListItem>
                     <ListItem noIndent >
                        <Text selectable={true} style={txtCenter}>{vsn}</Text>
                    </ListItem>
                     <ListItem noIndent >
                        <Text selectable={true} style={txtCenter}>{reff}</Text>
                    </ListItem>
                </List> :
                <List style={listStyles}>
                 {
                    _.isEqual(status, '3') &&
                    <View>
                      <ListItem noIndent style={styles.txtFail} >
                          <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} {_.toUpper(kode)} GAGAL</Text>
                      </ListItem>
                      <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Masuk</Text>
                        <Text style={txtRight}>{dates}</Text>
                      </ListItem>
                      <ListItem noIndent >
                          <Text style={txtLeft}>ID Pelanggan</Text>
                          <Text style={txtRight}>{tujuan}</Text>
                      </ListItem>
                      <ListItem noIndent >
                          <Text style={styles.txtCenter}>{status_gagal}</Text>
                      </ListItem>
                    </View>
                }
                {
                    _.isEqual(status, '1') &&
                    <View>
                    <ListItem noIndent style={styles.txtPend}>
                          <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} {_.toUpper(kode)} DALAM ANTRIAN</Text>
                      </ListItem>
                      <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Masuk</Text>
                        <Text style={txtRight}>{dates}</Text>
                      </ListItem>
                      <ListItem noIndent >
                          <Text style={txtLeft}>ID Pelanggan</Text>
                          <Text style={txtRight}>{tujuan}</Text>
                      </ListItem>
                      <ListItem noIndent>
                          <Text style={styles.txtCenter}>SEDANG DI PROSESS</Text>
                      </ListItem>
                    </View>
                }

                {
                    _.isEqual(status, '4') &&
                    <View>
                    <ListItem noIndent style={styles.txtProcs}>
                          <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} {_.toUpper(kode)} SEDANG PROSESS</Text>
                      </ListItem>
                      <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Masuk</Text>
                        <Text style={txtRight}>{dates}</Text>
                      </ListItem>
                      <ListItem noIndent>
                          <Text style={txtLeft}>ID Pelanggan</Text>
                          <Text style={txtRight}>{tujuan}</Text>
                      </ListItem>
                      <ListItem noIndent>
                          <Text style={styles.txtCenter}>SEDANG DI PROSESS</Text>
                      </ListItem>
                    </View>
                }
                {
                    _.isEqual(status, '5') &&
                    <View>
                    <ListItem noIndent style={styles.txtPend}>
                          <Text style={styles.txtCondition}>{_.toUpper(status_ppob)} {_.toUpper(kode)} TIMEOUT</Text>
                      </ListItem>
                      <ListItem noIndent>
                        <Text style={txtLeft}>Tanggal Masuk</Text>
                        <Text style={txtRight}>{dates}</Text>
                      </ListItem>
                      <ListItem noIndent>
                          <Text style={txtLeft}>ID Pelanggan</Text>
                          <Text style={txtRight}>{tujuan}</Text>
                      </ListItem>
                      <ListItem noIndent>
                          <Text style={styles.txtCenter}>CONNECTION TIME OUT</Text>
                      </ListItem>
                    </View>
                }
                </List>
          }

            </View>
       )
}
export {EletricProps, PackpageProps, PostPaidProps, PostPaidMsgProps}
