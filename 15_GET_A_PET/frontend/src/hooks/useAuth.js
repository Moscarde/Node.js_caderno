import api from '../utils/api'

import { useState, useEffect } from 'react'

import { useNavigate  } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()
    
    // Check if localStorage has token
    useEffect(() => {
        const token = localStorage.getItem('token')

        // Set token in api headers
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    // Push data to beckend route registersss
    async function register(user) {
        let msgText = 'Usuário registrado com sucesso!'
        let msgType = 'success'
       

        try {
            const data = await api.post('/users/register', user)
                .then(response => {
                    return response.data
                })
            console.log(data)
            await authUser(data)
        } catch (error) {
            console.log(error)
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    // Push token to localStorage
    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/');
    }

    function logout() {
        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)
    }

    async function login(user) {
        console.log(user)
        let msgText = `Seja bem vindo!` 
        let msgType = 'success'

        try {
            const data = await api.post('/users/login', user)
                .then(response => {
                    return response.data
                })
            console.log(data)
            await authUser(data)
        } catch (error) {
            console.log(error)
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)

    }

    return { authenticated, register, logout, login }
}