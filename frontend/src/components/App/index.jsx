import React, { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import HomePage from "../HomePage"
import Header from "../Header"
import { getAvailability, getPasses } from "../../../utils/backend"
import Calendar from "../Calendar"
import Request from "../Request"
import RequestForm from "../RequestForm"
import ProfilePage from "../ProfilePage"
import Marquee from "../Marquee"
import AuthForm from "../AuthForm"
import ChangePassForm from "../ChangePassForm"
import DiningRequestForm from "../DiningRequestForm"

export const AvailabilityContext = React.createContext()
export const ResortContext = React.createContext()
export const PassContext = React.createContext()
export const PassListContext = React.createContext()

export default function App() {
    const [resort, setResort] = useState('DLR')
    const [availability, setAvailability] = useState([{}])
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userToken') ? true : false)
    const [pass, setPass] = useState('inspire-key-pass')
    const [passList, setPassList] = useState([])
    
    useEffect(() => {
        let resortNameUrl = resort == 'DLR' ? 'disneyland' : 'disneyworld'
        getPasses('DLR')
        .then((result) => {
            setPassList(result)
        })
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
                        <PassListContext.Provider value={passList}>
                            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setResort = {setResort} resort={resort} setPass={setPass} pass={pass}/>
                            <Marquee resort = {resort}/>
                            
                            
                            <Routes> 
                                <Route path="/" element={<Calendar availability={availability} resort={resort} loggedIn={loggedIn}/>} />
                                <Route path="/profile" element={<ProfilePage setLoggedIn={setLoggedIn}/>} />
                                <Route path="/auth/:formType" element={<AuthForm setLoggedIn={setLoggedIn} />} />
                                <Route path="/change-password/:token" element={<ChangePassForm setLoggedIn={setLoggedIn} />} />
                                <Route path="/dining" element={<DiningRequestForm/>} />
                            </Routes>
                        </PassListContext.Provider>
                    </PassContext.Provider>     
                </ResortContext.Provider>
            </AvailabilityContext.Provider>
        </>
    )
}
