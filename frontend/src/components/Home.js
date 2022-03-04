import React, { useEffect, useState } from 'react'
import PilihanSoal from './Home/PilihanSoal'

function Home() {
    const userLocal = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState(userLocal ? userLocal : {})

    useEffect(() => {
        if(user !== {}){
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('timer', null)
        }
    }, [user])
    
    return (
        <>
            <div style={{height: window.innerHeight, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    <h1 style={{fontSize: '4rem'}}>Selamat Datang</h1>
                    { user.username ? <h2>{user.username}</h2> : <></> }
                    <div style={{padding: '4rem', border: '2rem solid #1E0724', borderRadius: '3rem', backgroundColor: '#E4FC0A'}}>
                        {
                            user.username ? 
                            <>
                                <h2>Silahkan Pilih Soal</h2>
                                <PilihanSoal pelajaran={'Matematika'} jumlahSoal={'10'} waktu={'20'} sudah={user.sudahDikerjakan[0]}/>
                                <PilihanSoal pelajaran={'Pengetahuan Umum'} jumlahSoal={'20'} waktu={'25'} sudah={user.sudahDikerjakan[1]}/>
                                <PilihanSoal pelajaran={'Anime dan Manga'} jumlahSoal={'30'} waktu={'30'} sudah={user.sudahDikerjakan[2]}/>
                            </> :
                            <h2><a href='/login'>Login</a></h2>
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`
                a {
                    text-decoration: none;
                    color: #000;
                }
            `}</style>
        </>
    )
}

export default Home