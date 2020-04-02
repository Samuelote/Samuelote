import React, { useState } from 'react'
import Switch from 'react-ios-switch';

import ValueBox from "./components/ValueBox"
import {
  valueBoxes, valueContainer, switchContainer, switchText, container, chartView
} from "./styles/index.module.scss"
import SalesByDay from './components/SalesByDay';
import SalesByTime from './components/SalesByTime';
import SalesByDate from './components/SalesByDate';
import Table from './components/Table';
import Accordian from './components/Accordian';
import Header from "./Header"
const Body = ({ state, setState }) => {
  const [shipping, setShipping] = useState(false)
  const {
    currency_type, total_earnings,
    avg_price, avg_total, avg_shipping, total_shipping_cost,
    avg_time_listed, files
  } = state.data
  return (
    <div className={container}>
      <Header state={state} setState={setState} />
      <div className={valueContainer}>
        <div className={switchContainer}>
          <Switch
            checked={shipping}
            onChange={() => setShipping(!shipping)}
          />
          <div className={switchText}>Factor in shipping</div>
        </div>
        <div className={valueBoxes}>
          <ValueBox
            title="Items Sold"
            value={files ? files.length : null}

          />
          <ValueBox
            title="Avg. Days Listed"
            value={`${avg_time_listed}`}

          />
          <ValueBox
            title="Total Earnings"
            value={shipping ? total_earnings : (total_earnings - total_shipping_cost).toFixed(2)}
            subValue={shipping ? `$${(total_earnings - total_shipping_cost).toFixed(2)} + $${total_shipping_cost}` : null}
            currency_type={currency_type}
          />
          <ValueBox
            title="Avg. Price per Item"
            value={shipping ? avg_total : avg_price}
            subValue={shipping ? `$${avg_price} + $${avg_shipping}` : null}
            currency_type={currency_type}
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