'use strict';

import React from 'react';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  headerStyles: {
    // backgroundColor: '#0000e6'
    backgroundColor: '#66a3ff'
  },
  contentStyle: {
    backgroundColor: '#f2f2f2' //f5fdff
  },
  itemWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  txtStyles: {
    color: '#595959',
    fontFamily: 'roboto'
  },
  txtMesage: {
    fontSize: 16,
    color: '#262626',
    fontFamily: 'roboto',
    fontWeight: '600'
  },
  txtStyl: {
    color: '#fff',
    fontFamily: 'roboto'
  },
  txtHeader: {
    fontSize: 16,
    color: '#fff'
  },
  txtBold: {
    fontSize: 12,
    color: '#595959',
    fontFamily: 'roboto',
    fontWeight: '700'
  },
  textSubmit: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'roboto',
    fontWeight: '700'
  },
  txtNote: {
    fontSize: 11,
    color: '#595959',
    fontFamily: 'roboto',
  },
  btnBuy: {
    borderWidth: 1,
    borderRadius: 6,
    height: 30,
    width: 70,
    borderColor: '#d9d9d9',
    alignSelf: 'center',
  },
  btnTxt: {
    padding: 3,
    color: '#595959',
    fontFamily: 'roboto',
    fontWeight: '700',
    textAlign: 'center',

  },
  formView: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 2,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 13,
    backgroundColor: '#fff'
  },
  txtNotify: {
    flex: 1,
    padding: 7,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'roboto',
    color: '#808080'
  },
  txtNumb: {
    marginLeft: 12,
    padding: 2,
    color: 'green',
  },
  txtLeft: {
    flex: 1,
    fontSize: 13,
    textAlign: 'left',
    fontFamily: 'roboto',
    color: '#8c8c8c'
  },
  txtCenter: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'roboto',
    color: '#8c8c8c'
  },
  txtRight: {
    flex: 1,
    fontSize: 13,
    marginRight: 6,
    fontStyle: 'italic',
    textAlign: 'right',
    fontFamily: 'roboto',
    color: '#8c8c8c'
  },

  listStyles:{
    marginTop: 7,
    marginLeft: 9,
    marginRight: 9,
    marginBottom: 2,
    borderRadius: 13,
    backgroundColor: '#fff'
  },
  snackStyles: {
    marginLeft: 13,
    marginRight: 13,
    marginBottom: 3,
    borderRadius: 13,
    backgroundColor: '#66a3ff'
  },
  txtSnack: {
    padding: 8,
    fontStyle: 'italic',
    textAlign: 'left',
    fontFamily: 'roboto',
    color: '#fff'
  },
  txtCondition: {
    flex: 1,
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'roboto',
    color: '#fff',
    fontWeight: '600'
  },
  txtProcs: {
    borderRadius: 13,
    backgroundColor: '#00e64d'
  },
  txtFail: {
    borderRadius: 13,
    backgroundColor: '#ff471a'
  },
  txtSuccs: {
    borderRadius: 13,
    backgroundColor: '#66a3ff'
  },
  txtError: {
    borderRadius: 13,
    backgroundColor: '#e6b800'
  },

});


export {styles};
