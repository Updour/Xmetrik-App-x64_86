import { urlXmetrik, urlMetrikPulsa } from './index'


// *** for all users *** \\ 
// **** Transaction screen All in One in Here ****** \\\

// for user || stockiess
export const netUsers = () => (
  net = urlXmetrik() + 'stockiess/'
) 
// for eletric n global

// for inbox
export const netInbox = () => (
  net = urlXmetrik() + 'inbox/'
)
// for outbox
export const netOutbox = () => (
  net = urlXmetrik() + 'outmobile/'
)
// for history
export const netHistory = () => (
  net = urlXmetrik() + 'outbox/'
)

// for interval
export const netInterval = () => (
  net = urlXmetrik() + 'dep'
)

// bank deposit
export const netBank = () => (
	net = urlXmetrik() + 'bank'
)
// cheking proses eletrik
export const netCheking = () => (
  uri = urlXmetrik() + 'purchase/'
)
// data purchase
export const netDataTrx  = () => (
  uri = urlXmetrik() + 'dpurchase/'
)