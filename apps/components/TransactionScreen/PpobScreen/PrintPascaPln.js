'use strict';

import React, { Component } from 'react';

import { TouchableOpacity, NativeModules } from 'react-native';
import axios from 'axios'
import moment from 'moment'
import { Col, Grid } from "react-native-easy-grid";
import {
	Container, Header, Title, Content, Icon, Text, Item, Input, Label,
	Footer, FooterTab, Button, Card, ListItem, Body,  Right, Form
} from 'native-base';
import {
	formatPrice, formatDate, SelectDate, formatDatePrint, pNetPrintPasca,
	PrintStyles, ModalPopUp, styles, Empty, setNotifNot, ReloadScreen
} from '../../CollectionScreen'

const PrinterManager = NativeModules.PrinterManager;

export default class PrintPascaPln extends Component {
	state = {
		isDate: '',
		isIdCust: '',
		isOpen: false,
		isNtPln: false,
		refreshing: false,
	}


	// onreteieve data to print
	_onRetrieveValueData = async () => {
		try {
			let { isDate, isIdCust } = this.state;
			let date = formatDatePrint(isDate)
			let url = pNetPrintPasca() + date +'/'+ isIdCust
			if (isDate ==='' || isIdCust ==='') {
			  return Empty()
			}
			let results = await axios.get(url)
			let isData = results.data.data.length
			if (isData === 0 || isData === '') {
			  return setNotifNot()
			}
			 let id = results.data.data[0].idpelanggan
			let name = results.data.data[0].nmpelanggan
			let payDate = results.data.data[0].tglbyr
			let product = results.data.data[0].nmproduk
			let sn = results.data.data[0].refnumber
			let status = results.data.data[0].status
			let admin = results.data.data[0].jmladm
			let payAmount = results.data.data[0].jmlbyr
			let checkAmount = results.data.data[0].jmlhtag
			let refPay = results.data.data[0].refpay
			let feeAmount = results.data.data[0].jmlfee
			let total = results.data.data[0].totbyr

			if (product !== 'PLN') {
			  return this.setState({
			  	isNtPln: true,
			  	isOpen: true,
			  	refreshing: false,
			  	id: id,
			  	name: name,
			  	payDate: payDate,
			  	product: product,
			  	sn: sn,
			  	status: status,
			  	admin: (admin) + (refPay) + (feeAmount),
			  	payAmount: payAmount,
			  	checkAmount: checkAmount,
			  	total: total
			  })
			}
			/*state*/
			this.setState({
				isNtPln: false,
				isOpen: true,
				refreshing: false,
				id: id,
				name: name,
				payDate: payDate,
				product: product,
				sn: sn,
				status: status,
				admin: admin,
				payAmount: payAmount,
				checkAmount: checkAmount,
				total: total
			})
		}catch(e) {
			console.log(e)
		}
	}

	/*print out*/
	_onRetrieveValueDataPrintOut = () => {
		let {
			id, name, payDate, product, sn, status, admin, payAmount,
			checkAmount, total, isNtPln
		} = this.state;

		if (isNtPln === false) {
		  let text =`
===============================
    CETAK STRUK PASCABAYAR
     ${formatDate(payDate)}
===============================

ID Pelanggan  : ${id}
Nama          : ${name}
Produk        : ${product}
Tagihan       : ${formatPrice(checkAmount)}
Bayar         : ${formatPrice(payAmount)}
Admin         : ${formatPrice(admin)}
Total Bayar   : ${formatPrice(total)}
-------------------------------
${sn}
-------------------------------
Terima Kasih Dan Selamat
  Bertransaksi Kembali
		`;
		console.log('q', text)
		PrinterManager.printText(text)
		}

		if (isNtPln === true) {
		  let word =`
===============================
    CETAK STRUK PASCABAYAR
     ${formatDate(payDate)}
===============================

ID Pelanggan  : ${id}
Nama          : ${name}
Produk        : ${product}
Tagihan       : ${formatPrice(checkAmount)}
Bayar         : ${formatPrice(payAmount)}
Admin         : ${formatPrice(admin)}
Total Bayar   : ${formatPrice(total)}
-------------------------------
${sn}
-------------------------------
Terima Kasih Dan Selamat
  Bertransaksi Kembali
		`;
		console.log('q', word)
		PrinterManager.printText(word)
		}

}
	_onRemovePreventState = () => {
		this.setState({
			isOpen: false,
			refreshing: false,
			isDate: '',
			isIdCust: '',
			id: '',
			name: '',
			payDate: '',
			product: '',
			sn: '',
			admin: '',
			payAmount: '',
			checkAmount: '',
			total: '',
		})
	}
	_onReloadScreenAndData = () => {
    this.setState({
      refreshing: true
    }, ()=>	this._onRemovePreventState())
  }
	render() {
		let {
			id, name, payDate, product, sn, status, admin, payAmount,
			checkAmount, total, isOpen, isDate, isNtPln
		} = this.state;
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
			{/*<PascaHeader {...this.props} onPress={this._onReloadScreenAndData}/>*/}
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
			<Item stackedLabel style={itemDateStart}>
			<Label>Pilih Tanggal</Label>
			<SelectDate
			onDateChange={val => this.setState({isDate: val})}
			/>
			</Item>
			</Form>
			</Card>




		{/*zona modal*/}
		<ModalPopUp
		visible={isOpen}
		onPress={this._onRemovePreventState}
		onRequestClose={this._onRemovePreventState}
		>
		{isNtPln ?
			<Content style={contentStyle}>
		<Text style={textStyled}>===============================</Text>
		<Text style={textStyled}>CETAK STRUK PASCABAYAR</Text>
		<Text style={textStyled}>{formatDate(payDate)}</Text>
		<Text style={textStyled}>===============================</Text>

		<ListItem icon>
		<Body>
		<Text>ID Pelanggan</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>{id}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Nama</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>{name}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Produk</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>{product}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Tagihan</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>Rp. {formatPrice(checkAmount)}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Bayar</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>Rp. {formatPrice(payAmount)}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Admin</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>Rp. {formatPrice(admin)}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Total Bayar</Text>
		</Body>
		<Right>
		<Text style={textPay}>Rp. {formatPrice(total)}</Text>
		</Right>
		</ListItem>
		<Text style={textStyled}>===============================</Text>
		<Text style={textStyled}>{sn}</Text>
		<Text style={textStyled}>===============================</Text>
		<Text style={textStyled}>Terima Kasih Dan Selamat </Text>
		<Text style={textStyled}>Bertransaksi Kembali</Text>
		</Content> :

		<Content style={contentStyle}>
		<Text style={textStyled}>===============================</Text>
		<Text style={textStyled}>CETAK STRUK PASCABAYAR</Text>
		<Text style={textStyled}>{formatDate(payDate)}</Text>
		<Text style={textStyled}>===============================</Text>

		<ListItem icon>
		<Body>
		<Text>ID Pelanggan</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>{id}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Nama</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>{name}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Produk</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>{product}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Tagihan</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>Rp. {formatPrice(checkAmount)}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Bayar</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>Rp. {formatPrice(payAmount)}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Admin</Text>
		</Body>
		<Right>
		<Text style={textRigthStyle}>Rp. {formatPrice(admin)}</Text>
		</Right>
		</ListItem>
		<ListItem icon>
		<Body>
		<Text>Total Bayar</Text>
		</Body>
		<Right>
		<Text style={textPay}>Rp. {formatPrice(total)}</Text>
		</Right>
		</ListItem>
		<Text style={textStyled}>===============================</Text>
		<Text style={textStyled}>{sn}</Text>
		<Text style={textStyled}>===============================</Text>
		<Text style={textStyled}>Terima Kasih Dan Selamat </Text>
		<Text style={textStyled}>Bertransaksi Kembali</Text>
		</Content>
		}

		<Footer style={footerStyle}>
		<Button vertical style={buttonStyle}
		onPress={() => PrinterManager.connect()}
		>
		<Icon name="ios-bluetooth" style={iconStyle}/>
		<Text>Connect</Text>
		</Button>
		<Button vertical style={buttonStyle}
		onPress={this._onRetrieveValueDataPrintOut}
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
		<TouchableOpacity style={SubmitStyle} onPress={this._onRetrieveValueData}>
		<Text style={textStyle}>Cari Data</Text>
		</TouchableOpacity>
		</Footer>
		</Container>
		);
	}
}
