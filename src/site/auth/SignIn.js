import React, { useState } from 'react'
// import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

import {
  container, input, contentBox, mainButton, buttonContainer,
  inputContainer, logo, fields, label, hiddenLabel, errorText, hiddenError,
  inputContainerWithoutMargin
} from '../styles/signIn.module.scss'
import ButtonSwitch from '../../demo/components/ButtonSwitch'
import { loginSetup } from './util'

const Auth = ({ setState }) => {
  const [loginMutation, { data }] = useMutation(LOGIN)
  const [signUpMutation] = useMutation(SIGNUP)
  const [error, setError] = useState(null)

  const [details, add] = useState({ email: '', password: '' })
  const [signIn, toggleMode] = useState(true)
  const handleMutation = async (vars) => {
    const mutation = signIn ? loginMutation : () => signUpMutation(vars).then(() => loginMutation(vars))
    setError(null)
    try {
      const { data } = await mutation(vars)
      loginSetup(data, setState)
    } catch (e) {
      setError(e)
    }
  }

  return (
    <div className={container}>
      <div className={contentBox}>
        <div className={logo}>Mepop</div>
        <div className={fields}>

          <div className={buttonContainer}>
            <ButtonSwitch
              bool={signIn}
              event1={() => { toggleMode(true); setError(null) }}
              event2={() => { toggleMode(false); setError(null) }}
              title1='Login'
              title2='Sign Up'

            />
          </div>
          {data ? <div>Logged In</div> : null}
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
