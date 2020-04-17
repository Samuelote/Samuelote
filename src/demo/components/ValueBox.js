import React from 'react'
import CountUp from 'react-countup'

import {
  container, halfcontainer, boxTitle,
  boxValue, boxHalfValue, boxHalfTitle
} from '../styles/valueBox.module.scss'
const ValueBox = ({
  title,
  value = 0,
  currencyType,
  halfSize,
  trueCase,
  animate,
  float
}) => {
  return (
    <div className={halfSize ? halfcontainer : container}>
      <div className={halfSize ? boxHalfTitle : boxTitle}>
        {!trueCase && title ? title.toUpperCase() : title}
      </div>
      <div className={halfSize ? boxHalfValue : boxValue}>
        {currencyType}
        <CountUp
          decimals={float ? 2 : 0}
          start={animate ? 0 : value}
          end={float ? parseFloat(value) : typeof value === 'number' ? value : 0}
        />
      </div>

    </div>
  )
}

export default ValueBox
