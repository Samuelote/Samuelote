import React from 'react'

import {
  singleRow, headerRow,
  tableContainer, a, container, NoResults
} from '../styles/table.module.scss'
import { groupByBuyer } from '../utils/dataGrouping'

const ReturningCustomers = ({ state }) => {
  const keys = ['date_of_sale', 'buyer', 'item_price']
  const labels = {
    date_of_sale: 'Purchase Dates',
    buyer: 'Buyer',
    item_price: 'Item Prices'
  }
  const tableData = groupByBuyer(state)
  if (!state.sales) return null
  if (!state.sales[0]) return null
  if (!tableData.length) return <div className={NoResults}>No Recent Sales Found</div>

  return (

    <div className={container}>

      <div className={tableContainer}>
        <div className={headerRow}>
          {Object.keys(state.sales[0]).map((key) => {
            if (!keys.includes(key)) return null
            return <div key={key}>{labels[key]}</div>
          })}
        </div>
        <div>
          {
            tableData.map((row, i) => {
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
                          href={state.getUrl(row[0].buyer.toLowerCase())}
                        >
                          {row[0].buyer}
                        </a>)
                    } else {
                      return (
                        <div key={i} id='id'>
                          {
                            row.map((sale, i) => {
                              return <div key={i}>{sale[key]}</div>
                            })
                          }
                        </div>
                      )
                    }
                  })}
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default ReturningCustomers
