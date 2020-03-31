import React, { useState } from 'react'
import { questionCircleO } from 'react-icons-kit/fa'
import { Icon } from 'react-icons-kit'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'
import { container, box_title, box_subValue, box_value, box_qm, box_arrow } from "../styles/valueBox.module.scss"

const ValueBox = ({ title, subValue = 0, value = 0, currency_type }) => {
  const [minified, setMini] = useState(false)
  return (
    <div className={container} onClick={() => setMini(!minified)}>

      <div className={box_title}>
        <div className={box_arrow}>

          <Icon icon={minified ? chevronDown : chevronUp} size={10} />
        </div>
        {title}
        {minified ? ` - ${currency_type || ""}${value}` : null}
        <button className={box_qm} onClick={() => alert('add modal')}>
          <Icon icon={questionCircleO} size={17} />
        </button>
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