import React from 'react'

function pilihanSoal(props) {
  const kategori = props.pelajaran === "Matematika" ? "19" : props.pelajaran === "Pengetahuan Umum" ? "9" : "31"
  const params = "/soal/"+props.pelajaran+"/"+props.jumlahSoal+"/"+props.waktu+"/"+kategori
  return (
    <div style={{margin: '2rem'}}>
        <h2>{props.pelajaran}</h2>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <p>{props.jumlahSoal} soal</p>
            <p>{props.waktu} menit</p>
        </div>
        {props.sudah ?
          <span style={{padding: '0.5rem', backgroundColor: '#3A0E45', color: 'white', fontWeight: 'bold', borderRadius: '10px'}} >Sudah dikerjakan</span> : 
          <a href={params} style={{padding: '0.5rem', backgroundColor: '#3A0E45', color: 'white', fontWeight: 'bold', borderRadius: '10px'}} >Mulai</a>
        }
        
    </div>
  )
}

export default pilihanSoal