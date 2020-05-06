import React, { useState, useEffect } from 'react'
import { initState } from './utils/dataSetup'
import DateDisplay from './components/DateDisplay'
import ButtonSwitch from './components/ButtonSwitch'
import { setUpExampleFile } from '../assets/example_file.js'
import FileModal from './components/fileModal'

import { subContainer, container, mainContainer } from './styles/topSection.module.scss'
import Fade from './utils/Fade'

const TopSection = ({ state, setState, client }) => {
  const [modalIsOpen, openModal] = useState(false)
  const [useExample, setUseExample] = useState(true)
  useEffect(() => {
    if (useExample) {
      initState(
        setUpExampleFile(),
        (data) => setState({
          data,
          example: true,
          notification: {},
          originalData: data
        })
      ) // set up state from local string/file in assets folder
    }
  }, [useExample])

  return (

    <div className={container}>
      <FileModal
        client={client}
        closeModal={() => {
          openModal(!modalIsOpen)
          if (state.example) {
            setUseExample(true)
          }
        }}
        state={state}
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
          title1='Generate Example'
          title2='Upload Files'
          big
        />

        {
          state.data.sales
            ? (
              <Fade show>
                <div className={mainContainer}>
                  <DateDisplay state={state} setState={setState} />
                </div>
              </Fade>
            )
            : null
        }

      </div>
    </div>
  )
}

export default TopSection
