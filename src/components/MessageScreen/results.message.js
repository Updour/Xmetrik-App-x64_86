'use strict';

import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'
import { View, Text, TouchableOpacity } from 'react-native';
import { List,  ListItem, Left, Button, Icon, Body, Right } from 'native-base'
import { styles } from '../../helper'

const ResultsInbox = ({item, onPress}) => {
    let { sender, in_starttime, in_message, tipe } = item
    let { txtMesage, txtNote } = styles
        let splMessage = _.split(in_message, '.', 3)////
        let rplMessage = _.replace(splMessage, splMessage.slice(-1)[0], 'xxxx')
        let isMessage = _.split(rplMessage, ',', 5).join('.')
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.listStyles} pointerEvents="none">
                <ListItem>
                    <Body>
                        <Text style={txtMesage}>{_.replace(sender, '@c.us', '')}</Text>
                        <Text style={txtNote}>{isMessage}</Text>
                    </Body>
                    <Right>
                        <Text style={txtNote}>{tipe}</Text>
                        <Text style={txtNote}>{moment(in_starttime).format('LTS')}</Text>
                    </Right>
                </ListItem>
            </View>
        </TouchableOpacity>
    )
}

const ResultsOutbox = ({item, onPress, status}) => {
    let { sender, out_starttime, out_message, tipe } = item
    let { txtMesage, txtNote } = styles
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.listStyles} pointerEvents="none">
                <ListItem>
                    <Body>
                        <Text style={txtMesage}>{_.replace(sender, '@c.us', '')}</Text>
                        <Text style={txtNote}>{out_message.substr(0, 74)} ..</Text>
                    </Body>
                    <Right>
                        <Text style={txtNote}>{tipe}</Text>
                        <Text style={txtNote}>{moment(out_starttime).format('LTS')}</Text>
                    </Right>
                </ListItem>
            </View>
        </TouchableOpacity>
    )
}


export {ResultsInbox, ResultsOutbox}
