import {getUser} from '../../../utils/backend'
import {useState, useEffect} from 'react'
import {getText} from '../../../utils/api'
import { changeDateFormat } from '../../../utils/api'
import { deleteRequest } from '../../../utils/backend'

export default function ProfilePage () {
    const [profile, setProfile] = useState({})
    const [requests, setRequests] = useState([{}])
    
    useEffect (() => {
        getUser()
        .then((result) => {
            setProfile({
                name: result.name,
                email: result.email,
                defaultPass: result.defaultPass,
                defaultPark: result.defaultPark,
            })
            setRequests(result.requests)
            
        })
    }, [])


    if (!profile) {
        console.log('no profile')
    } else {
        console.log(profile)
    }


    const handleDeleteClick = async (requestToDelete) => {
        await deleteRequest(requestToDelete._id);
        setRequests(requests.filter(request => request._id !== requestToDelete._id));
    }
    
    
        
    
    let profileHTML = [];
    let sortedRequests = [];
if (requests) {
    sortedRequests = requests.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
    profileHTML = sortedRequests.map((request) => {
        return (
            <>
                <div key={request._id} className='flex flex-row flex-wrap justify-center m-5'>
                    <h1>{getText(request.resort)}</h1>
                    <h1>{getText(request.park)}</h1>
                    <h1>{changeDateFormat(request.date)}</h1>
                    <h1>{request.available}</h1>
                    <button 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
                        onClick={() => handleDeleteClick(request)}>
                        Delete
                    </button>
                </div>
            </>
        );
    });
}


    return (
        <>
            <h1>User Name: {profile.name}</h1>
            <h1>User Email: {profile.email}</h1>
            <h1>User Default Pass: {getText(profile.defaultPass)}</h1>
            <h1>User Default Resort: {getText(profile.defaultResort)}</h1>
            <h1>User Requests: {profileHTML}</h1>
        </>
    )
}