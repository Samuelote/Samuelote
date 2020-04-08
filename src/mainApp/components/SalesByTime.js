import React, { useState } from 'react'
import ValueBox from './ValueBox'
import Switch from 'react-ios-switch'
import {
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { groupByTime } from '../utils/dataGrouping'
import BooleanSwitch from './BooleanSwitch'
import { chartSecondary } from '../../colors.module.scss'

import { scrollContainer, switchContainer, label, container } from '../styles/salesByTime.module.scss'

const SalesByDay = ({ state }) => {
  const [viewTable, setView] = useState(true)
  const [timeFormat, setTimeFormat] = useState(false)
  const data = groupByTime(state, 'day')
  return (
    <div>
      <BooleanSwitch
        title1='Table'
        title2='View Chart'
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
      <div className={viewTable ? scrollContainer : container}>

        {
          viewTable && data.length
            ? data.map(({ twelve, twentyFour, sales }, i) => {
              return <ValueBox
                key={i}
                halfSize
                title={timeFormat ? twentyFour : twelve}
                value={sales || 0}
                trueCase
                     />
            })
            : <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={data}>
                <XAxis dataKey={timeFormat ? 'twentyFour' : 'twelve'} />
                <Tooltip />
                <Line dataKey='sales' stroke={chartSecondary} strokeWidth={2} />
              </LineChart>
              </ResponsiveContainer>
        }
      </div>
    </div>
  )
}

export default SalesByDay
