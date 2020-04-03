import React, { useState, useEffect } from 'react'
import Files from 'react-files'
import { processFiles } from './utils/dataSetup'
import DateDisplay from './components/DateDisplay'
import BooleanSwitch from './components/BooleanSwitch'
import { exampleFile } from '../assets/example_file.js'

import { subContainer, container, mainContainer } from './styles/header.module.scss'

const Header = ({ state, setState }) => {
  const [files, updateFiles] = useState([])
  const [useExample, setUseExample] = useState(true)
  useEffect(() => {
    if (useExample) {
      // set up state from local string/file in assets folder
      processFiles(
        exampleFile,
        (data) => setState({ data, originalData: data }),
        () => alert('error occurred'),
        useExample
      )
    }
  }, [useExample])

  const updateFileHandler = (listOfFiles) => {
    const newList = listOfFiles
    updateFiles(newList)
    processFiles(
      newList,
      (data) => setState({ data, originalData: data }),
      () => alert('error occurred'),
      useExample
    )
  }
  return (
    <div className={container}>
      <div className={subContainer}>
        <BooleanSwitch
          bool={useExample}
          event={() => setUseExample(!useExample)}
          title1='Using Example File'
          title2='Upload My Own File'
          big
        />

        {
          !useExample
            ? <Files
              className='files-dropzone'
              onChange={updateFileHandler}
              // onError={this.onFilesError}
              accepts={['.csv']}
              multiple
              maxFileSize={10000000}
              minFileSize={0}
              clickable
              >
              Drop files here or click to upload
              </Files> : null
        }

        {
          state.data.files
            ? <div className={mainContainer}>
              <DateDisplay state={state} setState={setState} />
              </div>
            : null
        }
      </div>
    </div>
  )
}

export default Header
