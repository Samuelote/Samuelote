import React, { useState } from "react"
import {
  ComposedChart, Bar, Line, ResponsiveContainer,
  XAxis, CartesianGrid, Tooltip,
} from 'recharts';
import Switch from 'react-ios-switch';

import { groupDataBy } from "./utils"
import { chartContainer, switchContainer, label } from "../styles/barChart.module.scss"
import moment from "moment";

const BarChartView = ({ state }) => {
  const [showEmptyDates, setShowEmptyDates] = useState(false);
  const [barChart, setBarChart] = useState(true)
  const chartData = groupDataBy("date_of_sale", state, showEmptyDates);
  return (
    <div >
      <div className={switchContainer}>
        <div className={label}>
          Show dates with no sales
        </div>
        <Switch
          checked={showEmptyDates}
          onChange={() => setShowEmptyDates(!showEmptyDates)}
        />
      </div>
      <div className={switchContainer}>
        <div className={label}>
          {barChart ? "Bar Chart" : "Line Chart"}
        </div>
        <Switch
          onColor={"#4CC059"}
          offColor={"#4CC059"}
          checked={barChart}
          onChange={() => setBarChart(!barChart)}
        />
      </div>
      <div className={chartContainer}>

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date Sold" tickFormatter={formatXAxis} tick={{ dy: 5 }} />
            <Tooltip labelFormatter={formatTooltip} />
            {barChart
              ? <Bar dataKey="Items Sold" fill="green" />
              : <Line dataKey="Items Sold" fill="green" />
            }
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>


  )

}

export default BarChartView;
const formatXAxis = (tickItem) => { console.log('anyways sam. This date format is bad '); return moment(tickItem.replace("-", '/')).format("M/D") }
const formatTooltip = (tickItem) => { console.log('anyways sam. This date format is bad '); return moment(tickItem.replace("-", '/')).format("MMM Do YYYY") }
