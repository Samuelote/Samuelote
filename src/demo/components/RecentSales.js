import React, { useState } from 'react'
import Switch from 'react-ios-switch'

import {
  singleRow, headerRow, tableContainer,
  a, container, NoResults
} from '../styles/table.module.scss'
import { switchContainer, label } from '../styles/salesByTime.module.scss'

const RecentSales = ({ state }) => {
  const [showRecent, toggleRecent] = useState(false)
  const keys = ['date_of_sale', 'buyer', 'item_price']
  const labels = {
    date_of_sale: 'Date Sold',
    buyer: 'Buyer',
    item_price: 'Price'
  }
  if (!state.sales) return null
  if (!state.sales[0]) return null

  const sales = [...state.sales].filter(sale => {
    const start = new Date().setDate(new Date().getDate() - 5)
    const condition = showRecent
      ? true
      : new Date(sale.date_of_sale) > new Date(start)

    return condition
  }).reverse()

  if (!sales.length) return <div className={NoResults}>No Recent Sales Found</div>
  return (

    <div className={container}>
      <div className={switchContainer}>
        <div className={label}>
          Show Past {showRecent ? 'Week' : '5'} Sales
        </div>
        <Switch
          checked={showRecent}
          onChange={() => toggleRecent(!showRecent)}
        />
      </div>
      <div className={tableContainer}>
        <div className={headerRow}>
          {Object.keys(state.sales[0]).map((key) => {
            if (!keys.includes(key)) return null
            return <div key={key}>{labels[key]}</div>
          })}
        </div>
        <div>
          {
            sales.map((row, i) => {
              if (i > 4 && showRecent) return null
              return (
                <div className={singleRow} key={i}>
                  {keys.map((key, i) => {
                    if (i === 1) {
                      return (
                        <a
                          className={a}
                          key={i}
                          target='_blank'
                          rel='noopener noreferrer'
                          href={state.getUrl(row[key].toLowerCase())}
                        >
                          {row[key]}
                        </a>)
                    } else return <div key={i}>{row[key]}</div>
                  })}
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
    // )

  )
}

export default RecentSales
