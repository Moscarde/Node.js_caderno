import {useState, useEffect } from 'react'

import styles from './Profile.module.css'
import formStyles from '../../form/Form.modules.css'

import Input from '../../form/Input'

function Profile() {
    function onFileChange(e) {

    }
    function handleChange(e) {

    }

    

    return (
        <section>
            <h1>Perfil</h1>
            <p>Preview Imagem</p>
            <form>
                <Input
                    text="Imagem"
                    type="file"
                    name="imagem"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite um novo email"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />

            </form>
        </section>
    )
}

export default Profile