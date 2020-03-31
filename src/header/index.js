import React, { useState, useEffect } from 'react'
import Files from 'react-files'
import { processFiles } from "./util"
import DateDisplay from "./DateDisplay"
import { exampleFile } from "../assets/example_file.js"
const Header = ({ state, setState }) => {
  const [files, updateFiles] = useState([]);
  const [useExample, setUseExample] = useState(true);
  useEffect(() => {
    if (useExample) {
      //set up state from local string/file in assets folder
      processFiles(
        exampleFile,
        (data) => setState({ data, originalData: data }),
        () => alert('error occurred'),
        useExample
      )
    }
  }, [useExample])
  const deleteFileHandler = (i) => {
    const copyOfFiles = files.slice();
    copyOfFiles.splice(i, 1)
    updateFileHandler(copyOfFiles)
  }
  const updateFileHandler = (listOfFiles) => {
    const newList = listOfFiles
    updateFiles(newList);
    processFiles(
      newList,
      (data) => setState({ data, originalData: data }),
      () => alert('error occurred'),
      useExample
    )
  }
  return (
    <div>
      <button onClick={() => setUseExample(!useExample)}>{useExample ? "Using example file" : "Using file upload"}</button>
      {
        !useExample ?
          <Files
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
      {files.map((file, i) => {
        return (
          <div key={i}>
            {file.name}
            <button onClick={() => deleteFileHandler(i)}>delete</button>
          </div>)
      })}
      {
        state.data.files ?
          <div>
            <DateDisplay state={state} setState={setState} />
          </div>
          : null
      }
    </div>
  )
}

export default Header;