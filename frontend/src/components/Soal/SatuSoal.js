import React from 'react'

function SatuSoal(props) {
    return (
        <>
            <div style={{padding: '4rem', border: '2rem solid #1E0724', borderRadius: '3rem', backgroundColor: '#E4FC0A'}}>
                <h2>{props.nomor}</h2>
                <p>{props.soal.question}</p>

                <form style={{textAlign: 'left'}}>
                    { props.soal.incorrect_answers.map( (pilihan,i) =>  
                        <li key={i}>
                            <input type="radio" id={i} value={pilihan} name={`pilihan${props.nomor}`} onChange={props.handleChange}/>
                            <label htmlFor={i}>{pilihan}</label>
                        </li> 
                    )}
                    <li>
                        <input type="radio" id={3} value={props.soal.correct_answer} name={`pilihan${props.nomor}`} onChange={props.handleChange}/>
                        <label htmlFor={3}>{props.soal.correct_answer}</label>
                    </li>
                </form>
            </div>
            <style jsx>{`
                li {
                    list-style: none;
                }
                input[type="radio"] {
                    user-select: none;
                }
            `}</style>
        </>
    )
}

export default SatuSoal