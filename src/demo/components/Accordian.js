import React, { useState } from 'react'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'
import {
  header, arrowIcon, body, container, borderHeader, halfContainer
} from '../styles/accordian.module.scss'
import { Icon } from 'react-icons-kit'

import Fade from '../utils/Fade'

const Accordian = ({ title, component, showBorder, halfSize }) => {
  const [show, setShow] = useState(true)
  return (
    <div className={halfSize ? halfContainer : container}>
      <div
        className={showBorder ? borderHeader : header}
        onClick={() => setShow(show => !show)}
      >
        <div className={arrowIcon}>
          <Icon icon={!show ? chevronDown : chevronUp} size={10} />
        </div>
        <div>{title || 'Click to open'}</div>
      </div>
      <Fade show={show}>
        <div className={body}>
          {component}
        </div>
      </Fade>
    </div>

  )
}

export default Accordian
