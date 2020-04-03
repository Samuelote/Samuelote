import React, { useState } from "react"
import ValueBox from "./ValueBox"
import Switch from 'react-ios-switch';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { groupByTime } from "../utils/dataGrouping";
import BooleanSwitch from "./BooleanSwitch";

import { container, switchContainer, label, } from "../styles/salesByTime.module.scss"

const SalesByDay = ({ state }) => {
  const [viewTable, setView] = useState(true)
  const [timeFormat, setTimeFormat] = useState(false)
  const data = groupByTime(state, "day");
  return (
    <div>
      <BooleanSwitch
        title1="Table"
        title2="Bar Chart"
        event={() => setView(!viewTable)}
        bool={viewTable}
      />
      <div className={switchContainer}>
        <div className={label}>
          24-hour format
        </div>
        <Switch
          checked={timeFormat}
          onChange={() => setTimeFormat(!timeFormat)}
        />
      </div>
      <div className={container}>

        {
          viewTable && data.length ?
            data.map(({ twelve, twentyFour, sales }, i) => {
              return <ValueBox
                key={i}
                halfSize
                title={timeFormat ? twentyFour : twelve}
                value={sales || 0}
                trueCase
              />
            })
            :
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey={timeFormat ? "twentyFour" : "twelve"} />
                <Tooltip />
                <Bar dataKey="sales" fill="#efb5ea" />
              </BarChart>
            </ResponsiveContainer>
        }
      </div>
    </div>
  )
}

export default SalesByDay

