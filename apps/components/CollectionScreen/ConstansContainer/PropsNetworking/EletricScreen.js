import { urlXmetrik, urlMetrikPulsa } from './index'


export const eNetDenom = () => (
  uri =urlXmetrik() + 'denom/'
)
export const sNetDenom = () => (
  uri =urlMetrikPulsa() + 'denom/'
)
// for provider ? prefix

export const eNetPrefix = () => (
  uri =urlXmetrik() + 'prefix/'
)
export const sNetPrefix = () => (
  uri =urlMetrikPulsa() + 'prefix/'
)

// for paket data type tsel isat
export const eNetTypePacket = () => (
  uri = urlXmetrik() + 'jenis'
)
export const sNetTypePacket = () => (
  uri = urlMetrikPulsa() + 'jenis'
)