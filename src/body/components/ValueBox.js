import React, { useState } from 'react'
import { questionCircleO } from 'react-icons-kit/fa'
import { Icon } from 'react-icons-kit'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'
import { container, halfcontainer, box_title, box_subValue, box_value, box_qm, box_arrow } from "../styles/valueBox.module.scss"

const ValueBox = ({ title, subValue = 0, value = 0, currency_type, halfSize, trueCase }) => {
  const [minified, setMini] = useState(false)
  return (
    <div
      className={halfSize ? halfcontainer : container}
      onClick={() => halfSize ? null : setMini(!minified)}
    >
      <div className={box_title}>
        {
          halfSize ? null :
            <div className={box_arrow}>
              <Icon icon={minified ? chevronDown : chevronUp} size={10} />
            </div>
        }
        {trueCase ? title : title.toUpperCase()}
        {minified ?
          ` - ${currency_type || ""}${trueCase ? value : value.toUpperCase()}`
          : null}
        {
          halfSize ? null :
            <button className={box_qm} onClick={() => alert('add modal')}>
              <Icon icon={questionCircleO} size={17} />
            </button>
        }
      </div>

      {
        subValue && !minified ?
          <div className={box_subValue}>{subValue}</div>
          : null
      }
      {
        !minified ?
          <div className={box_value}>{currency_type}{value}</div>
          : null
      }

    </div >
  )
}

export default ValueBox;