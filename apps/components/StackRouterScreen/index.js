'use strict';

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainMenuBottomScreen from '../TabBottomScreen'
import ListMenuGlobal from '../TabBottomScreen/ConstanParentComponent/ConstanChildComponent/DashboardScreen/ListMenuGlobal'

// authentication screen
import AuthenticationScreen from '../AuthenticationScreen/AuthenticationScreen'

// transctionscreen eletric
import EletricRegularScreen from '../TransactionScreen/EletricScreen/EletricRegularScreen'
import EletricPacketScreen from '../TransactionScreen/EletricScreen/EletricPacketScreen'

// ppob screen
import PlnPpobScreen from '../TransactionScreen/PpobScreen/PlnPpobScreen'
import PgnPpobScreen from '../TransactionScreen/PpobScreen/PgnPpobScreen'
import BpjsPpobScreen from '../TransactionScreen/PpobScreen/BpjsPpobScreen'
import FinancePpobScreen from '../TransactionScreen/PpobScreen/FinancePpobScreen'
import PdamPpobScreen from '../TransactionScreen/PpobScreen/PdamPpobScreen'
import TelkomPpobScreen from '../TransactionScreen/PpobScreen/TelkomPpobScreen'
import TvPpobScreen from '../TransactionScreen/PpobScreen/TvPpobScreen'
import ZonaTselDataPpobScreen from '../TransactionScreen/PpobScreen/ZonaTselDataPpobScreen'
import ZonaTselPhonePpobScreen from '../TransactionScreen/PpobScreen/ZonaTselPhonePpobScreen'

// voucher screen
import TokenPlnVoucherScreen from '../TransactionScreen/VoucherScreen/TokenPlnVoucherScreen'
import TelevisonVoucherScreen from '../TransactionScreen/VoucherScreen/TelevisonVoucherScreen'
import GameVoucherScreen from '../TransactionScreen/VoucherScreen/GameVoucherScreen'
import BoltVoucherScreen from '../TransactionScreen/VoucherScreen/BoltVoucherScreen'

// virtual screen
import OvoVirtualScreen from '../TransactionScreen/VirtualAccountScreen/OvoVirtualScreen'
import GopayVirtualScreen from '../TransactionScreen/VirtualAccountScreen/GopayVirtualScreen'
import GrabVirtualScreen from '../TransactionScreen/VirtualAccountScreen/GrabVirtualScreen'
import EtollVirtualScreen from '../TransactionScreen/VirtualAccountScreen/EtollVirtualScreen'
import DanaVirtualScreen from '../TransactionScreen/VirtualAccountScreen/DanaVirtualScreen'
import CinemaVirtualScreen from '../TransactionScreen/VirtualAccountScreen/CinemaVirtualScreen'

// activity screen
import DataPaymentScreen from '../DataActivityScreen/ConstanDataComponent/DataPaymentScreen'
import DataMutationScreen from '../DataActivityScreen/ConstanDataComponent/DataMutationScreen'
import DataTransactionScreen from '../DataActivityScreen/ConstanDataComponent/DataTransactionScreen'
import DataDepositScreen from '../DataActivityScreen/ConstanDataComponent/DataDepositScreen'
import DataDownlineScreen from '../DataActivityScreen/ConstanDataComponent/DataDownlineScreen'

// price screen
import PriceScreen from '../DataActivityScreen/ConstanPriceComponent/'
import PriceRegularScreen from '../DataActivityScreen/ConstanPriceComponent/ConstansComponent/PriceRegularScreen'
import PricePacketScreen from '../DataActivityScreen/ConstanPriceComponent/ConstansComponent/PricePacketScreen'
import PriceVirtualAccountScreen from '../DataActivityScreen/ConstanPriceComponent/ConstansComponent/PriceVirtualAccountScreen'
import PriceVoucherScreen from '../DataActivityScreen/ConstanPriceComponent/ConstansComponent/PriceVoucherScreen'

//
import ManualTransactionScreen from '../DataActivityScreen/ConstantParentComponent/ManualTransactionScreen'
import TransferSaldoScreen from '../DataActivityScreen/ConstantParentComponent/TransferSaldoScreen'
import SettingBonusScreen from '../DataActivityScreen/ConstantParentComponent/SettingBonusScreen'
import MakeDepositScreen from '../DataActivityScreen/ConstantParentComponent/MakeDepositScreen'
import AddDownlineScreen from '../DataActivityScreen/ConstantParentComponent/AddDownlineScreen'
import ProductPayment from '../DataActivityScreen/ConstantParentComponent/ProductPayment'

// history screen transaction
import ProcessingData from '../TransactionScreen/HistoryScreen/ProcessingData'
import DataTransaction from '../TransactionScreen/HistoryScreen/DataTransaction'
import HistoryTransaction from '../TransactionScreen/HistoryScreen/HistoryTransaction'

// 
import SuggestionAndCritic from '../AboutAppScreen/SuggestionAndCritic'
// child critic saran
import PhoneComponent from '../AboutAppScreen/PhoneComponent'
import SmsComponent from '../AboutAppScreen/SmsComponent'
import HelpScreen from '../TabBottomScreen/ConstanParentComponent/ConstanChildComponent/AccountScreen/HelpScreen'
import AboutScreen from '../TabBottomScreen/ConstanParentComponent/ConstanChildComponent/AccountScreen/AboutScreen'
import PrivacyAndPolicyScreen from '../TabBottomScreen/ConstanParentComponent/ConstanChildComponent/AccountScreen/PrivacyAndPolicyScreen'

const StackRouterScreen = createStackNavigator({
    
    auth: { screen: AuthenticationScreen },
    
    // tab screen
    MainMenuBottomScreen: { screen: MainMenuBottomScreen },
    critic: { screen: SuggestionAndCritic },

    // // // // eletric screnn
    regular: { screen: EletricRegularScreen },
    packet: { screen: EletricPacketScreen },
    
    // // // // // // ppob screen
    pln: { screen: PlnPpobScreen },
    pgn: { screen: PgnPpobScreen },
    bpjs: { screen: BpjsPpobScreen },
    finance: { screen: FinancePpobScreen },
    pdam: { screen: PdamPpobScreen },
    telkom: { screen: TelkomPpobScreen },
    tv: { screen: TvPpobScreen },
    zonaTselData: { screen: ZonaTselDataPpobScreen },
    zonaTselTelpon: { screen: ZonaTselPhonePpobScreen },

    // // // // // voucher screen
    vPln: { screen: TokenPlnVoucherScreen },
    vTv: { screen: TelevisonVoucherScreen },
    vGame: { screen: GameVoucherScreen },
    vBolt: { screen: BoltVoucherScreen },

    // // // // virtual account screen
    ovo : { screen: OvoVirtualScreen },
    gopay: { screen: GopayVirtualScreen },
    grab: { screen: GrabVirtualScreen },
    etoll: { screen: EtollVirtualScreen },
    dana: { screen: DanaVirtualScreen },
    cinema: { screen: CinemaVirtualScreen },

    // // // activity screen
    paymentData: { screen: DataPaymentScreen },
    mutationData: { screen: DataMutationScreen },
    transactionData: { screen: DataTransactionScreen },
    depositData: { screen: DataDepositScreen },
    downlineData: { screen: DataDownlineScreen },
    price: { screen: PriceScreen },
    regularPrice: { screen: PriceRegularScreen },
    packetPrice: { screen: PricePacketScreen },
    virtualPrice: { screen: PriceVirtualAccountScreen },
    voucherPrice: { screen: PriceVoucherScreen },
    
    // // sd only
    manualTrx: { screen: ManualTransactionScreen },
    transfer: { screen: TransferSaldoScreen },
    setting: { screen: SettingBonusScreen },
    topUp: { screen: MakeDepositScreen },
    addDownline: { screen: AddDownlineScreen },
    product: { screen: ProductPayment },

    // // history screen
    process: { screen: ProcessingData },
    purchase: { screen: DataTransaction },
    history: { screen: HistoryTransaction },
    
    // 
    help: { screen: HelpScreen },
    about: { screen: AboutScreen },

    privacy: { screen: PrivacyAndPolicyScreen },
    phone: { screen: PhoneComponent },
    sms: { screen: SmsComponent },


    allMenu: { screen: ListMenuGlobal }
  }, 
  {
    headerMode: 'none'
  })

export default createAppContainer(StackRouterScreen)