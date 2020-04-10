import React from 'react'
import { Link } from 'react-router-dom'
import { container, logo, navigation, navBtn } from '../styles/header.module.scss'

const Header = () => {
  return (
    <div className={container}>
      <h1 className={logo}><i>Mepop</i></h1>
      <div className={navigation}>
        <Link className={navBtn} to='/'>Reports</Link>
        <Link className={navBtn} to='/about'>About</Link>
      </div>
    </div>
  )
}

export default Header
