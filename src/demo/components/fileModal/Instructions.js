import React, { useState } from 'react'
import Modal from 'react-modal'
import { Icon } from 'react-icons-kit'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'
import gql from 'graphql-tag'

import getFileGif from '../../../assets/get_file_example.gif'
import {
  container, gif,
  gifText, gifSubContainer, ol
} from './styles/fileModal.module.scss'

const Instructions = () => {
  const [gifIsActive, openGif] = useState(false)
  return (
    <div className={container}>

      <div className={gifSubContainer} onClick={() => openGif(!gifIsActive)}>
        <Icon size={15} icon={gifIsActive ? chevronUp : chevronDown} />
        <div className={gifText}>
          How do I get the file? (Website Only)
          </div>
      </div>

      {
        gifIsActive
          ? (
            <div>
              <ol className={ol}>
                <li>
                  <a
                    href='https://www.depop.com/login'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Login to depop.com
                    </a>
                </li>
                <li>Click 'Profile' (top right corner)</li>
                <li>Click 'Download Sales' (top right corner)</li>
                <li>Select date range and click 'Download'</li>
              </ol>
              <img alt='Instructions for obtaining depop file' className={gif} src={getFileGif} />
            </div>
          )
          : null
      }
    </div>
  )
}

export default Instructions
