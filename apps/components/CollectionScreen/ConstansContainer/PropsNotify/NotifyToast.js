import { ToastAndroid } from 'react-native'

// *** for auth **** \\
export const SaveLocal = () => {
  ToastAndroid.show('Data Saved Successfully', ToastAndroid.SHORT);
}
// if saved
export const SaveStorage = () => {
  ToastAndroid.show('Data Saved', ToastAndroid.SHORT);
}
// if data not saved
export const CantStorage = () => {
  ToastAndroid.show('Data Not Saved', ToastAndroid.SHORT);
}
// if failed
export const LogFailed = () => {
  ToastAndroid.show('Sorry, Your mobile Number, Pin and Password are wrong', ToastAndroid.LONG);
}
// if success
export const LogSuccess = () => {
  ToastAndroid.show('Congratulations', ToastAndroid.SHORT);
}
// form empty
export const Empty = () => {
  ToastAndroid.show('Form can not be empty', ToastAndroid.SHORT);
}
// prefix
export const Prefix = () => {
  ToastAndroid.show('Provider not aviable', ToastAndroid.SHORT);
}

export const Denied = () => {
  ToastAndroid.show('Access Denied', ToastAndroid.SHORT);
}

// for select code
export const Coders = () => {
  ToastAndroid.show('Please, Select Code', ToastAndroid.SHORT);
}
// for setting bonus
export const setSuccess = () => {
ToastAndroid.show('Setting Bonus Successfully', ToastAndroid.LONG);
}
// for complaint
export const setSend = () => {
ToastAndroid.show('Data has been sent', ToastAndroid.LONG);
}
export const setView = () => {
ToastAndroid.show('Please, Refresh in inbox screen to view data', ToastAndroid.LONG);
}
// for token pln num hp
export const setHp = () => {
ToastAndroid.show('Gunakan code bintang di awal nomor handphone', ToastAndroid.SHORT);
}
export const setNotifHp= () => {
ToastAndroid.show(' contoh: * 08234567890', ToastAndroid.LONG);
}

export const setNotifSet= () => {
ToastAndroid.show(' Minimal Setting Bonus Rp. 50 Dan Maximal Rp. 500', ToastAndroid.SHORT);
}
// data not found

export const setNotifNot= () => {
ToastAndroid.show('Data not found', ToastAndroid.SHORT);
}

export const setNotifRemove= () => {
ToastAndroid.show('Data remove Successfully', ToastAndroid.SHORT);
}
export const NotifyResponse= (val) => {
ToastAndroid.show(val, ToastAndroid.SHORT);
}
