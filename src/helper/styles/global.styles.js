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
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 2,
    borderWidth: 1,
    borderRadius: 13,
    borderColor: '#d9d9d9',
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
    fontSize: 14,
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
  txtItalix: {
    flex: 1,
    fontSize: 13,
    marginRight: 6,
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'roboto',
    color: '#8c8c8c'
  },
  txtKnote: {
    flex: 1,
    fontSize: 11,
    padding: 2,
    // marginRight: 6,
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'roboto',
    color: '#808080'
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
  txtPend: {
    borderRadius: 13,
    backgroundColor: '#ffa64d'
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
  denomStyle: {
    flex: 1,
    margin: 9,
    borderRadius: 13,
    backgroundColor: '#fff'
  },
  txtDenom: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'roboto',
    color: '#595959'
  },
  viewCenter: {
    alignItems: "center",
    backgroundColor: '#fff'
  },
  imgStyle: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    marginTop: 6,
    marginBottom: 6
  },
  btnSubmit: {
    height: 45,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: '#66a3ff',
  },
  textSubmit: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'roboto'
  },
  txtInfo: {
   fontSize: 15,
   paddingTop: 5,
   marginLeft: 12,
   marginBottom: -4,
   textAlign: 'left',
   color: '#737373',
   fontWeight: '700',
   fontFamily: 'roboto'
  },
  textLabel: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    color: '#efefef',
    fontStyle: 'italic',
    fontFamily: 'roboto'
  },
  textInput: {
    padding: 5,
    margin: 3,
    fontSize: 27,
    borderRadius: 50,
    textAlign: 'center',
    color: '#b0afab',
    backgroundColor: '#efefef',
    fontStyle: 'italic',
    fontFamily: 'roboto'
  },
  itemStyle: {
    marginLeft: 14,
    marginRight: 14
  },
  btnStyle: {
    backgroundColor: '#ff471a',
    marginLeft: 14,
    marginRight: 14
  },
  btnStyles: {
    backgroundColor: '#66a3ff',
    marginLeft: 14,
    marginRight: 14
  },
  txtForgot: {
    textAlign: 'left'
  },
  cntStyle: {
     backgroundColor:'#f2f2f2',
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      margin: 3,
      paddingTop:20
  }
});


export {styles};
