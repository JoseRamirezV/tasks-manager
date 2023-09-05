import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import AppRouter from './appRouter.jsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <HelmetProvider>
        <AppRouter />
      </HelmetProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
