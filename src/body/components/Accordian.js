import React, { useState } from 'react'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'
import { header, arrowIcon, body, container, borderHeader } from '../styles/accordian.module.scss'
import { Icon } from 'react-icons-kit'

const Accordian = ({ title, component, showBorder }) => {
  const [closed, setClosed] = useState(false)

  return (
    <div className={container}>
      <div className={showBorder ? borderHeader : header} onClick={() => setClosed(!closed)}>
        <div className={arrowIcon}>
          <Icon icon={closed ? chevronDown : chevronUp} size={10} />
        </div>
        <div>{title || 'Click to open'}</div>
      </div>
      <div className={body}>
        {
          !closed
            ? component
            : null
        }
      </div>
    </div>
  )
}

export default Accordian
