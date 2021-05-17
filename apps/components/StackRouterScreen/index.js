'use strict';

import React, { Component } from 'react';
import { Animated, Easing } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainMenuBottomScreen from '../TabBottomScreen'
import ListMenuGlobal from '../TabBottomScreen/ConstanParentComponent/ConstanChildComponent/DashboardScreen/ListMenuGlobal'

// authentication screen
import AuthenticationScreen from '../AuthenticationScreen/AuthenticationScreen'
import StartUpScreeen from '../AuthenticationScreen/StartUpScreeen'
import ForgotPinScreen from '../AuthenticationScreen/ForgotPinScreen'

// transctionscreen eletric
import EletricRegularScreen from '../TransactionScreen/EletricScreen/EletricRegularScreen'
import EletricPacketScreen from '../TransactionScreen/EletricScreen/EletricPacketScreen'
// import Midtrans from '../TransactionScreen/EletricScreen/midtrans'
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
import KasproVirtualScreen from '../TransactionScreen/VirtualAccountScreen/KasproVirtualScreen'
import VisakuVirtualScreen from '../TransactionScreen/VirtualAccountScreen/VisakuVirtualScreen'
import OvoVirtualScreen from '../TransactionScreen/VirtualAccountScreen/OvoVirtualScreen'
import GopayVirtualScreen from '../TransactionScreen/VirtualAccountScreen/GopayVirtualScreen'
import GrabVirtualScreen from '../TransactionScreen/VirtualAccountScreen/GrabVirtualScreen'
import EtollVirtualScreen from '../TransactionScreen/VirtualAccountScreen/EtollVirtualScreen'
import DanaVirtualScreen from '../TransactionScreen/VirtualAccountScreen/DanaVirtualScreen'
import CinemaVirtualScreen from '../TransactionScreen/VirtualAccountScreen/CinemaVirtualScreen'
import ShopeeVirtualScreen from '../TransactionScreen/VirtualAccountScreen/ShopeeVirtualScreen'
import LinkAjaVirtualScreen from '../TransactionScreen/VirtualAccountScreen/LinkAjaVirtualScreen'

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

// account screen tab
import SuggestionAndCritic from '../AboutAppScreen/SuggestionAndCritic'
import PhoneComponent from '../AboutAppScreen/PhoneComponent'
import SmsComponent from '../AboutAppScreen/SmsComponent'
import HelpScreen from '../TabBottomScreen/ConstanParentComponent/ConstanChildComponent/AccountScreen/HelpScreen'
import AboutScreen from '../TabBottomScreen/ConstanParentComponent/ConstanChildComponent/AccountScreen/AboutScreen'
import PrivacyAndPolicyScreen from '../TabBottomScreen/ConstanParentComponent/ConstanChildComponent/AccountScreen/PrivacyAndPolicyScreen'
import SecurityScreen from '../TabBottomScreen/ConstanParentComponent/ConstanChildComponent/AccountScreen/SecurityScreen'
// tester
// import PrintPascaPln from '../PrintOutScreen/PrintPascaPln'
import TabPlnScreen from '../TransactionScreen/PpobScreen/TabPlnScreen'
import PrintPascaPln from '../TransactionScreen/PpobScreen/PrintPascaPln'
import TabPrintStruckScreen from '../TransactionScreen/PpobScreen/TabPrintStruckScreen'

const StackRouterScreen = createStackNavigator({
    // print: { screen: TabPrintStruckScreen },

    // cheked: { screen: StartUpScreeen },
    // forgot: { screen: ForgotPinScreen },
    // auth: { screen: AuthenticationScreen },

    // tab screen
    MainMenuBottomScreen: { screen: MainMenuBottomScreen },

    // // // // // eletric screnn
    regular: { screen: EletricRegularScreen },
    packet: { screen: EletricPacketScreen },

    // // // // // // // ppob screen
    pln: { screen: PlnPpobScreen },
    printPasca: { screen: TabPlnScreen },
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
    kaspro: { screen: KasproVirtualScreen },
    visa: { screen: VisakuVirtualScreen },
    ovo : { screen: OvoVirtualScreen },
    gopay: { screen: GopayVirtualScreen },
    grab: { screen: GrabVirtualScreen },
    etoll: { screen: EtollVirtualScreen },
    dana: { screen: DanaVirtualScreen },
    cinema: { screen: CinemaVirtualScreen },
    shopee: { screen:ShopeeVirtualScreen },
    linkAja: { screen: LinkAjaVirtualScreen },

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
    print: { screen: TabPrintStruckScreen },

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

    // account screeen
    help: { screen: HelpScreen },
    about: { screen: AboutScreen },
    critic: { screen: SuggestionAndCritic },
    privacy: { screen: PrivacyAndPolicyScreen },
    phone: { screen: PhoneComponent },
    sms: { screen: SmsComponent },
    security: { screen: SecurityScreen },

    allMenu: { screen: ListMenuGlobal }
  },
  {
    headerMode: 'none',
    transitionConfig
  })


const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        // outputRange: [-width, 0], if left
        outputRange: [width, 0], //if right
        extrapolate: 'clamp'
      });

      return {
        transform: [{ translateX }]
      }
    }
  }
}

export default createAppContainer(StackRouterScreen)
