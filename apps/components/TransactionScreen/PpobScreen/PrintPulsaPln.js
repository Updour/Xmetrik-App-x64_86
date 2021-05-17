'use strict';

import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, NativeModules } from 'react-native';
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { Col, Grid } from "react-native-easy-grid";
import {
	Container, Header, Title, Content, Icon, Text, Item, Input, Label,
	Footer, FooterTab, Button, Card, ListItem, Body,  Right, Form
} from 'native-base';
import {
	formatPrice, printDate, formatDate, SelectDate, formatDatePrint, netPrepaid,
	PrintStyles, ModalPopUp, styles, Empty, setNotifNot, ReloadScreen
} from '../../CollectionScreen'

const PrinterManager = NativeModules.PrinterManager;

export default class PrintPulsaPln extends Component {
	state = {
		prepaid: [],
		isDate: '',
		isIdCust: '',
		isCode: '',
		isOpen: false,
		isNtPln: false,
		refreshing: false,
	}

	componentDidMount() {
		this._onRetrieveValueDataStoragg()
	}

	_onRetrieveValueDataStoragg = async () => {
    try {
      let val = await AsyncStorage.getItem('@keyData')
      let parsed = JSON.parse(val)
      	this.setState({ id : parsed.agenid, hp: parsed.hp, pin: parsed.pin })

    }catch(err) {
      throw err;
    }
  }

  _onRemovePreventState = () => {
  	this.setState({ isOpen: !this.state.isOpen })
  }
	// onreteieve data to print
	_onRetrieveValueDataPrepaid = async () => {
		try {
			let { isDate, isIdCust, id, isCode } = this.state;
			let date = formatDatePrint(new Date(isDate))
			let url = `${netPrepaid()}?agenid=${id}&tujuan=${isIdCust}&vtype=${isCode}&tanggal=${date}`
			if (_.isEmpty(isIdCust) || _.isEmpty(date)) return Empty()
			let results = await axios.get(url)
			if (_.isEmpty(results.data)) return setNotifNot()
				this.setState({
					prepaid: results.data,
					isOpen: true
				})
		}catch(e) {
			console.log(e)
		}
	}

	/*print out*/
	_onRetrieveValuePrint = () => {
		let response = _.map(this.state.prepaid, item => {
			let { agenid, tujuan, vtype, tanggal, vsn } = item;
			let text = `
===============================
    	  CETAK STRUK
      ${tanggal}
===============================

ID Pelanggan  : ${agenid}
No. Tujuan    : ${tujuan}
Produk        : ${vtype}
-------------------------------
${vsn}
-------------------------------
   Terima Kasih Dan Selamat
     Bertransaksi Kembali
		`;
		console.log('q', text)
		PrinterManager.printText(text)
		})
}

_onReloadScreenAndData = () => {
	this.setState({
		refreshing: true
	}, ()=>	this._onRemovePreventState())
}
	render() {
		let { prepaid, isOpen } = this.state;
		let {
			textPay, textStyled, textRigthStyle, contentStyle, iconStyle, footerStyle,
			buttonStyle
		} = PrintStyles
		let {
			cardStyles, itemDateStart, aLabelAStyle, aLabelInStyle, formStyles,
			footerStyles, textStyle, SubmitStyle
		} = styles
		return (
			<Container>
			<ReloadScreen
			refreshing={this.state.refreshing}
			onRefresh={this._onReloadScreenAndData}
			>
			<Content>
			<Card style={cardStyles}>
			<Form style={formStyles}>
			<Item stackedLabel>
			<Label>ID Pelangan</Label>
			<Input
			onChangeText={isIdCust => this.setState({isIdCust})}
			value={this.state.isIdCust}
			keyboardType='phone-pad'
			/>
			</Item>
			<Item stackedLabel>
			<Label>Kode Produk</Label>
			<Input
			onChangeText={isCode => this.setState({isCode})}
			value={this.state.isCode}
			/>
			</Item>
			<Item stackedLabel style={itemDateStart}>
			<Label>Pilih Tanggal</Label>
			<SelectDate
			onDateChange={val => this.setState({isDate: val})}
			/>
			</Item>
			</Form>
			</Card>
			<ModalPopUp
			visible={isOpen}
			onPress={this._onRemovePreventState}
			onRequestClose={this._onRemovePreventState}
			>
			{isOpen ? _.map(prepaid, (item, o) => {
				let { agenid, tujuan, vtype, tanggal, vsn } = item;
				return (
				<Content style={contentStyle} key={o}>
				<Text style={textStyled}>===============================</Text>
				<Text style={textStyled}>CETAK STRUK</Text>
				<Text style={textStyled}>{tanggal}</Text>
				<Text style={textStyled}>===============================</Text>

				<ListItem icon>
				<Body>
				<Text>ID Pelanggan</Text>
				</Body>
				<Right>
				<Text style={textRigthStyle}>{agenid}</Text>
				</Right>
				</ListItem>
				<ListItem icon>
				<Body>
				<Text>No Tujuan</Text>
				</Body>
				<Right>
				<Text style={textRigthStyle}>{tujuan}</Text>
				</Right>
				</ListItem>
				<ListItem icon>
				<Body>
				<Text>Produk</Text>
				</Body>
				<Right>
				<Text style={textRigthStyle}>{vtype}</Text>
				</Right>
				</ListItem>
				<ListItem icon>
				<Body>
				<Text>Tanggal</Text>
				</Body>
				<Right>
				<Text style={textRigthStyle}>{tanggal}</Text>
				</Right>
				</ListItem>


				<Text style={textStyled}>===============================</Text>
				<Text style={textStyled}>{vsn}</Text>
				<Text style={textStyled}>===============================</Text>
				<Text style={textStyled}>Terima Kasih Dan Selamat </Text>
				<Text style={textStyled}>Bertransaksi Kembali</Text>
				</Content>
                )

			}) : 'null'
		}


			<Footer style={footerStyle}>
			<Button vertical style={buttonStyle}
			onPress={() => PrinterManager.connect()}
			>
			<Icon name="ios-bluetooth" style={iconStyle}/>
			<Text>Connect</Text>
			</Button>
			<Button vertical style={buttonStyle}
			onPress={this._onRetrieveValuePrint}
			>
			<Icon name="ios-print" style={iconStyle}/>
			<Text>Print</Text>
			</Button>
			<Button vertical style={buttonStyle}
			onPress={() => PrinterManager.disconnect()}
			>
			<Icon active name="ios-power" style={iconStyle}/>
			<Text>Disconnect</Text>
			</Button>
			</Footer>
			</ModalPopUp>




		</Content>
		</ReloadScreen>
		<Footer style={footerStyles}>
		<TouchableOpacity style={SubmitStyle} onPress={this._onRetrieveValueDataPrepaid}>
		<Text style={textStyle}>Cari Data</Text>
		</TouchableOpacity>
		</Footer>
		</Container>
		);
	}
}
