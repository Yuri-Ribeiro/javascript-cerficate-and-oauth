import React, { useEffect } from 'react'

import api from './utils/axios'

const App: React.FC = () => {
  useEffect(() => {
    api.get('/').then(response => {
      console.log(response)
    })
  }, [])

  return <h1>Hello World</h1>
}

export default App
