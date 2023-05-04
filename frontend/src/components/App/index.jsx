import { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import HomePage from "../HomePage"
import Nav from "../Nav"
import { getAvailability } from "../../../utils/api"


export default function App() {
    const [resort, setResort] = useState(['DLR'])
    const [availability, setAvailability] = useState([{}])
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        getAvailability(resort)
        .then (apiResponse => {
            setAvailability(apiResponse)
            
        })
    }, [resort])

    console.log(availability)

    return (
        <>
            
            <Nav />  
           

            <Routes>
                
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    )
}
