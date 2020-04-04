import React, { useState } from 'react'

import Body from '../body'
import FooterWarning from '../body/components/FooterWarning'

const Core = () => {
  const initialState = { data: {}, warning: null }
  const [state, setState] = useState(initialState)
  const updateState = (newState) => setState({ ...state, ...newState })
  return (
    <div>
      {/* <div className={subContainer}> */}

      {/* <Header state={state} setState={updateState} /> */}
      <Body state={state} setState={updateState} />
      {
        state.warning
          ? (<FooterWarning msg={state.warning} close={() => updateState({ warning: '' })} />)
          : null
      }
      {/* </div> */}
    </div>
  )
}

export default Core
