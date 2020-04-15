import React from 'react'
import ReactDOM from 'react-dom'
import 'react-tippy/dist/tippy.css'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

import './index.module.scss'
import './index.css'
import App from './core/main'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const client = new ApolloClient({
  cache,
  link
})
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,

  document.getElementById('root')
)
