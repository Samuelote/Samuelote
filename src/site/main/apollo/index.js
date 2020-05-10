
import Cookies from 'js-cookie'
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
        const data = { username: 'example' }

        fetch('http://localhost:5000/refresh_token',
          {
            method: 'POST',
            body: JSON.stringify(data)

          }
        )
          .then(response => response.json())
          .then(data => console.log(data))
          .catch((error) => {
            console.error('Error:', error)
          })
      } else {
        console.log('global error')
      }
    }
    )
  }
  if (networkError) console.log('Network Error. Please check your internet connection.')
})
