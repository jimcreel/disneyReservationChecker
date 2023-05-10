import { useParams } from 'react-router-dom'
import { getText } from '../../../utils/api'
export default function Request (props) {
    const availability = props.availability
    const date = useParams().date
    const resort = getText(useParams().resort)
    let today = new Date();
    let requestDate = new Date(date);
    let requestIndex = Math.ceil((requestDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    let requestHTML = 'loading...'
    if (availability) {
        let facilityArray = availability[0]['calendar-availabilities'][requestIndex]['facilities']
        console.log(facilityArray)
        requestHTML = facilityArray.map((facility) => {
            //get last two characters of facility id
            let facilityName = facility.facilityName.slice(-2)
            let facilityImg = `https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/${facility.facilityName}.png`
            facilityName = getText(facilityName)
            let facilityAvail = facility.available ? 'available' : facility.blocked ? 'blocked' : 'request a reservation'
            return (
                    
                    <div >
                        <img src={facilityImg} alt={facilityName} className='h-[25px] w-[25px]'/>    
                        <h1 className='text-center'>{facilityName}</h1>
                        <br></br>
                        <h2 className='text-center'>{facilityAvail}</h2>
                    </div>
                
            )
        })
    }
    console.log(requestHTML)


    return (
        <>
            <div id='requestBox' className='flex flex-col w-[250px] justify-center'> 
                <h1 className='text-center font-bold'>Request a Reservation for {resort} on {date}</h1>
                {requestHTML}
            
            </div>
        </>
    )
}