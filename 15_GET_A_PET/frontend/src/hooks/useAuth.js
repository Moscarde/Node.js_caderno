import api from '../utils/api'

import { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const { setFlashMessage } = useFlashMessage()

    // Batendo dados na rota users/register
    async function register(user) {
        let msgText = 'Usuário registrado com sucesso!'
        let msgType = 'success'
        console.log(user)

        try {
            const data = await api.post('/users/register', user)
                .then(response => {
                    return response.data
                })

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    return { register }
}