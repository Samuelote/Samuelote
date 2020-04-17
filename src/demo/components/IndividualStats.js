import React from 'react'
import ValueBox from './ValueBox'

import { container } from '../styles/individualStats.module.scss'

const Stats = ({ values, currency }) => {
  return (

    <div className={container}>
      {
        values.map(({ label, value }, i) => {
          return (
            <ValueBox
              key={i}
              // halfSize
              title={label}
              value={label === 'Average Item Price' ? parseFloat(value) : value || 0}
              float={label === 'Average Item Price'}
              currencyType={label === 'Average Item Price' ? currency : null}
              trueCase
              animate
            />
          )
        })
      }
    </div>
  )
}

export default Stats
