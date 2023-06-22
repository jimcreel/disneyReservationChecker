import React, { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import HomePage from "../HomePage"
import Header from "../Header"
import { getAvailability } from "../../../utils/backend"
import Calendar from "../Calendar"
import Request from "../Request"
import RequestForm from "../RequestForm"
import ProfilePage from "../ProfilePage"
import Marquee from "../Marquee"
import AuthForm from "../AuthForm"
import ChangePassForm from "../ChangePassForm"

export const AvailabilityContext = React.createContext()
export const ResortContext = React.createContext()
export const PassContext = React.createContext()

export default function App() {
    const [resort, setResort] = useState('DLR')
    const [availability, setAvailability] = useState([{}])
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userToken') ? true : false)
    const [pass, setPass] = useState('inspire-key-pass')
    
    useEffect(() => {
        let resortNameUrl = resort == 'DLR' ? 'disneyland' : 'disneyworld'
        getAvailability(resort, pass)
        .then((result) => {
            setAvailability(result)        
        })
    }, [resort, pass, loggedIn])

    
        
    return (
        <>
            
            <AvailabilityContext.Provider value={availability}>       
                <ResortContext.Provider value={resort}>
                    <PassContext.Provider value={pass}>
                        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setResort = {setResort} resort={resort} setPass={setPass} pass={pass}/>
                        <Marquee resort = {resort}/>
                        
                        
                        <Routes> 
                            <Route path="/" element={<Calendar availability={availability} resort={resort} loggedIn={loggedIn}/>} />
                            <Route path="/profile" element={<ProfilePage setLoggedIn={setLoggedIn}/>} />
                            <Route path="/auth/:formType" element={<AuthForm setLoggedIn={setLoggedIn} />} />
                            <Route path="/change-password/:token" element={<ChangePassForm setLoggedIn={setLoggedIn} />} />
                        </Routes>
                    </PassContext.Provider>     
                </ResortContext.Provider>
            </AvailabilityContext.Provider>
        </>
    )
}
