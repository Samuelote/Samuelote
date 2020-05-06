
import { InMemoryCache } from '@apollo/client'

import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'

export const cache = new InMemoryCache()

export const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql'
})
export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message.includes('not authenticated')) {

      } else {
        console.log('global error')
      }
    }
    )
  }
  if (networkError) console.log('Network Error. Please check your internet connection.')
})
