'use strict';

import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'
import { View, Text } from 'react-native';
import { List,  ListItem, Left, Button, Icon, Body, Right } from 'native-base'
import { styles, formatPrice } from '../../../helper'

const PropsProduct = ({item, onPress}) => {
    let { harga_jual, keterangan, kode, nominal, status } = item
    let { listStyles, txtLeft, txtRight, headerStyles, txtCenter } = styles
    return (
            <View style={styles.listStyles} >
                 <List style={listStyles}>
                 {
                    _.isEqual(status, 'ada') &&
                    <ListItem noIndent style={styles.txtSuccs}>
                        <Text style={styles.txtCondition}>PRODUK TERSEDIA</Text>
                    </ListItem>
                }

                {
                    _.isEqual(status, 'kosong') &&
                    <ListItem noIndent style={styles.txtFail}>
                        <Text style={styles.txtCondition}>PRODUK TIDAK TERSEDI</Text>
                    </ListItem>
                }
                {
                    _.isEqual(status, 'gangguan') &&
                    <ListItem noIndent style={styles.txtProcs}>
                        <Text style={styles.txtCondition}>{status.toUpperCase()}</Text>
                    </ListItem>
                }
                    <ListItem noIndent>
                        <Text style={txtLeft}>Produk</Text>
                        <Text style={txtRight}>{kode.toUpperCase()}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Nominal</Text>
                        <Text style={txtRight}>Rp. {formatPrice(nominal)}</Text>
                    </ListItem>
                    <ListItem noIndent>
                        <Text style={txtLeft}>Harga</Text>
                        <Text style={txtRight}>Rp. {formatPrice(harga_jual)}</Text>
                    </ListItem>
                     <ListItem noIndent button={true}>
                        <Text selectable={true} style={txtCenter}>{keterangan}</Text>
                    </ListItem>
                </List>
            </View>
    )
}


export {PropsProduct}
