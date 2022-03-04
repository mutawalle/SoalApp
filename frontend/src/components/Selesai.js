import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Selesai() {
    const [nilai, setNilai] = useState(0)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const location = useLocation()
    const {soals, answers} = location.state

    // push to api
    const pushApi = () => {
        let x = user.sudahDikerjakan
        if(soals[0].category === 'Science: Mathematics'){
            x = [true, user.sudahDikerjakan[1], user.sudahDikerjakan[2]]
        }else if(soals[0].category === 'General Knowledge'){
            x = [user.sudahDikerjakan[0], true, user.sudahDikerjakan[2]]
        }else{
            x = [user.sudahDikerjakan[0], user.sudahDikerjakan[1], true]
        }
        console.log(x);
        axios.post('http://localhost:4000/api/update', {
            username: user.username,
            sudahDikerjakan: user.sudahDikerjakan 
        }).then( res => {
            console.log('success')
        }).catch( err  => {
            console.log('gagal menyimpan data')
        })
    }

    // updateUSer
    const updateUser = () => {
        if(soals[0].category === 'Science: Mathematics'){
            setUser({ username: user.username, password: user.password, _id: user._id, __v: user.__v, sudahDikerjakan: [true, user.sudahDikerjakan[1], user.sudahDikerjakan[2]] })
        }else if(soals[0].category === 'General Knowledge'){
            setUser({ username: user.username, password: user.password, _id: user._id, __v: user.__v, sudahDikerjakan: [user.sudahDikerjakan[0], true, user.sudahDikerjakan[2]] })
        }else{
            setUser({ username: user.username, password: user.password, _id: user._id, __v: user.__v, sudahDikerjakan: [user.sudahDikerjakan[0], user.sudahDikerjakan[1], true] })
        }
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
        pushApi()
    },[user])

    useEffect(() => {
        const jumlahSoal = soals.length
        let jumlahBenar = 0
        for(let i=0; i<jumlahSoal; i++){
            if(answers[i] === soals[i].correct_answer){
                jumlahBenar++
            }
        }
        setNilai(jumlahBenar/jumlahSoal*100)
        updateUser()
    }, [])

    return (
        <div style={{height: window.innerHeight, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
            <div>
                <h2 style={{fontSize: '2rem'}}>Nilai kamu</h2>
                <p style={{fontSize: '1.5rem'}}>{nilai}/100</p>
                <a href='/' style={{textDecoration: 'none'}}>kembali...</a>
            </div>
        </div>
    )
}

export default Selesai
