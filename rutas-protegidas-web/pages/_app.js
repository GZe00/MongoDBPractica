import React from 'react';
import AppContextProvider from '../context/AppContextProvider'
import '../styles/globals.css'
import AppContext from '../context'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }) => {

  const router = useRouter()
  const { apiToken, setApiToken } = React.useContext(AppContext)

  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTokenLocal = localStorage.getItem('apitoken');
      if (!isTokenLocal && !apiToken) {
        router.push('/auth/login')
      } else {
        router.push('/dashboard')
      }
      setIsLoading(true)
    }
  }, [])
  return <>
    {
      isLoading ? <>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </> : null
    }
  </>

}

export default MyApp
