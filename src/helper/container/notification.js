import { ToastAndroid } from 'react-native'

// data not found
export const setNotfound = (val) => {
    ToastAndroid.show(`Data unavailable ${val}`, ToastAndroid.SHORT);
}
export const setNotEmpty = (val) => {
    ToastAndroid.show(`Data must be filled ${val}`, ToastAndroid.SHORT);
}

export const setNotifRemove = () => {
    ToastAndroid.show('Data remove Successfully', ToastAndroid.SHORT);
}
export const setPrepare = () => {
    ToastAndroid.show('preparing data ...', ToastAndroid.SHORT);
}

export const setNotify = (val) => (
    ToastAndroid.show(val, ToastAndroid.SHORT)
    )
