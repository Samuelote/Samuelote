import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

import {
  container, input, mainButton,
  inputContainer, label, hiddenLabel, errorText, hiddenError,
  inputContainerWithoutMargin
} from '../../../site/styles/signIn.module.scss'
import { loginSetup } from '../../../site/auth/util'

import { subContainer, heading } from './styles/styles.module.scss'
const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password){
      userId
      email
      files
      accessToken
      refreshToken
    }
  }
`
const SIGNUP = gql`
  mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password){
      email
    }
  }
`
const Auth = ({ setState, signIn }) => {
  const [loginMutation, { data }] = useMutation(LOGIN)
  const [signUpMutation] = useMutation(SIGNUP)
  const [error, setError] = useState(null)

  const [details, add] = useState({ email: '', password: '' })
  const handleMutation = async (vars) => {
    const mutation = signIn ? loginMutation
      : () => {
        return signUpMutation(vars).then(() => {
          setState({
            notification: {
              msg: 'Signed up and logged in',
              type: 'good',
              position: 'top'
            }
          })
          return loginMutation(vars)
        })
      }
    setError(null)
    try {
      const { data } = await mutation(vars)
      if (data) {
        await loginSetup(data, setState)
        setState({
          notification: {
            msg: 'Signed up and logged in',
            type: 'good',
            position: 'top'
          }
        })
      }
    } catch (e) {
      setError(e)
    }
  }
  return (
    <div className={container}>
      <div className={subContainer}>
        <div className={heading}>{signIn ? 'Login to access saved files' : 'Sign up to save files'}</div>
        <div>
          {data ? <div>Logged in</div> : null}
          <div className={!error ? hiddenError : errorText}>
            {error
              ? (
                <>
                  {error.graphQLErrors
                    ? error.graphQLErrors.map(({ message }, i) => (
                      <span key={i}>* {message}</span>
                    ))
                    : <span>{' '}</span>}
                </>)

              : <span>hidden mock error</span>}
          </div>
          <div className={inputContainerWithoutMargin}>
            <label className={details.email.length ? label : hiddenLabel}>Email</label>
            <input
              placeholder='Email'
              className={input}
              type='text'
              value={details.email}
              onChange={(e) => add({ ...details, email: e.target.value })}
            />
          </div>
          <div className={inputContainer}>
            <label className={details.password.length ? label : hiddenLabel}>Password</label>
            <input
              placeholder='Password'
              className={input}
              type='password'
              value={details.password}
              onChange={(e) => add({ ...details, password: e.target.value })}
            />
          </div>
          <button
            className={mainButton}
            disabled={!details.email.length || !details.password.length}
            onClick={() => handleMutation(
              {
                variables: {
                  email: details.email, password: details.password
                }
              }
            )}
          >
            {signIn ? 'Login' : 'Sign Up & Login'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Auth
