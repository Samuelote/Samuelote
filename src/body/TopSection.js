import React, { useState, useEffect } from 'react'
import { initState } from './utils/dataSetup'
import DateDisplay from './components/DateDisplay'
import ButtonSwitch from './components/ButtonSwitch'
import { setUpExampleFile } from '../assets/example_file.js'
import FileModal from './components/FileModal'

import { subContainer, container, mainContainer } from './styles/topSection.module.scss'

const TopSection = ({ state, setState }) => {
  const [modalIsOpen, openModal] = useState(false)
  const [useExample, setUseExample] = useState(true)
  useEffect(() => {
    if (useExample) {
      initState(
        setUpExampleFile(),
        (data) => setState({ data, example: true, warning: '', originalData: data })
      ) // set up state from local string/file in assets folder
    }
  }, [useExample])

  return (
    <div className={container}>
      <FileModal
        closeModal={() => {
          openModal(!modalIsOpen)
          if (state.example) {
            setUseExample(true)
          }
        }}
        open={modalIsOpen}
        setState={setState}
        saveAndClose={() => openModal(!modalIsOpen)}
      />
      <div className={subContainer}>
        <ButtonSwitch
          bool={useExample}
          event1={() => setUseExample(true)}
          event2={() => {
            setUseExample(false)
            openModal(true)
          }}
          title1='Generate Example File'
          title2='Upload File'
          big
        />

        {
          state.data.sales
            ? <div className={mainContainer}>
              <DateDisplay state={state} setState={setState} />
            </div>
            : null
        }
      </div>
    </div>
  )
}

export default TopSection
