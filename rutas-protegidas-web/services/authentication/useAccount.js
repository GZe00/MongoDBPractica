import React from 'react';
import * as authApi from '../../services/authentication/'
import { useRouter } from 'next/router'
import AppContext from '../../context';

const useSignLogin = () => {
    const { setApiToken } = React.useContext(AppContext)
    const router = useRouter()
    const [data, setData] = React.useState()
    const [error, setError] = React.useState()
    const [isLoading, setIsLoading] = React.useState(false)
    const [statusCreate, setStatusCreate] = React.useState(undefined)

    const [getUser, setGetUser] = React.useState()
    const [userInfo, setUserInfo] = React.useState()
    const [newUser, setNewUser] = React.useState()

    React.useEffect(() => {
        if (getUser) {
            if (error)
                setError()
            setIsLoading(true)
            authApi.getUser(getUser).then(response => {
                if (response.code !== 200) {
                    setError(response.message)
                } else {
                    setUserInfo(response.data[0])
                }
            })
                .catch(error => {
                    console.log(error)
                    setError(error.message)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [getUser])


    React.useEffect(() => {
        if (data) {
            if (error)
                setError()
            setIsLoading(true)
            authApi.login(data).then(response => {
                if (!response.status) {
                    setError(response.message)
                } else {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('apitoken', response.token);
                        setApiToken(response.token);
                    }
                    router.push('/dashboard')
                }
            })
                .catch(error => {
                    console.log(error)
                    setError(error.message)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [data])

    React.useEffect(() => {
        if (newUser) {
            if (error)
                setError()
            setIsLoading(true)
            setStatusCreate(undefined)
            authApi.create(newUser).then(response => {
                if (!response.status) {
                    setError(response.message)
                    setStatusCreate(false)
                } else {
                    setStatusCreate(true)
                }
            })
                .catch(error => {
                    console.log(error)
                    setError(error.message)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [newUser])


    return {
        error,
        isLoading,
        data,
        statusCreate,
        userInfo,
        setData,
        setNewUser,
        setGetUser
    }

}

export default useSignLogin