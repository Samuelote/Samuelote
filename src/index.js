import React from 'react'
import ReactDOM from 'react-dom'
import 'react-tippy/dist/tippy.css'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

import './styles/index.module.scss'
import './styles/index.css'
import App from './site/main'
const { createUploadLink } = require('apollo-upload-client')

const cache = new InMemoryCache()
const link = createUploadLink({
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
