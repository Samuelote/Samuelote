import React, { useState } from 'react'
import Switch from 'react-ios-switch'
import moment from 'moment'
import {
  ComposedChart, Bar, Line, ResponsiveContainer,
  XAxis, Tooltip
} from 'recharts'

import { chartContainer, switchContainer, label } from '../styles/switch.module.scss'
import { chartFill } from '../../styles/colors.module.scss'
import { groupByDate } from '../utils/dataGrouping'
import BooleanSwitch from './BooleanSwitch'

const BarChartView = ({ state }) => {
  const [showEmptyDates, setShowEmptyDates] = useState(false)
  const [barChart, setBarChart] = useState(true)
  const chartData = groupByDate('date_of_sale', state, showEmptyDates)
  return (
    <div>
      <BooleanSwitch
        title1='Bar Chart'
        title2='Line Chart'
        event={() => setBarChart(!barChart)}
        bool={barChart}
      />
      <div className={switchContainer}>
        <div className={label}>
          Show dates with no sales
        </div>
        <Switch
          checked={showEmptyDates}
          onChange={() => setShowEmptyDates(!showEmptyDates)}
        />
      </div>

      <div className={chartContainer}>

        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
          >
            <XAxis dataKey='Date Sold' tick={{ dy: 5 }} tickFormatter={formatXAxis} />
            <Tooltip labelFormatter={formatTooltip} />
            {barChart
              ? <Bar dataKey='Items Sold' fill={chartFill} />
              : <Line type='monotone' dataKey='Items Sold' stroke={chartFill} strokeWidth={3} />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>

  )
}

export default BarChartView

const formatXAxis = (tickItem) => { return moment(tickItem, 'MM/DD/YYYY').format('M/D') }
const formatTooltip = (tickItem) => { return moment(tickItem, 'MM/DD/YYYY').format('MMM Do YYYY') }
