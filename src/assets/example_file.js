import moment from 'moment'
import { buyers, headers } from './example_buyers'

export const setUpExampleFile = () => {
  const mockFile = [headers]
  const currency = Math.round(Math.random()) ? '$' : '£'
  function randomDate(start, end) {
    return moment(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())))
  }
  const numOfSales = Math.floor(Math.random() * (170 - 140) + 140)
  for (let i = 0; i < numOfSales; i++) {
    const dateSold = randomDate(new Date(2020, 0, 1), new Date())
    const timeSold = randomDate(new Date(2020, 0, 1), new Date()).format('h:mm A')
    const dateListed =
      randomDate(new Date(2020, 0, 1), new Date(dateSold))
        .format('DD-MM-YYYY')
    const price = Math.floor(Math.random() * (110 - 25) + 25).toFixed(2)
    const shipping = Math.floor(Math.random() * 10).toFixed(2)
    const usps = Math.floor(Math.random() * (10 - 1) + 1).toFixed(2)
    mockFile.push([
      dateSold.format('DD-MM-YYYY'),
      timeSold,
      dateListed,
      Math.round(Math.random()) ? 'Yes' : 'No', // bundle
      buyers[Math.floor(Math.random() * 100)],
      'American Vintage',
      'amazing vintage pullover.↵↵details: beautiful and soft featuring bears and hearts',
      `${currency}${price}`,
      `${currency}${shipping}`,
      `${currency}${(parseFloat(shipping) + parseFloat(price)).toFixed(2)}`, // total
      `${currency}${shipping ? '0.00' : usps}`, // usps cost
      `${currency}${(price / 10).toFixed(2)}`, // depop fee
      `${currency}0.00`, // depop payment fee
      'PAYPAL', // method of payment
      'Sweaters', // category
      'Kennya Aguilar',
      '500 West University Ave.↵PMB #135',
      'N/A',
      'El Paso ',
      'TX',
      '79968',
      'US'
    ])
  }
  return mockFile
}
