import React, { useState } from 'react'
import Switch from 'react-ios-switch';

import ValueBox from "./components/ValueBox"
import {
  valueBoxes, valueContainer, switchContainer, switchText, container
} from "./styles/index.module.scss"
import { filesO } from 'react-icons-kit/fa';

const Body = ({ state }) => {
  const [shipping, setShipping] = useState(false)
  const {
    currency_type, total_earnings,
    avg_price, avg_total, avg_shipping, total_shipping_cost,
    files
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
      </div>
    </div>
  )
}

export default Body;