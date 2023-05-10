import { useParams } from 'react-router-dom'
import { getText } from '../../../utils/api'
export default function Request (props) {
    const availability = props.availability
    const date = useParams().date
    const resort = getText(useParams().resort)
    let today = new Date();
    let requestDate = new Date(date);
    let requestIndex = Math.ceil((requestDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    console.log(requestIndex)
    console.log(availability[0]['calendar-availabilities'][requestIndex])
    let requestHTML = 'loading...'
    if (availability) {
        let facilityArray = availability[0]['calendar-availabilities'][requestIndex]['facilities']
        console.log(facilityArray)
        requestHTML = facilityArray.map((facility) => {
            //get last two characters of facility id
            let facilityName = facility.facilityName.slice(-2)
            facilityName = getText(facilityName)
            let facilityAvail = facility.available ? 'available' : facility.blocked ? 'blocked' : 'request a reservation'
            return (
                    <div> 
                        <h1 className="font-bold">Request Page for {resort} on {date}</h1>
                        <h1>{facilityName}</h1>
                        <h2>{facilityAvail}</h2>
                    </div>
                
            )
        })
    }
    console.log(requestHTML)


    return (
        <>
            
            {requestHTML}
        </>
    )
}