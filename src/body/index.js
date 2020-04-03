import React, { useState } from 'react'
import Switch from 'react-ios-switch';

import ValueBox from "./components/ValueBox"
import {
  valueBoxes, valueContainer, switchContainer, switchText, container, chartView, tooltip
} from "./styles/index.module.scss"
import SalesByDay from './components/SalesByDay';
import SalesByTime from './components/SalesByTime';
import SalesByDate from './components/SalesByDate';
import Table from './components/Table';
import Accordian from './components/Accordian';
import Header from "./Header"
const Body = ({ state, setState }) => {
  const [showMore, setShowMore] = useState(false)
  const {
    currency_type, total_earnings,
    avg_price, avg_total, avg_shipping, total_shipping_cost,
    avg_time_listed, files, total_fees_paid
  } = state.data;
  return (
    <div className={container}>
      <Header state={state} setState={setState} />
      <div className={valueContainer}>
        <div className={switchContainer}>
          <Switch
            checked={showMore}
            onChange={() => setShowMore(!showMore)}
          />
          <div className={switchText}>Show More</div>
        </div>
        <div className={valueBoxes}>

          <ValueBox
            tooltipHTML={(
              <div className={tooltip}>
                Fees: {currency_type}{total_fees_paid}<br></br>
                Shipping: {currency_type}{total_shipping_cost}
              </div>
            )}
            title={showMore ? "Net Earnings" : "Gross Earnings"}
            value={showMore ?
              (total_earnings - total_shipping_cost - total_fees_paid).toFixed(2)
              :
              total_earnings
            }
            subValue={showMore ?
              `${currency_type}${total_earnings} 
              -
              ${currency_type}${total_shipping_cost}
              -
              ${currency_type}${total_fees_paid}
              `
              : null
            }
            currency_type={currency_type}
          />
          <ValueBox
            tooltipHTML={(
              <div className={tooltip}>
                Avg. Item Price: {currency_type}{avg_price}<br></br>
                Shipping: {currency_type}{avg_shipping}
              </div>
            )}
            title="Avg. Price per Item"
            value={showMore ? avg_total : avg_price}
            subValue={showMore ? `$${avg_price} + $${avg_shipping}` : null}
            currency_type={currency_type}
          />
          <ValueBox
            title="Items Sold"
            value={files ? files.length : null}
          />
          <ValueBox
            title="Avg. Days Listed"
            value={`${avg_time_listed}`}
          />
        </div>
        <div className={chartView}>
          <Accordian
            title="Sales by time"
            component={<SalesByTime state={state.data} />}
          />
        </div>

        <div className={chartView}>
          <Accordian
            title="Sales by Date"
            component={<SalesByDate state={state.data} />}
          />
        </div>
        <div className={chartView}>
          <Accordian
            title="Recent Sales (Past Week)"
            component={<Table state={state.data} />}
          />
        </div>

        <div className={chartView}>
          <Accordian
            title="Sales by Day"
            component={<SalesByDay state={state.data} />}
          />
        </div>


      </div>
    </div>
  )
}

export default Body;