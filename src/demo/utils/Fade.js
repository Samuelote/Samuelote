// Fade.js

import React, { useEffect, useState } from 'react'

import { fadeIn, fadeOut, fadeInOpacityOnly, fadeOutOpacityOnly } from '../../styles/global.module.scss'
const Fade = ({ show, children, noShadow, duration }) => {
  const [shouldRender, setRender] = useState(show)
  const fades = {
    fadeIn: noShadow ? fadeInOpacityOnly : fadeIn,
    fadeOut: fadeOut ? fadeOutOpacityOnly : fadeOut
  }
  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setRender(false)
  }

  return (
    shouldRender && (
      <div
        style={{ animation: `${show ? fades.fadeIn : fades.fadeOut} ${duration || 0.2}s`, animationFillMode: 'forwards' }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  )
}

export default Fade
