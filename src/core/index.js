import React, { useState } from 'react'

import Body from '../body'

const Core = () => {
  const initialState = { data: {} }
  const [state, setState] = useState(initialState)
  const updateState = (newState) => setState({ ...state, ...newState })
  return (
    <div>
      {/* <div className={subContainer}> */}

      {/* <Header state={state} setState={updateState} /> */}
      <Body state={state} setState={updateState} />
      {/* </div> */}
    </div>
  )
}

export default Core
