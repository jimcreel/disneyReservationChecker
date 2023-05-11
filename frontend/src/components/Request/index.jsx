import { useParams } from 'react-router-dom'
import { getText } from '../../../utils/api'
import { useContext} from 'react'
import { AvailabilityContext } from '../App'
export default function Request (props) {
    

    const availability = useContext(AvailabilityContext)
    const date = useParams().date
    const resort = getText(useParams().resort)
    let displayDate = 'loading...'
    if (date) {
        displayDate = date.slice(5,7) + '/' + date.slice(8,10) + '/' + date.slice(0,4)
    }

    function handleRequestClick(event, facility) {
        event.preventDefault()
        let requestDate = new Date(date);
        if (facilityAvail) {
            alert('request submitted')
        } else if (facilityBlocked) {
            alert('facility blocked')
        } else if (facilityRequest) {
            alert('request already submitted')
        }

    }
        
        

    let today = new Date();
    let requestDate = new Date(date);
    let requestIndex = Math.ceil((requestDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    let requestHTML = 'loading...'
    let anyBlocked = false
    let anyFull = false
    if (availability[0].availabilities && displayDate) {
        let facilityArray = availability[0]['calendar-availabilities'][requestIndex]['facilities']
        requestHTML = facilityArray.map((facility, i) => {
            //get last two characters of facility id
            let facilityName = facility.facilityName.slice(-2)
            let facilityImg = `https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/${facility.facilityName}.png`
            facilityName = getText(facilityName)
            let facilityAvail = facility.available ? 'available' : facility.blocked ? 'blocked' : 'request'
            if (facilityAvail === 'blocked') {
                anyBlocked = true
            }
            if (facilityAvail !== 'available') {
                anyFull = true
            }
            return (
                    
                <div key={i} className='flex flex-col w-100'>
                <div className='flex flex-row justify-center items-center w-100 my-2'>
                  <img src={facilityImg} alt={facilityName} className='h-[25px] w-[25px] mx-2' />
                  <h1 className='text-center'>{facilityName}</h1>
                  
                </div>
                <button 
                className={`rounded-full border text-white w-[125px] self-center ${facilityAvail === 'blocked' ? 'bg-slate-200' : 'bg-blue-400'}`}
                disabled={facilityAvail === 'blocked'}
                onclick={()=> handleRequestClick}
                >
                    {facilityAvail}
                  </button>
                
                
              </div>
                
            )
        })
        if (!anyBlocked && anyFull){
            let anyButton = 
            <div key={5} className='flex flex-col w-100'>
                <div className='flex flex-row justify-center items-center w-100 my-2'>
                <img src='https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/all.png' alt='ANY' className='h-[25px] w-[25px] mx-2' />
                <h1 className='text-center'>Any Park</h1>
                
                </div>
                
                <button 
                className={`rounded-full border text-white w-[125px] self-center ${anyBlocked ? 'bg-slate-200' : 'bg-blue-400'}`}
                disabled={anyBlocked}
                onclick={()=> handleRequestClick}
                >
                    {anyBlocked ? 'blocked' : 'request'}
                </button>
            
            
        </div>
        requestHTML.push(anyButton)
    }
}

    let requestHeader = 'loading...'
    if(availability){
        requestHeader = <h1 className='text-center font-bold'>{resort} - {displayDate}</h1>
    }
    


    return (
        <>
            <div id='requestBox' className='flex flex-col w-[350px] items-center mx-auto'> 
                {requestHeader}
                {requestHTML}
            
            </div>
        </>
    )
}