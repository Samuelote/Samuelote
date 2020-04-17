import moment from 'moment'

export const groupByDay = (data, key) => {
  const groupedData = {
    Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0
  }
  const newData = []
  if (data.sales) {
    // groups data
    data.sales.forEach((file) => {
      const day = moment(file.date_of_sale, 'MM/DD/YYYY').format('ddd')
      groupedData[day]++
    })
    // sets up data in recharts format
    Object.keys(groupedData).forEach((key) => {
      newData.push({ day: key, sales: groupedData[key] })
    })
  }

  return newData
}

export const groupByTime = (data) => {
  const groupedData = {}
  const newData = []
  if (data.sales) {
    // groups data
    data.sales.forEach((file) => {
      const hour = moment(file.time_of_sale, 'hh:mm A').format('h a')
      if (groupedData[hour]) {
        groupedData[hour]++
      } else {
        groupedData[hour] = 1
      }
    })
    // sets up data in recharts format
    Object.keys(groupedData).forEach((key) => {
      const sortingId = parseInt(moment(key, 'h a').format('H'))
      const formattedId = moment(sortingId, 'H').format('H:00')
      const twentyFour = `${formattedId} - ${moment(sortingId + 1, 'h a').format('H:00')}`
      const twelve = `${key} - ${moment(sortingId + 1, 'h a').format('h a')} `
      newData.push({
        twelve,
        twentyFour,
        sortingId,
        sales: groupedData[key]
      })
    })
  }
  newData.sort((a, b) => {
    return a.sortingId - b.sortingId
  })

  return newData
}

export const groupByBuyer = (data) => {
  const groupedData = {}
  const newData = []
  if (data.sales) {
    // groups data
    data.sales.forEach((file) => {
      if (groupedData[file.buyer]) {
        const dateExists = groupedData[file.buyer].find(
          e => e.date_of_sale === file.date_of_sale
        )
        if (!dateExists) {
          groupedData[file.buyer] = [...groupedData[file.buyer], file]
        }
      } else {
        groupedData[file.buyer] = [file]
      }
    })
    // sets up data in recharts format
    Object.keys(groupedData).forEach((key) => {
      if (groupedData[key].length > 1) {
        newData.push(groupedData[key])
      }
    })
  }
  return newData
}

export const groupByDate = (key, data, showEmptyDates) => {
  const newData = []
  if (data.sales) {
    data.sales.forEach(({ date_of_sale }) => {
      const latest = newData[newData.length - 1]
      if (!newData.length || latest['Date Sold'] !== date_of_sale) {
        if (latest && showEmptyDates) {
          const milisecs =
            new Date(moment(date_of_sale, 'MM-DD-YYYY').format()).getTime()            -
            new Date(moment(latest['Date Sold'], 'MM-DD-YYYY').format()).getTime()
          const diff = milisecs / (1000 * 3600 * 24)
          if (diff !== 1) {
            for (let i = 1; i < diff; i++) {
              const day = new Date(moment(latest['Date Sold'], 'MM-DD-YYYY').format()).getDate() + i
              const date = new Date(moment(latest['Date Sold'], 'MM-DD-YYYY').format())
              const formatted = moment(date.setDate(day)).format('MM-DD-YYYY')
              newData.push({ 'Date Sold': formatted, 'Items Sold': 0 })
            }
          }
        }

        newData.push({ 'Date Sold': date_of_sale, 'Items Sold': 1 })
      } else {
        latest['Items Sold'] += 1
      }
    })
  }
  return newData
}
