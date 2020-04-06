import React, { useState } from 'react'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'
import { header, arrowIcon, body, container, borderHeader } from '../styles/accordian.module.scss'
import { Icon } from 'react-icons-kit'
import { Transition } from 'react-transition-group'

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

      <Transition
        in={!closed}
        timeout={duration}
        unmountOnExit
        mountOnEnter
      >
        {state => (
          <div
            className={body} style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            {component}

          </div>

        )}
      </Transition>

    </div>
  )
}

export default Accordian

const duration = 200

const defaultStyle = {
  transition: `opacity ${duration}ms`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}
