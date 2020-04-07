
import { readString } from 'react-papaparse'
import currency from 'currency.js'
import moment from 'moment'
export const filterData = (data, { start, end }) => {
  const filteredData = []
  data.sales.forEach((file) => {
    if (
      new Date(file.date_of_sale) >= start &&
      new Date(file.date_of_sale) <= end
    ) {
      filteredData.push(file)
    }
  })
  return setUpState(filteredData, data.currency_type)
}
// Reads files in
export const processFiles = (files, setState, err, useExample) => {
  if (!files.length) return
  let results = []

  if (useExample) {
    readCSVString(
      files,
      (res) => { results = [...results, ...res] },
      err
    )
    initState(results, setState, err)
  } else {
    files.forEach((file, i) => {
      const fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.onloadend = () => {
        readCSVString(
          fileReader.result,
          (res) => { results = [...results, ...res] },
          err
        )
        if (i === files.length - 1) {
          initState(results, setState, err)
        }
      }
    })
  }
}

const readCSVString = (file, results, err) => {
  if (readString(file).errors.length) {
    err()
  } else {
    results(readString(file).data)
  }
}

// Initialized data format that we'll throw into our app's state
export const initState = (originalFiles, setState, err) => {
  const cleanedFiles = [...originalFiles]
  for (let i = 0; i < cleanedFiles.length; i++) {
    const row = cleanedFiles[i]
    if (row.length !== 22) {
      cleanedFiles.splice(i, 1)
      i--
    }
  }
  if (!cleanedFiles.length) {
    alert("Oops! We don't recognize this file format. Try another file!")
    err()
    return
  }
  const files = cleanAndSort(cleanedFiles)
  const sorted = sort(files)
  setState(setUpState(sorted))
}
const setUpState = (files, currencyType) => {
  const data = {}
  data.sales = files
  data.total_earnings = 0
  data.total_shipping_cost = 0
  data.depop_fees = 0
  data.paypal_fees = 0
  data.avg_price = 0
  data.avg_shipping = 0
  data.avg_total = 0
  data.avg_time_listed = 0
  data.free_shipping = 0
  data.currency_type = currencyType || files[0].item_price[0]
  files.forEach((file) => {
    const miliSeconds = new Date(file.date_of_sale).getTime() - new Date(file.date_of_listing).getTime()
    data.avg_price += currency(file.item_price).value
    data.avg_shipping += currency(file.buyer_shipping_cost).value
    data.avg_total += currency(file.total).value
    data.total_earnings += currency(file.total).value
    data.total_shipping_cost += currency(file.buyer_shipping_cost).value + currency(file.usps_cost).value
    data.depop_fees +=
      parseFloat(currency(file.depop_fee).value) +
      parseFloat(currency(file.depop_payments_fee).value)
    data.avg_time_listed += miliSeconds / (1000 * 3600 * 24)
    if (currency(file.buyer_shipping_cost).value === 0) {
      data.free_shipping++
    }
    if (file.payment_type === 'PAYPAL') {
      // paypal fees are 2.9% + $0.30
      data.paypal_fees += (0.029 * currency(file.item_price).value) + 0.30
    }
  })
  data.avg_time_listed = parseInt(data.avg_time_listed / files.length)
  data.avg_price = parseFloat(data.avg_price / files.length).toFixed(2)
  data.avg_shipping = parseFloat(data.avg_shipping / files.length).toFixed(2)
  data.avg_total = parseFloat(data.avg_total / files.length).toFixed(2)
  data.total_earnings = parseFloat(data.total_earnings).toFixed(2)
  data.total_shipping_cost = parseFloat(data.total_shipping_cost).toFixed(2)
  data.depop_fees = parseFloat(data.depop_fees).toFixed(2)
  data.paypal_fees = parseFloat(data.paypal_fees).toFixed(2)
  data.getUrl = slug => `https://www.depop.com/${slug}/`
  return data
}
// Util function that cleans up format and sorts our files
const cleanAndSort = (originalFiles) => {
  // gets rid of header row
  const filesToMap = originalFiles.slice().filter(row => row[0] !== 'Date of sale')
  const newFiles = []

  // get's rid of duplicates and converts arrays to objects
  filesToMap.forEach((row, i) => {
    const item = {}
    originalFiles[0].forEach((key, i) => {
      const keyStr = key.toLowerCase().replace(/ /g, '_')
      const val = () => {
        if (keyStr === 'date_of_sale' || keyStr === 'date_of_listing') {
          // converts UTC to local time
          const utc = moment.utc(`${row[i]} ${row[1]}`, 'DD-MM-YYYY h:mm A').format()
          return moment.utc(utc).local().format('MM-DD-YYYY')
        } else if (keyStr === 'time_of_sale') {
          const utc = moment.utc(`${row[0]} ${row[i]}`, 'DD-MM-YYYY h:mm A').format()
          return moment.utc(utc).local().format('hh:mm A')
        }
        return row[i]
      }

      item[keyStr] = val()
    })
    const existsAlready = newFiles.find(e => JSON.stringify(e) === JSON.stringify(item))
    if (!existsAlready) {
      newFiles.push(item)
    }
  })
  return newFiles
}

const sort = (sales) => {
  // Sorts by date
  const sorted = sales.sort((a, b) => {
    const fullDateA = new Date(`${a.date_of_sale} ${a.time_of_sale}`)
    const fullDateB = new Date(`${b.date_of_sale} ${b.time_of_sale}`)
    return fullDateA - fullDateB
  })
  return sorted
}
