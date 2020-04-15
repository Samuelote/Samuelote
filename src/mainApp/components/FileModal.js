import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Files from 'react-files'
import { Icon } from 'react-icons-kit'
import { chevronDown, chevronUp } from 'react-icons-kit/ionicons'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { processFiles } from '../utils/dataSetup'
import getFileGif from '../../assets/get_file_example.gif'
import {
  container, modal, dropzone, activeDropzone,
  btn, file, heading, btnDisabled, closeX, gif,
  gifText, gifSubContainer, ol, removeBtn
} from '../styles/fileModal.module.scss'

Modal.setAppElement('#root')

// const ADD_FILE = gql`
//   mutation uploadFiles($file: Upload!){
//     uploadFiles(files: $file){
//       success
//       error
//   }
// }
// `

const uploadFileMutation = gql`
  mutation($file: Upload!){
    uploadFile(file: $file)
  }
`

const FileModal = ({ open, closeModal, setState, saveAndClose }) => {
  const [addFile, { data }] = useMutation(uploadFileMutation)

  const [files, updateFiles] = useState([])
  const [gifIsActive, openGif] = useState(false)
  useEffect(() => {
    updateFiles([])
  }, [])
  const updateFileHandler = (listOfFiles, onSuccess) => {
    const newList = listOfFiles
    const error = false
    processFiles(
      newList,
      (data) => {
        if (onSuccess) onSuccess()
        setState(
          {
            data,
            originalData: data,
            warning: null,
            example: false
          }
        )
      },
      () => updateFiles([])
    )
    return error
  }
  if (files.length) {
    console.log(files)
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
                  <img alt='Instructions for obtaining depop file' className={gif} src={getFileGif} />
                </div>
              )
              : null
          }
        </div>

        {
          !files.length
            ? (
              <Files
                className={dropzone}
                dropActiveClassName={activeDropzone}
                onChange={newList => updateFiles(newList)}
                onError={err => alert(err.message)}
                accepts={['.csv']}
                multiple
                maxFileSize={10000000}
                minFileSize={0}
                clickable
              >
                Drop files here or click to upload
              </Files>
            )
            : (
              <button
                onClick={() => updateFiles([])}
                className={removeBtn}
              >
                Remove {files.length === 1 ? 'File' : 'Files'} and upload others
              </button>
            )
        }
        {
          files.map(({ name }, i) => <div className={file} key={i}>{i + 1}. {name}</div>)
        }
        <button
          disabled={!files.length}
          className={!files.length ? btnDisabled : btn}
          onClick={
            () => {
              addFile({ variables: { file: files[0] } })
              updateFileHandler(files, saveAndClose)
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
