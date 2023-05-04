import { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import HomePage from "../HomePage"
import Header from "../Header"
import axios from "axios"
import { getAvailability } from "../../../utils/api"
import Calendar from "../Calendar"



export default function App() {
    const [resort, setResort] = useState(['DLR'])
    const [availability, setAvailability] = useState([{}])
    const [loggedIn, setLoggedIn] = useState(false)
    const [pass, setPass] = useState(['inspire-key-pass'])
    
    useEffect(() => {
    
    let resortNameUrl = resort == 'DLR' ? 'disneyland' : 'disneyworld'
    getAvailability(resortNameUrl, pass)
    .then((result) => {
        setAvailability(result)        
    }).catch((err) => {
        
    });
    }, [pass])
        console.log(availability)

    return (
        <>
            <Header setResort = {setResort} resort={resort} setPass={setPass} pass={pass}/>
            <Calendar />
            <Routes>
                
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    )
}
