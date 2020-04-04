import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Files from 'react-files'
import { processFiles } from '../utils/dataSetup'

import {
  container, modal, dropzone, activeDropzone,
  btn, file, heading, btnDisabled, closeX
} from '../styles/modal.module.scss'

Modal.setAppElement('#root')

const FileModal = ({ open, closeModal, setState }) => {
  const [files, updateFiles] = useState([])
  useEffect(() => {
    updateFiles([])
  }, [])
  const updateFileHandler = (listOfFiles) => {
    const newList = listOfFiles
    processFiles(
      newList,
      (data) => setState({ data, originalData: data }),
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
              closeModal()
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
