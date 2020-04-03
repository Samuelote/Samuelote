import React from 'react'

import { container, logo, navigation, navBtn } from './styles/header.module.scss'

const Header = ({ state, setState }) => {
  return (
    <div className={container}>
      <div className={logo}>LOGO</div>
      <div className={navigation}>
        <button className={navBtn}>App</button>
        <button className={navBtn}>About</button>
      </div>
    </div>
  )
}

export default Header
