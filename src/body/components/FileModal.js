import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Files from 'react-files'
import { Icon } from 'react-icons-kit'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'

import { processFiles } from '../utils/dataSetup'
import getFileGif from '../../assets/get_file_example.gif'
import {
  container, modal, dropzone, activeDropzone,
  btn, file, heading, btnDisabled, closeX, gif,
  gifText, gifSubContainer, ol
} from '../styles/fileModal.module.scss'

Modal.setAppElement('#root')

const FileModal = ({ open, closeModal, setState, saveAndClose }) => {
  const [files, updateFiles] = useState([])
  const [gifIsActive, openGif] = useState(false)

  useEffect(() => {
    updateFiles([])
  }, [])
  const updateFileHandler = (listOfFiles) => {
    const newList = listOfFiles
    processFiles(
      newList,
      (data) => setState(
        {
          data,
          originalData: data,
          warning: null,
          example: false
        }
      ),
      () => alert('error occurred')

    )
  }
  return (
    <div className={container}>
      <Modal
        className={modal}
        isOpen={open}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
      >
        <button className={closeX} onClick={closeModal}>X</button>
        <h2 className={heading}>Upload File</h2>
        <div>

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
                  <img className={gif} src={getFileGif} />
                </div>
              )
              : null
          }
        </div>
        <Files
          className={dropzone}
          dropActiveClassName={activeDropzone}
          onChange={newList => updateFiles(newList)}
          // onError={this.onFilesError}
          accepts={['.csv']}
          multiple
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
        {
          files.map(({ name }, i) => <div className={file} key={i}>{i + 1}. {name}</div>)
        }
        <button
          disabled={!files.length}
          className={!files.length ? btnDisabled : btn}
          onClick={
            () => {
              saveAndClose()
              updateFileHandler(files)
            }
          }
        >
          Generate Report
        </button>
      </Modal>
    </div>
  )
}

export default FileModal
