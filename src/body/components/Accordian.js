import React, { useState } from "react"
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'
import { header, arrowIcon, body, container } from "../styles/accordian.module.scss"
import { Icon } from 'react-icons-kit'

const Accordian = ({ title, component }) => {
  const [closed, setClosed] = useState(false)

  return (
    <div className={container}>
      <div className={header} onClick={() => setClosed(!closed)}>
        <div className={arrowIcon}>
          <Icon icon={closed ? chevronDown : chevronUp} size={10} />
        </div>
        <div>{title || "Click to open"}</div>
      </div>
      {
        closed ? null :
          <div className={body}>
            {component}
          </div>
      }
    </div>
  )
}

export default Accordian
