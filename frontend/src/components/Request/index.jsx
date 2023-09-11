import { Link } from 'react-router-dom';
import { getText } from '../../../utils/api';
import { useContext, useState } from 'react';
import { AvailabilityContext } from '../App';
import { makeNewRequest } from '../../../utils/backend';
import { changeDateFormat } from '../../../utils/api';
import { useNavigate} from 'react-router-dom';


export default function Request(props) {
    const { setShowForm } = props;
    const availability = useContext(AvailabilityContext);
    const { date } = props;
    const { resort } = props;
    const {pass} = props
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(false);

    function getLoginStatus(){
        if (localStorage.getItem('userToken')) {
            return true
        } else {
            return false
        }
    }
    

    function handleRequestClick(avail, parkCode, loginStatus) {
        setShowLoading(true)
        if (loginStatus === false) {
            navigate('/auth/login');
            return;
        }
        let requestResort = '';
        if (typeof resort.resort === 'object') {
            requestResort = resort.resort[0];
        } else {
            requestResort = resort.resort;
        }
        let request = {
            resort: requestResort,
            park: parkCode,
            date: date,
            pass: pass,
            available: false,
        };
        if (avail === 'request') {
            
            makeNewRequest(request)
                .then((res) => {
                    setShowForm({ active: true, park: request.park });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    
    let [availabilityDate] = availability[0]['calendar-availabilities'].filter((avail) => avail.date === date);
    
    let requestHTML = [];
    let anyBlocked = false;
    let anyFull = false;
    let anyButton = '';
    if (availabilityDate.facilities && date) {
        let facilityArray = availabilityDate['facilities'];
        requestHTML = facilityArray.map((facility, i) => {
            //get last two characters of facility id
            let facilityName = facility.facilityName.slice(-2);
            let facilityCode = facilityName;
            let resortCode = facility.facilityName.slice(0, 2);
            let facilityImg = `https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/${facility.facilityName}.png`;
            facilityName = getText(facilityName);
            let facilityAvail = facility.available === true ? 'available' : facility.blocked === true ? 'blocked' : 'request';
            if (facilityAvail === 'blocked') {
                anyBlocked = true;
            }
            if (facilityAvail !== 'available') {
                anyFull = true;
            }

            return (
                <div key={i} className='flex flex-row justify-between w-100 my-2'>
                    
                            
                            <img src={facilityImg} alt={facilityName} className='h-[25px] w-[25px] mx-2' />
                            <h1 className='mx-2'>{facilityName}</h1>
                        

                        {(facilityAvail != 'available') && (
                            <button
                                className={`rounded-full border text-white w-[100px]  ${facilityAvail === 'blocked' ? 'bg-slate-200' : 'bg-blue-400'}`}
                                disabled={facilityAvail === 'blocked'}
                                onClick={(event) => handleRequestClick(facilityAvail, facilityCode, getLoginStatus())}
                            >
                                
                                {facilityAvail === 'blocked' ? 'Sorry, this date is blocked' : facilityAvail}
                            </button>
                        )}
                        
                        {facilityAvail === 'available'  && (
                            <Link to={resort.resort === 'DLR' ? 'https://disneyland.disney.go.com/entry-reservation/' : 'https://disneyworld.disney.go.com/park-reservations/'} target="_blank">
                                <button className={`rounded-full border text-white w-[125px] bg-green-400`}>{facilityAvail}</button>
                            </Link>
                        )}
                        
                    
                </div>
            );
        });

        if (!anyBlocked && anyFull) {
            anyButton = (
                <div key={5} className='flex flex-row justify-between w-100 my-2'>
                            <img src='https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/all.png' alt='ANY' className='h-[25px] w-[25px] mx-2 ' />
                            <h1 >Any Park</h1>
                        
                        <button
                            className={`rounded-full border text-white w-[100px] ${anyBlocked ? 'bg-slate-200' : 'bg-blue-400'}`}
                            disabled={anyBlocked}
                            onClick={() => handleRequestClick('request', 'ANY')}
                        >
                            {anyBlocked ? 'blocked' : 'request'}
                        </button>
                    </div>
                
            );
        }
    }

    let requestHeader = 'loading...';
    let displayResort = '';
    if (availability) {
        if (typeof resort.resort === 'string') {
            displayResort = getText(resort.resort);
        } else {
            displayResort = getText(resort.resort[0]);
        }
        requestHeader = (
            <div className='flex flex-col  justify-center w-full mb-4'>
                <h1 className='font-bold mb-2 text-2xl'>{displayResort}</h1>
                <h1> {changeDateFormat(date)}</h1>
            </div>
        );
    }

    return (
        <>
            <div id='requestBox' className='flex flex-row flex-wrap w-[350px] items-center justify-center mx-auto'>
                {showLoading ? (
                    <h1 className='font-bold mb-2 text-2xl'>Submitting Request...</h1>
                ) : (
                    <>
                        {requestHeader}
                        <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
                        <div className="flex flex-col justify-start">
                        {requestHTML}
                        {anyButton}
                        </div>
                    </>
                )}
            </div>
        </>

    );
}
