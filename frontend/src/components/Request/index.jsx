import { Link } from 'react-router-dom'
import { getText } from '../../../utils/api'
import { useContext} from 'react'
import { AvailabilityContext } from '../App'
import { makeNewRequest } from '../../../utils/backend'
export default function Request (props) {
    
    const {setShowForm} = props
    const availability = useContext(AvailabilityContext)
    const {date} = props
    const {resort} = props
    
    
    let displayDate = 'loading...'
    if (date) {
        displayDate = date.slice(5,7) + '/' + date.slice(8,10) + '/' + date.slice(0,4)
    }

  
    function handleRequestClick(avail, parkCode) {
        let requestResort = ''
        console.log(typeof(resort.resort))
        if (typeof(resort.resort) === 'object'){
            requestResort = resort.resort[0]
        } else {
            requestResort = resort.resort
        }
        let request = {
            resort: requestResort,
            park: parkCode,
            date: date,
            available: false,
        }
        console.log(request)
        if (avail === 'request') {
            makeNewRequest(request)
            .then (res => {
                console.log(res)
                setShowForm(true)
            })
            .catch(err => {
                console.log(err)
            }
            )
        }

        
        
        

    }
        
        
    let userId = 'jim.creel@gmail.com'
    let today = new Date();
    let requestDate = new Date(date);
    let requestIndex = Math.ceil((requestDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    let requestHTML = []
    let anyBlocked = false
    let anyFull = false
    let anyButton = ''
    if (availability[0].availabilities && displayDate) {
        let facilityArray = availability[0]['calendar-availabilities'][requestIndex]['facilities']
        requestHTML = facilityArray.map((facility, i) => {
            //get last two characters of facility id
            let facilityName = facility.facilityName.slice(-2)
            let facilityCode = facilityName
            let resortCode = facility.facilityName.slice(0,2)
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
                <div className='flex flex-row justify-between items-center w-100 my-2'>
                    <div className='flex flex-row items-center'>
                        <img src={facilityImg} alt={facilityName} className='h-[25px] w-[25px] mx-2' />
                        <h1 className='text-center'>{facilityName}</h1>
                    </div>
                    
                    {facilityAvail != 'available' &&
                        <button 
                            className={`rounded-full border text-white w-[125px]  ${facilityAvail === 'blocked' ? 'bg-slate-200' : 'bg-blue-400'}`}
                            disabled={facilityAvail === 'blocked'}
                            onClick = {(event) => handleRequestClick(facilityAvail, facilityCode)}
                            >
                            {facilityAvail}
                        </button>
                    }
                    {facilityAvail === 'available' &&
                        
                        <Link to={resort.resort === 'DLR' ? 'https://disneyland.disney.go.com/entry-reservation/' : 'https://disneyworld.disney.go.com/park-reservations/'} target="_blank">
                            <button
                                className={`rounded-full border text-white w-[125px] bg-green-400`}
                                >
                                {facilityAvail}
                            </button>
                        </Link>
                    }
                    
                  
                </div>
                
                
                
              </div>
                
            )
        })
        
        if (!anyBlocked && anyFull){
            anyButton = 
            <div key={5} className='flex flex-col w-100'>
                <div className='flex flex-row justify-between items-center w-100 my-2'>
                    <div className='flex flex-row items-center'>
                        <img src='https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/all.png' alt='ANY' className='h-[25px] w-[25px] mx-2 ' />
                        <h1 className='text-center'>Any Park</h1>
                    </div>
                <button 
                    className={`rounded-full border text-white w-[125px] ${anyBlocked ? 'bg-slate-200' : 'bg-blue-400'}`}
                    disabled={anyBlocked}
                    onClick={()=> handleRequestClick('request', 'ANY')}
                    >
                        {anyBlocked ? 'blocked' : 'request'}
                </button>
                </div>
                
                
            
            
        </div>
        
    }
}


    let requestHeader = 'loading...'
    let displayResort = ''
    if(availability){
        
        if (typeof resort.resort === 'string') {
            displayResort = getText(resort.resort)
        } else {
            displayResort = getText(resort.resort[0])
        }
        requestHeader = <h1 className='font-bold mb-2 text-2xl'>{displayResort}  {displayDate}</h1>
    }
    
    

    return (
        <>
            <div id='requestBox' className='flex flex-row flex-wrap w-[350px] items-center justify-center mx-auto'> 
                {requestHeader}
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                {requestHTML}
                {anyButton}
            
            </div>
        </>
    )
}