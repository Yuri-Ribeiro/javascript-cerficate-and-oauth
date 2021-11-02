import React, { useEffect } from 'react'
import api from '@javascript-cerficate-and-oauth/axios-config'

// import { Container } from './styles';

const App: React.FC = () => {
  useEffect(() => {
    api.get('/').then(response => {
      console.log(response)
    })
  }, [])

  return <h1>Hello World</h1>
}

export default App
