import api from '../../../utils/api'

import styles from './AddPet.module.css'


import { useState } from 'react'
import { useNavigate } from 'react-router-dom';




import useFlashMessage from '../../../hooks/useFlashMessage'

import PetForm from '../../form/PetForm'

function AddPet() {
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    async function registerPet(pet) {
        let msgType = 'success'

        const formData = new FormData()
        
        await Object.keys(pet).forEach(key => {
            if (key === 'images') {
                const qtdImgs = Object.values(pet[key]).length
                for (let i = 0; i < qtdImgs; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.post('pets/create', formData, {
            Authorization: `Bearrer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                msgType = 'error'
                return err.response.data
            })

        setFlashMessage(data.message, msgType)

        if (msgType !== 'error') {
            navigate('/pets/mypets');
        }
    }

    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
        </section>
    )
}

export default AddPet