import React, { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import HomePage from "../HomePage"
import Header from "../Header"
import { getAvailability } from "../../../utils/api"
import Calendar from "../Calendar"
import Request from "../Request"
import RequestForm from "../RequestForm"
import ProfilePage from "../ProfilePage"

export const AvailabilityContext = React.createContext()
export const ResortContext = React.createContext()

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
        })
    }, [resort, pass])

    
        
    return (
        <>
            <AvailabilityContext.Provider value={availability}>       
                <ResortContext.Provider value={resort}>
                    <Header setResort = {setResort} resort={resort} setPass={setPass} pass={pass}/>
                    
                    
                    <Routes> 
                        <Route path="/" element={<Calendar availability={availability} resort={resort} pass={pass}/>} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                    
                </ResortContext.Provider>
            </AvailabilityContext.Provider>
        </>
    )
}
