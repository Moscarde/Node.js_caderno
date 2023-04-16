import api from '../../../utils'

import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoundedImage'

function MyAdoptions() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => {
            setPets(res.data.pets) 
        })
    }, [])


    return (
        <h1>Minhas adoções</h1>
    )
}

export default MyAdoptions