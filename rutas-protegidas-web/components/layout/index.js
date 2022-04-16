import React from 'react'
import NavBar from './NavBar'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState(false)
  const [isToken, setIsToken] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTokenLocal = localStorage.getItem('apitoken');
      if (!isTokenLocal) {
        router.push('/auth/login')
      } else {
        setIsToken(true)
      }
      setIsLoading(true)
    }
  }, [])

  return <>
    {
      isLoading ? isToken ? <>
        <div className='w-full h-screen overflow-y-auto bg-slate-200'>
          <NavBar />
          <div className='w-8/12 mx-auto'>
            {children}
          </div>
        </div>
      </>
        : null
        : null
    }
  </>
}

export default Layout