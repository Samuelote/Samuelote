import React from "react"
import { singleRow, headerRow, tableContainer } from "../styles/table.module.scss"


const Table = ({ state }) => {
  const keys = ['date_of_sale', 'buyer', 'item_price']
  const labels = {
    date_of_sale: "Date Sold",
    buyer: "Buyer",
    item_price: "Price"
  }
  if (!state.files) return null;
  return (
    <div>
      <div className={tableContainer}>

        <div className={headerRow}>
          {Object.keys(state.files[0]).map((key) => {
            if (!keys.includes(key)) return null;
            return <div key={key}>{labels[key]}</div>
          })}
        </div>
        <div>
          {
            state.files.map((row, i) => {
              const start = new Date().setDate(new Date().getDate() - 7);
              if (new Date(row.date_of_sale) > start) {
                return (
                  <div className={singleRow} key={i}>
                    {keys.map((key, i) => <div key={i}>{row[key]}</div>)}
                  </div>
                )
              } else return null
            })
          }
        </div>
      </div>

    </div>
  )
}

export default Table


