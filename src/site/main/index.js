import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Query } from 'react-apollo'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import { ApolloClient } from '@apollo/client'
import Cookies from 'js-cookie'
import gql from 'graphql-tag'
import {
  cache,
  errorLink,
  uploadLink
} from './apollo'

import Notification from '../components/Notification'
// import ShipStationAd from '../components/ShipStationAd'
import Header from './Header'
import About from './About'
import SignIn from '../auth/SignIn'
import MainApp from '../../demo'

const Core = () => {
  const persistSessionLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${Cookies.get('pomc')}` : ''
      }
    }
  })
  const client = new ApolloClient({
    cache,
    link: persistSessionLink.concat(errorLink.concat(uploadLink))
  })
  const initialState = {
    data: {},
    notification: {},
    files: [],
    user: {},
    queryData: []
  }
  const [state, setState] = useState(initialState)
  const updateState = (newState) => {
    setState({ ...state, ...newState })
  }
  const token = Cookies.get('pomc')
  return (
    <ApolloProvider client={client}>
      <Query query={GET_USER} fetchPolicy='network-only'>
        {({ error, data }) => {
          if (data && token) {
            if (JSON.stringify(state.user) !== JSON.stringify(data.getUser)) {
              updateState({ user: { ...data.getUser } })
            }
          } else if (error) {
            if (JSON.stringify(state.user) !== '{}') {
              updateState({ user: {} })
            }
          }
          return (
            <Router>
              <Header />
              <Switch>
                <Route path='/about'>
                  <About />
                </Route>
                <Route path='/login'>
                  <SignIn state={state} setState={updateState} />
                </Route>
                <Route path='/'>
                  <MainApp state={state} setState={updateState} client={client} />
                  {/* <ShipStationAd /> */}

                  {
                    state.notification.msg
                      ? (
                        <Notification
                          notification={state.notification}
                          close={() => updateState({ notification: { disabled: true } })}
                        />
                      )
                      : null
                  }
                </Route>
              </Switch>
            </Router>
          )
        }}
      </Query>
    </ApolloProvider>
  )
}

export default Core

const GET_USER = gql`
  query {
    getUser {
      id
      email
      files
      account {
        type
      }
    }
  }
`
