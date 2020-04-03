import React, { useState } from 'react'
import { mainContainer, subContainer } from '../styles/index.module.scss'

// import Header from "../../header"
import Body from '../../body'

const Core = () => {
  const initialState = { data: {} }
  const [state, setState] = useState(initialState)
  const updateState = (newState) => setState({ ...state, ...newState })
  return (
    <div className={mainContainer}>
      {/* <div className={subContainer}> */}

      {/* <Header state={state} setState={updateState} /> */}
      <Body state={state} setState={updateState} />
      {/* </div> */}
    </div>
  )
}

export default Core
