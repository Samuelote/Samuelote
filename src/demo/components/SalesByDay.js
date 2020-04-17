import React, { useState } from 'react'
import ValueBox from './ValueBox'

import { chartThird } from '../../styles/colors.module.scss'
import { salesByDayContainer, scrollContainer } from '../styles/salesByDay.module.scss'
import { groupByDay } from '../utils/dataGrouping'
import BooleanSwitch from './BooleanSwitch'
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer
} from 'recharts'

const SalesByDay = ({ state }) => {
  const [viewTable, setView] = useState(true)
  const data = groupByDay(state, 'day')
  return (
    <div>
      <BooleanSwitch
        title1='Table'
        title2='View Chart'
        event={() => setView(!viewTable)}
        bool={viewTable}
      />
      <div className={viewTable ? scrollContainer : salesByDayContainer}>
        {
          viewTable && data.length
            ? data.map(({ day, sales }, i) => {
              return <ValueBox key={i} halfSize title={day} value={sales || 0} trueCase />
            })
            : <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data}>
                <XAxis dataKey='day' />
                <Tooltip />
                <Bar dataKey='sales' fill={chartThird} />
              </BarChart>
            </ResponsiveContainer>
        }
      </div>
    </div>
  )
}

export default SalesByDay
