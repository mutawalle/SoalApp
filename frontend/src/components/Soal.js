import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SatuSoal, Selesai } from '.'

function Soal() {
    const timerLocal = JSON.parse(localStorage.getItem('timer'))
    const {pelajaran, jumlahSoal, waktu, kategori} = useParams()
    const [soals, setSoals] = useState([])
    const [timer, setTimer] = useState(!timerLocal ? {menit: Number(waktu), detik: 0} : timerLocal)
    const [soalAktif, setSoalAktif] = useState(0)
    const [answers, setAnswers] = useState([])
    const [jawabSementara, setJawabSementara] = useState('')
    const navigate = useNavigate()
    

    // timer
    useEffect(() => {
            setTimeout( () => {
                let menit = timer.menit
                let detik = timer.detik -1
                if(detik < 0) {
                    menit--
                    detik = 59
                }
                setTimer({menit: menit, detik: detik})
                localStorage.setItem('timer', JSON.stringify({menit: menit, detik: detik}))
            }, 1000)
            if(timer.menit <= 0) {
                const jawab = answers
                const pertanyaan = soals
                navigate('/selesai', {state: {soals: pertanyaan, answers: jawab}})
            }
    }, [timer])

    // mengambil data soal
    useEffect(() => {
        axios.get(`https://opentdb.com/api.php?amount=${jumlahSoal}&category=${kategori}&type=multiple`).then(res => {
            setSoals(res.data.results)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    // berpindah soal dengan klik next
    const handleClickNext = (e) => {
        setAnswers([...answers, jawabSementara])
        setSoalAktif(soalAktif+1)
    }

    // mengambil jawaban
    const handleChange = (e) => {
        setJawabSementara(e.target.value)
    }

    // submit jawaban
    const handleSubmit = (e) => {
        setAnswers([...answers, jawabSementara])
        setTimer({menit: 0, detik: 0})
    }
    
    return (
        <>
            <div style={{height: window.innerHeight, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <div>
                        <div style={{display: 'flex', justifyContent : 'center'}}>
                        <h2 style={{marginRight: '0.5rem'}}>{timer.menit}</h2><h2>{timer.detik}</h2>
                        </div>
                        <h2>{pelajaran}</h2>
                        <div>
                        { soals.length !== 0 ? <SatuSoal soal={soals[soalAktif]} nomor={soalAktif+1} handleChange={handleChange}/> : <p>Loading...</p> }
                        </div>
                        <div>
                            <button onClick={handleClickNext}>next</button>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
            </div>
            <style>{`
                button {
                    font-size: 1.5rem;
                    margin: 1rem;
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

export default Soal