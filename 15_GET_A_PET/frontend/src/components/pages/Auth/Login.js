import { useState, useContext } from 'react'

import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

// Context
import { Context } from '../../../context/UserContext'



function Login() {
    const { login } = useContext(Context)
    const [user, setUser] = useState({})

    // get user object content and add new line
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                
                <input type="submit" value="Entrar" />
            </form>
            <p>
                Não tem uma conta? <Link to="/register">Clique aqui!</Link>
            </p>
        </section>
    )
}

export default Login