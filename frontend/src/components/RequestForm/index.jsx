import { useParams } from "react-router-dom"
import { getText } from "../../../utils/api"

export default function RequestForm(props) {

    const {showForm, setShowForm} = props
    const {date} = props
    const {resort} = props
    function handleCancel () {
        setShowForm(false)
    }
    let displayResort = ''
    if (typeof resort.resort === 'string') {
        displayResort = getText(resort.resort)
    } else {
        displayResort = getText(resort.resort[0])
    }
    
    return (
        <div>
            <h1>Request Form</h1>
            <h2>{date}</h2>
            <h2>{displayResort}</h2>

            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick = {() => handleCancel()}
                >
                Cancel
            </button>
        
        </div>
    )
}