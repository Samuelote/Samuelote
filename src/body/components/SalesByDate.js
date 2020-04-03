import React, { useState } from 'react'
import {
  ComposedChart, Bar, Line, ResponsiveContainer,
  XAxis, Tooltip
} from 'recharts'
import Switch from 'react-ios-switch'

import { groupDataBy } from '../utils/barchart'
import { chartContainer, switchContainer, label } from '../styles/salesByDate.module.scss'
import moment from 'moment'
import BooleanSwitch from './BooleanSwitch'

const BarChartView = ({ state }) => {
  const [showEmptyDates, setShowEmptyDates] = useState(false)
  const [barChart, setBarChart] = useState(true)
  const chartData = groupDataBy('date_of_sale', state, showEmptyDates)
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
            <XAxis dataKey='Date Sold' tick={{ dy: 5 }} />
            <Tooltip /* labelFormatter={formatTooltip} */ />
            {barChart
              ? <Bar dataKey='Items Sold' fill='#efb5ea' />
              : <Line dataKey='Items Sold' stroke='#efb5ea' strokeWidth={3} />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>

  )
}

export default BarChartView
const formatXAxis = (tickItem) => { console.log('anyways sam. This date format is bad '); return moment(tickItem.replace('-', '/')).format('M/D') }
const formatTooltip = (tickItem) => { console.log('anyways sam. This date format is bad '); return moment(tickItem.replace('-', '/')).format('MMM Do YYYY') }
