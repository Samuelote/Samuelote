import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import { checkmark, close } from 'react-icons-kit/ionicons'
import { document_upload as uploadIcon } from 'react-icons-kit/ikons/document_upload'
import { Tooltip } from 'react-tippy'
import { logout as logOut } from 'react-icons-kit/ikons/logout'
import { processFiles } from '../../utils/dataSetup'
import { logout } from '../../../site/auth/util'
import { activeDropzone, btn, btnDisabled } from './styles/fileModal.module.scss'
import {
  container, fileRow, dropzone,
  checkIcon, deleteIcon, h2, hiddenText,
  topBtnContainer, logoutBtn, addBtn
} from './styles/loggedInView.module.scss'
import Icon from 'react-icons-kit'

const LoggedInView = ({
  state,
  setState,
  saveAndClose,
  client,
  query: { data, error, loading, refetch }
}) => {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted () {
      refetch()
    }
  })
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((item) => {
      uploadFile({ variables: { file: item } })
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.csv'
  })

  const updateFileHandler = (listOfFiles, onSuccess) => {
    const files = []
    listOfFiles.forEach((file) =>
      file.checked ? files.push(file.content) : null
    )
    processFiles(
      files,
      (data) => {
        if (onSuccess) onSuccess()
        setState(
          {
            data,
            originalData: data,
            notification: {},
            example: false
          }
        )
      },
      () => { alert('ERROR OCCURRED') },
      true
    )
  }
  useEffect(() => {
    if (data) {
      if (data.getFiles && state.queryData.length !== data.getFiles.length) {
        const newData = []

        data.getFiles.forEach((file) => {
          newData.push({
            ...file,
            checked: true
          })
        })
        setState({ queryData: newData })
      }
    }
  })
  return (
    <div>
      <div {...getRootProps()} className={isDragActive ? activeDropzone : dropzone}>
        <input {...getInputProps()} />
        <div className={topBtnContainer}>

          <Tooltip title='Upload File' style={{ display: 'flex' }}>
            <button
              className={addBtn}
            >
              <Icon size={25} icon={uploadIcon} />

            </button>
          </Tooltip>
          <button
            className={logoutBtn}
            onClick={(e) => {
              e.stopPropagation()
              client.resetStore()
              logout(setState)
            }}
          >
            Sign out {state.user.email}
            <Icon size={20} icon={logOut} />
          </button>
        </div>
        <div className={container}>
          <h2 className={isDragActive && data ? h2 : hiddenText} hidden={!isDragActive}>
            Drop files here
          </h2>
          {
            !data
              ? null
              : state.queryData.length ? (
                state.queryData.map(
                  ({ filename, checked }, i) =>
                    <div className={fileRow} key={i}>
                      <Mutation
                        mutation={DELETE_FILE}
                        variables={{ file: filename }}
                        onCompleted={refetch}
                      >
                        {
                          deleteFile => (
                            <button
                              className={deleteIcon}
                              onClick={(e) => {
                                e.stopPropagation()
                                return deleteFile()
                              }}
                            >
                              <Icon size={18} icon={close} />
                            </button>
                          )
                        }
                      </Mutation>

                      <button
                        className={checkIcon}
                        onClick={(e) => {
                          e.stopPropagation()
                          const newData = [...state.queryData]
                          newData[i].checked = !checked
                          setState({ queryData: newData })
                        }}
                      >
                        {

                          checked ? <Icon size={18} icon={checkmark} /> : null
                        }
                      </button>

                      {filename.replace(`${state.user.id}_`, '')}
                    </div>
                )
              )
                : !isDragActive ? (
                  <h2 className={h2}>
                    Drop files here or click to upload
                  </h2>
                ) : null
          }

        </div>
      </div>
      {
        data
          ? (
            <button
              className={state.queryData.length ? btn : btnDisabled}
              onClick={(e) => {
                e.stopPropagation()
                updateFileHandler(state.queryData, saveAndClose)
              }}
            >
              Generate Report
            </button>
          ) : null
      }
    </div>
  )
}

export default LoggedInView

const DELETE_FILE = gql`
  mutation deleteFile($file: String!){
    deleteFile(file: $file)
  }
`
const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!){
    uploadFile(file: $file)
  }
`
