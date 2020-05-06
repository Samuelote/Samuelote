import React, { useState, useEffect } from 'react'
import Files from 'react-files'

import { processFiles } from '../../utils/dataSetup'
import {
  container, dropzone, activeDropzone,
  btn, file, btnDisabled, removeBtn
} from './styles/fileModal.module.scss'

const FileModal = ({ setState, saveAndClose }) => {
  const [files, updateFiles] = useState([])
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
            example: false
          }
        )
      },
      () => updateFiles([])
    )
    return error
  }
  return (
    <>

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
        onClick={() => {
          updateFileHandler(files, saveAndClose)
        }}
      >
        Generate Report
      </button>

    </>
  )
}

export default FileModal
