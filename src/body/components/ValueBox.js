import React, { useState, useEffect } from 'react'
import { questionCircleO } from 'react-icons-kit/fa'
import { Icon } from 'react-icons-kit'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'
import {
  Tooltip
} from 'react-tippy'
import CountUp from 'react-countup'

import { container, halfcontainer, box_title, box_subValue, box_value, box_qm, box_arrow } from '../styles/valueBox.module.scss'

const ValueBox = ({
  title,
  subValue = 0,
  value = 0,
  currency_type,
  halfSize,
  trueCase,
  tooltipHTML,
  animate,
  float
}) => {
  const [minified, setMini] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  return (
    <div
      className={halfSize ? halfcontainer : container}
      onClick={() => halfSize ? null : setMini(!minified)}
    >
      <div className={box_title}>
        {
          halfSize ? null
            : <div className={box_arrow}>
              <Icon icon={minified ? chevronDown : chevronUp} size={10} />
              </div>
        }
        {!trueCase && title ? title.toUpperCase() : title}
        {minified
          ? ` - ${currency_type || ''}${value}`
          : null}
        {
          halfSize || !tooltipHTML ? null
            : <Tooltip
              disabled={!tooltipHTML}
              html={tooltipHTML}
              open={tooltipOpen}
              onRequestClose={() => setTooltipOpen(false)}
              >
              <div
                className={box_qm}
                onClick={(e) => { e.stopPropagation(); setTooltipOpen(true) }}
              >
                <Icon icon={questionCircleO} size={17} />
              </div>
              </Tooltip>
        }
      </div>

      {
        subValue && !minified
          ? <div className={box_subValue}>{subValue}</div>
          : null
      }
      {
        !minified
          ? <div className={box_value}>{currency_type}

            <CountUp
              decimals={float ? 2 : 0}
              start={animate ? 0 : value}
              end={float ? parseFloat(value) : typeof value === 'number' ? value : 0}
            />

            </div>
          : null
      }

    </div>
  )
}

export default ValueBox
