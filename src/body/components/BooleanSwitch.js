import React from "react"

import { container, button, buttonSelected } from "../styles/booleanSwitch.module.scss"


const BooleanSwitch = ({ title1, title2, event, bool }) => {
  return (
    <div className={container}>
      <button className={!bool ? button : buttonSelected} onClick={event}>
        {title1}
      </button>
      <button className={bool ? button : buttonSelected} onClick={event}>
        {title2}
      </button>
    </div>
  )
}

export default BooleanSwitch

