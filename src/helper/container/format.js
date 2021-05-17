import moment from 'moment';



export const formatPrice = (value) => {
    let val = (value/1).toFixed().replace('.', '')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// format date
export const formatDate = (value) => {
    if (! value) return ''
        value = value.toString()
    return moment(new Date(value)).format('DD/MM/YYYY HH:mm:ss')
}

export const setFormDate = (val) => {
    return moment(val).format('YYYY-MM-DD')
}
