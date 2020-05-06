import React from 'react'

import { warning, good, bad, closeX, whiteCloseX, textContainer, top } from '../styles/notification.module.scss'

const Notification = ({ notification: { msg, type, position, disabled }, close }) => {
  const container = type === 'good' ? good : type === 'bad' ? bad : warning
  const xStyles = type === 'warning' ? closeX : whiteCloseX
  const positionStyle = position === 'top' ? top : null

  if (disabled) return null
  return (
    <div className={`${container} ${positionStyle}`}>
      <div className={xStyles} onClick={close}>X</div>
      <div className={textContainer}>
        {msg}
      </div>
    </div>
  )
}

export default Notification
