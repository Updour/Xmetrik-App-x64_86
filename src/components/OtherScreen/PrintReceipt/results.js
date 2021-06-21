'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import { TouchableOpacity, Text } from 'react-native';
import { List, ListItem, Left, Right, Icon } from 'native-base'
import { styles } from '../../../helper'

const PreePaidResult = ({item, onPress}) => {
  let { listStyles, txtLeft, txtCenter, txtRight } = styles;
  let {
    tanggal, code, tujuan, uname, trfdaya, kwh, ppn, ppj, sn
  } = item;
  return (
        <List style={listStyles}>
            <ListItem noIndent>
                <Text style={txtLeft}>Produk</Text>
                <Text style={txtRight}>{code.toUpperCase()}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Tanggal</Text>
                <Text style={txtRight}>{tanggal}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>ID Pelanggan</Text>
                <Text style={txtRight}>{tujuan}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Nama Pelanggan</Text>
                <Text style={txtRight}>{uname}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Tarif/ Daya</Text>
                <Text style={txtRight}>{trfdaya}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Kwh/ Ppn</Text>
                <Text style={txtRight}>{`${kwh}/ ${ppn}`}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Ppj</Text>
                <Text style={txtRight}>Rp. {ppj}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtCenter}>{sn}</Text>
            </ListItem>
          </List>
  )
}

const PostPaidResult = ({item, onPress}) => {
  let { listStyles, txtLeft, txtCenter, txtRight } = styles;
  let {
    adm, bln, denda, kwh, ppn, sn, tagihan, tanggal, total_bayar,
    trfdaya, tujuan, uname, code
  } = item;
  return (
        <List style={listStyles}>
            <ListItem noIndent>
                <Text style={txtLeft}>Produk</Text>
                <Text style={txtRight}>{code.toUpperCase()}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Tanggal</Text>
                <Text style={txtRight}>{tanggal}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>ID Pelanggan</Text>
                <Text style={txtRight}>{tujuan}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Nama Pelanggan</Text>
                <Text style={txtRight}>{uname}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Daya/ Bln</Text>
                <Text style={txtRight}>{`${trfdaya}/ ${bln}`}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Kwh/ Ppn</Text>
                <Text style={txtRight}>{`${kwh}/ ${ppn}`}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Admin/ Denda</Text>
                <Text style={txtRight}>Rp. {`${adm}/ ${denda}`}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Total Tagihan</Text>
                <Text style={txtRight}>Rp. {tagihan}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Total Bayar</Text>
                <Text style={txtRight}>Rp. {total_bayar}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtCenter}>{sn}</Text>
            </ListItem>
          </List>
  )
}

const PostPaidNonPln = ({item, onPress}) => {
  let { listStyles, txtLeft, txtCenter, txtRight } = styles;
  let {
    tanggal, tujuan, uname, bln, code, meter, tagihan, adm, total_bayar, sn, member
  } = item;
  let telkom = `speedy` || `telkom` || `halo`
  return (
        <List style={listStyles}>
            <ListItem noIndent>
                <Text style={txtLeft}>Produk</Text>
                <Text style={txtRight}>{code.toUpperCase()}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Tanggal</Text>
                <Text style={txtRight}>{tanggal}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>ID Pelanggan</Text>
                <Text style={txtRight}>{tujuan}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Nama Pelanggan</Text>
                <Text style={txtRight}>{uname}</Text>
            </ListItem>
            {
                _.isEqual(code, 'pgn') &&
                <ListItem noIndent>
                    <Text style={txtLeft}>Bln/ Meter</Text>
                    <Text style={txtRight}>{`${bln}/ ${meter}`}</Text>
                </ListItem>
            }
            {
                _.isEqual(code.substr(0,4), 'pdam') &&
                <ListItem noIndent>
                    <Text style={txtLeft}>Bulan</Text>
                    <Text style={txtRight}>{bln}</Text>
                </ListItem>
            }
            {
                _.isEqual(code, 'bpjs') &&
                <ListItem noIndent>
                    <Text style={txtLeft}>Bulan/ Member</Text>
                    <Text style={txtRight}>{`${bln}/ ${member}`}</Text>
                </ListItem>
            }

            <ListItem noIndent>
                <Text style={txtLeft}>Tagihan/ Adm</Text>
                <Text style={txtRight}>Rp. {`${tagihan}/ ${adm}`}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Bulan</Text>
                <Text style={txtRight}>{bln}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtLeft}>Total Bayar</Text>
                <Text style={txtRight}>Rp. {total_bayar}</Text>
            </ListItem>
            <ListItem noIndent>
                <Text style={txtCenter}>{sn}</Text>
            </ListItem>
          </List>
    )
}


export { PostPaidResult, PostPaidNonPln, PreePaidResult };



