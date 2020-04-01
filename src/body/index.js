import React, { useState } from 'react'
import Switch from 'react-ios-switch';

import ValueBox from "./components/ValueBox"
import {
  valueBoxes, valueContainer, switchContainer, switchText, container, chartView
} from "./styles/index.module.scss"
import HeatMapView from './components/HeatMap';
import BarChart from './components/BarChart';
import Table from './components/Table';
import Accordian from './components/Accordian';

const Body = ({ state }) => {
  const [shipping, setShipping] = useState(false)
  const {
    currency_type, total_earnings,
    avg_price, avg_total, avg_shipping, total_shipping_cost,
    avg_time_listed, files
  } = state.data
  return (
    <div className={container}>

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
            halfSize
          />
          <ValueBox
            title="Avg. Days Listed"
            value={`${avg_time_listed}`}
            halfSize
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
            title="Sale Hisotry"
            component={<BarChart state={state.data} />}
          />
        </div>
        <div className={chartView}>
          <Accordian
            title="Recent Sales"
            component={<Table state={state.data} />}
          />
        </div>

        <div className={chartView}>
          <Accordian
            title="Sale History"
            component={<HeatMapView state={state.data} />}
          />
        </div>

      </div>
    </div>
  )
}

export default Body;