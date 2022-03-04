import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'username') {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/api/login', {
            username: username,
            password: password
        }).then( res => {
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/')
        }).catch( err  => {
            alert('Username atau Password Salah')
        })
    }

    return (
        <>
            <div style={{height: window.innerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{padding: '4rem', border: '2rem solid #1E0724', borderRadius: '3rem', backgroundColor: '#E4FC0A', textAlign: 'center'}}>
                    <h2>Silahkan Login</h2>
                    <form id='loginForm' onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                        <input type="text" placeholder="Username" name='username' onChange={handleChange}/>
                        <input type="password" placeholder="Password" name='password' onChange={handleChange}/>
                    </form>
                    <button type='submit' form='loginForm'>Login</button>
                </div>
            </div>
            <style jsx>{`
                input[type='text'], input[type='password'] {
                    margin: 0.5rem;
                    padding: 0.5rem;
                    border: none;
                    border-radius: 0.5rem;
                }
                button {
                    font-size: 1rem;
                    margin: 0.8rem;
                    padding: 0.5rem;
                    background-color: #3A0E45;
                    color: white;
                    font-weight: bold;
                    border: 'none';
                    text-decoration: 'none';
                    border-radius: 10px;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}

export default Login