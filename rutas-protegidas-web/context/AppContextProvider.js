import * as React from "react"
import AppContext from '.'
import { useRouter } from 'next/router'

const AppContextProvider = ({ children }) => {
    const router = useRouter()
    const [apiToken, setToken] = React.useState()
    const [theme, setTheme] = React.useState('light')
    const [username, setUserName] = React.useState()


    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const isTokenLocal = localStorage.getItem('apitoken');
            if (!isTokenLocal && !apiToken) {
                router.push('/auth/login')
            } else if (!apiToken) {
                setToken(isTokenLocal)
            }
        }
    }, [])


    const setApiToken = (apiToken) => {
        setToken(apiToken)
    }

    return <AppContext.Provider
        value={{
            apiToken,
            username,
            theme,
            setApiToken,
            setTheme,
            setUserName,
        }}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider
