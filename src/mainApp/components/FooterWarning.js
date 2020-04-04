import React, { useState } from 'react'

import { container, closeX, textContainer } from '../styles/footerWarning.module.scss'

const FooterWarning = ({ msg, close }) => {
  return (
    <div className={container}>
      <div className={closeX} onClick={close}>X</div>
      <div className={textContainer}>
        {msg}
      </div>
    </div>
  )
}

export default FooterWarning
