import React, { useState, useEffect } from 'react'
import Switch from 'react-ios-switch'
import CountUp from 'react-countup'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Sector
} from 'recharts'

import {
  chartFill, chartFourth, chartSecondary, chartThird
} from '../../styles/colors.module.scss'
import {
  container, boxTitle, boxValue, chart,
  titlesContainer, switchContainer, label
} from '../styles/TopRadialChart.module.scss'

const COLORS = [chartFill, chartSecondary, chartThird, chartFourth]

const TopRadialGraphs = ({
  title,
  value = 0,
  currencyType,
  float,
  data,
  netValue
}) => {
  const [index, setIndex] = useState(0)
  const [net, setNet] = useState(false)
  const [activeVal, setActiveVal] = useState(value)

  useEffect(() => {
    setActiveVal(value)
  }, [value])

  return (
    <div className={container}>
      <div className={titlesContainer}>

        <h2 className={boxTitle}>
          {title.toUpperCase()}
        </h2>
        <div className={switchContainer}>
          <Switch
            checked={net}
            onChange={() => {
              setNet(!net)
              setActiveVal(value === activeVal ? netValue : value)
            }}
          />
          <div className={label}>
            Show Net Profit
          </div>
        </div>
        <div className={boxValue}>
          {currencyType}
          <CountUp
            formattingFn={
              num => num.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            }
            decimals={float ? 2 : 0}
            start={activeVal === value ? parseFloat(netValue) : parseFloat(value)}
            end={float ? parseFloat(activeVal) : typeof activeVal === 'number' ? activeVal : 0}
          />
        </div>
      </div>
      <div className={chart}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              activeIndex={index}
              activeShape={(props) => <ActiveShape {...props} currency={currencyType} />}
              data={data}
              innerRadius={60}
              outerRadius={80}
              // fill='#8884d8'
              paddingAngle={5}
              dataKey='value'
              onMouseEnter={(_, i) => setIndex(i)}
            >
              {
                data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
                )
              }
            </Pie>

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TopRadialGraphs

const ActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, currency
  } = props

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor='middle' fill={fill}>{payload.name}</text>
      <text x={cx} y={cy + 10} dy={8} textAnchor='middle' fill={fill}>
        {currency}{payload.value.toFixed(2)}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius + 5}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

    </g>
  )
}
