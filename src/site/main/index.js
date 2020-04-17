import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import FooterWarning from '../components/FooterWarning'
// import ShipStationAd from '../components/ShipStationAd'
import Header from './Header'
import About from './About'
import SignIn from '../auth/SignIn'
import MainApp from '../../demo'

const Core = () => {
  const initialState = { data: {}, warning: null }
  const [state, setState] = useState(initialState)
  const updateState = (newState) => setState({ ...state, ...newState })
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/sign-in'>
          <SignIn state={state} setState={updateState} />
        </Route>
        <Route path='/'>
          <MainApp state={state} setState={updateState} />
          {/* <ShipStationAd /> */}
          {
            state.warning
              ? (<FooterWarning msg={state.warning} close={() => updateState({ warning: '' })} />)
              : null
          }
        </Route>
      </Switch>
    </Router>
  )
}

export default Core
