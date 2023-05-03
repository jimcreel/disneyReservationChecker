import { Routes, Route, Link } from "react-router-dom"
import HomePage from '../HomePage'
import SomeComponent from '../SomeComponent'
import './styles.css'

export default function App() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/someComponent">Some Page</Link>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/someComponent" element={<SomeComponent />} />
            </Routes>
        </>
    )
}
