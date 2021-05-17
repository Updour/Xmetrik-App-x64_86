'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

const shome = StyleSheet.create({
    header: {
        backgroundColor: '#66a3ff'
    },
    contentStyles: {
        backgroundColor: '#f2f2f2'
    },
    btnPp: {
        flex: 1,
        marginTop: 10,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#F3F3F3',
        borderColor: '#fff',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    txtBody: {
        fontSize: 12,
        // marginLeft: 8,
        color: '#e6ffff',
        textAlign: 'left',
        fontFamily: 'roboto'
    },
    contentStyl: {
        flex: 1,
        marginTop: 12,
        marginLeft: 6,
        marginRight: 6,
        backgroundColor: '#faffff'
    },
    contentTop: {
        height: 90,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        backgroundColor: '#66a3ff',
    },
    viewRow: {
        marginTop: 3,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: '#f0f7ff'
    },
    viewText: {
        margin: 8,
    },
    txtIdd: {
        fontSize: 12,
        color: '#595959',
        fontFamily: 'roboto',
        fontStyle: 'italic',
        fontWeight: '700'
    },
    txtId: {
        fontSize: 14,
        color: '#595959',
        fontFamily: 'roboto',
        fontWeight: '700'
    },
    contentRender: {
        top: -70,
    },
    cardStyles: {
        marginLeft: 6,
        marginRight: 6,
        height: 100,
        borderRadius: 6,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: 'center',
        backgroundColor: '#faffff',
    },
    cardStyl: {
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 6,
        alignContent: 'center',
        backgroundColor: '#faffff',
    },
    itemWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    itemDetil: {
        flex: 1,
        margin: 20,
        elevation : 5,
        shadowOpacity: 3,
        shadowRadius: 3,
        marginTop: 12,
        borderRadius: 5,
        marginLeft: 12,
        height: 70,
        width: 133,
        backgroundColor: '#faffff'
    },
    txtItem: {
        marginLeft: 10,
        marginTop: 8,
        fontSize: 11,
        color: '#595959',
        fontFamily: 'roboto',
    },
    txtItemd: {
        marginLeft: 12,
        marginTop: 3,
        fontSize: 10,
        color: 'red',
        textAlign: 'center',
        fontFamily: 'roboto',
    },
    txtItems: {
        marginTop: 2,
        fontSize: 20,
        textAlign: 'center',
        color: 'red',
        fontFamily: 'roboto',
        fontFamily: '700'
    },
    btnDeposits: {
        marginTop: 4,
        right: -85,
        width: 97,
        marginRight: 8,
        borderRadius: 10,
        height: 35,
        backgroundColor: '#66a3ff',
        alignContent: 'flex-end',
    },
    textDeposits: {
        flex: 1,
        padding: 6,
        color: '#fff',
        fontFamily: 'roboto',
        textAlign: 'center',
        alignItems: 'center'
    },
    btnRefresh: {
        right: -99,
         marginTop: 4,
         marginRight: 14,
         textAlign: 'right',
         alignItems: 'flex-end'
    },

    txtMenu1: {
        marginLeft: 10,
        padding: 8,
        fontSize: 12,
        color: '#595959',
        fontWeight: '700',
        fontFamily: 'roboto',
    },
    txtMenu2: {
        padding: 8,
        fontSize: 13,
        color: '#00aaff',
        alignSelf: 'flex-end',
        fontFamily: 'roboto',
    },
     itemFtDetil: {
        marginTop: 17,
        marginLeft: 18,
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    ftItem: {
        marginTop: 4,
        marginBottom: 4,
        fontSize: 11,
        textAlign: 'center',
        color: '#595959',
        fontFamily: 'roboto',
    },
    ftItems: {
        fontSize: 14,
        textAlign: 'center',
        color: 'red',
        fontFamily: 'roboto',
        fontFamily: '700'
    },
    iconMenu: {
        borderWidth: 1,
        width: 45,
        padding: 4,
        borderRadius: 13,
        alignSelf: 'center',
        textAlign: 'center',
        borderColor: '#bfbfbf',
    },
    iconMenus: {
        borderWidth: 1,
        width: 45,
        padding: 4,
        marginLeft: 8,
        borderRadius: 13,
        textAlign: 'center',
        borderColor: '#bfbfbf',
    },

    content: { //agen
        marginTop: 4,
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    wrapContent:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    RpStyle: {
        fontSize: 10,
        marginLeft: 8,
        textAlign: 'center',
        fontFamily: 'roboto',
        color: '#fa551e',
    },
    textPrice: {
        fontSize: 15,
        marginRight: 20,
        textAlign: 'center',
        fontFamily: 'roboto',
        color: 'blue',
    },
    RpStyleSal: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'roboto',
        color: '#fa551e',
    },
    textPriceSal: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700',
        fontFamily: 'roboto',
        color: 'blue',
    },
    crdStyle: {
        borderWidth: 1,
        marginLeft: 13,
        marginRight: 13,
        marginBottom: 8,
        borderRadius: 8,
        borderColor: '#cccccc',
    },



})
export { shome }
