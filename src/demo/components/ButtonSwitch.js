import React from 'react'

import { container, button, buttonSelected } from '../styles/booleanSwitch.module.scss'

const ButtonSwitch = ({ title1, title2, event1, event2, bool, big }) => {
  return (
    <div className={container}>
      <button
        className={!bool ? button : buttonSelected}
        style={big ? { height: '50px', fontSize: '14px' } : {}}
        onClick={event1}
      >
        {title1}
      </button>
      <button
        className={bool ? button : buttonSelected}
        style={big ? { height: '50px', fontSize: '14px' } : {}}
        onClick={event2}
      >
        {title2}
      </button>
    </div>
  )
}

export default ButtonSwitch
