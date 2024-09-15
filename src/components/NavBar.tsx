import '../styles/navbar.css'
import { useState } from 'react'

export default function NavBar(props: any) {
    const [time, setTime] = useState('')

    function getodiff(time: number) {
        let os = ''
        if (String(time).length == 1) {
            os = '0'
        }
        return os
    }

    setTimeout(() => {
        var currentdate = new Date();
        setTime(`${getodiff(currentdate.getHours()) + currentdate.getHours()}:${getodiff(currentdate.getMinutes()) + currentdate.getMinutes()}:${getodiff(currentdate.getSeconds()) + currentdate.getSeconds()}`)
    }, 1000)
    return (
        <>
            <div className='navbar'>
                <p className="time">{time}</p>
                <p className="logo">Weza Reporto</p>
                <div className='nbminicont'>
                    <button onClick={() => props.systemsetter()} className="systembtn">{props.system}</button>
                </div>
            </div>
        </>
    )
}