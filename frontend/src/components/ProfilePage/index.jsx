import {getUser} from '../../../utils/backend'
import {useState, useEffect} from 'react'
import {getText} from '../../../utils/api'
import { deleteRequest } from '../../../utils/backend'

export default function ProfilePage () {
    const [profile, setProfile] = useState({})
    
    useEffect (() => {
        getUser()
        .then((result) => {
            setProfile(result)
        })
    }, [])

    if (!profile) {
        console.log('no profile')
    } else {
        console.log(profile)
    }


    const handleDeleteClick = (request) => {
        deleteRequest(request)
        .then(getUser()
        .then((result) => {
            setProfile(result)
        }
        ))
    }
    
    let profileHTML = []
    if (profile.requests) {
        profileHTML = profile.requests.map((request) => {
            return (
                <>
                    <div key={request._id} className='flex flex-row flex-wrap justify-center m-5'>
                        <h1>{getText(request.resort)}</h1>
                        <h1>{getText(request.park)}</h1>
                        <h1>{request.date}</h1>
                        <h1>{request.available}</h1>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => {handleDeleteClick(request._id)}}>Delete</button>
                    </div>
                </>
            )
        })
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