import React, { useState } from 'react'
import { closeRound, chevronLeft } from 'react-icons-kit/ionicons'
import { Icon } from 'react-icons-kit'
import Logo from '../../assets/shipstation-logo-white.png'
import { container, closedContainer, title, body, iconContainer, subText1, subText2, btn } from '../styles/ads.module.scss'

const ShipStationAd = () => {
  const [isOpen, close] = useState(true)
  return (
    <div className={isOpen ? container : closedContainer}>
      <div className={iconContainer} onClick={() => close(!isOpen)}>
        <Icon size={30} icon={isOpen ? closeRound : chevronLeft} />
      </div>
      <div className={title}>
        <img src={Logo} width='180px' alt='Ship Station Logo' />
      </div>
      <div className={body}>
        <h3 className={subText1}>The fastest, easiest way to get products to your customers.</h3>
        <div className={subText2}>
          Integrate with your <i>PayPal</i>
        </div>
        <a
          className={btn}
          href='https://mbsy.co/Rjwzb'
          target='_blank'
          rel='noopener noreferrer'
        >Try It Free
        </a>
      </div>
    </div>
  )
}

export default ShipStationAd
