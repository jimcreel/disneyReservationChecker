import { Routes, Route, Link } from "react-router-dom"
import HomePage from "../HomePage"
import Nav from "../Nav"


export default function App() {
    return (
        <>
            
            <Nav />  
           

            <Routes>
                
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    )
}
