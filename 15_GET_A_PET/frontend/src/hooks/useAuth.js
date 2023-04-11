import api from '../utils/api'

import { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {

    const { setFlashMessage } = useFlashMessage()

    // Batendo dados na rota users/register
    async function register(user) {

        let msgText = 'Castro realizado com sucesso'
        let msgType = 'sucess'

        try {
            const data = await api.post('/users/register', user)
                .then(response => {
                    return response.data
                })

            console.log(data)
        } catch (error) {
            let msgText = error.response.data.message
            let msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    return { register }
}