import { useParams } from "react-router-dom"
import { getText, changeDateFormat } from "../../../utils/api"

export default function RequestForm(props) {

    const {resort} = props
    const {date} = props
    const {setShowForm} = props
    const {setShowModal} = props
    const {showForm} = props


    function handleCancel () {
        setShowForm(false)
        setShowModal(false)
    }
    let displayResort = ''
    if (typeof resort.resort === 'string') {
        displayResort = getText(resort.resort)
    } else {
        displayResort = getText(resort.resort[0])
    }
    
    return (
        <div>
            <h1 className='text-xl font-bold'>Request Submitted for </h1>
            <h2 className='m-2'>{changeDateFormat(date)}</h2>
            <h2 className='m-2'>{getText(showForm.park)}</h2>

            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick = {() => handleCancel()}
                >
                Ok
            </button>
        
        </div>
    )
}