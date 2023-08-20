import {getUser} from '../../../utils/backend'
import {useState, useEffect} from 'react'
import { changeDateFormat, getPasses, getText } from '../../../utils/api'
import { deleteRequest, editUser } from '../../../utils/backend'
import EditForm from '../EditForm'
import ChangePassForm from '../ChangePassForm'

export default function ProfilePage ({setLoggedIn}) {

    const [profile, setProfile] = useState({})
    const [requests, setRequests] = useState([{}])
    const [showEditForm, setShowEditForm] = useState(false)
    
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    
    useEffect (() => {
        getUser()
        .then((result) => {
            setProfile({
                firstname: result.user.firstname,
                lastname: result.user.lastname,
                email: result.user.email,
                phone: result.user.phone,
                defaultpass: result.user.defaultpass,
                defaultresort: result.user.defaultresort
            })
            setRequests(result.requests)
            
        })
    }, [setShowEditForm, setShowPasswordForm])

   

    function handleClickChangePassword(){
        console.log('clicked change password')
        setShowPasswordForm(true)
        setShowEditForm(false)
    }
 

    const handleDeleteClick = async (requestToDelete) => {
        await deleteRequest(requestToDelete.id);
        setRequests(requests.filter(request => request.id !== requestToDelete.id));
    }
    
    
        
    
    let profileHTML = 'Loading requests...';
    setTimeout(() => {
        profileHTML = 'No requests found.';
        }, 1000)
    let sortedRequests = [];
if (requests[0]?.resort) {
    sortedRequests = requests.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
    profileHTML = sortedRequests.map((request) => {
        return (
            <>
                <div key={request.id} className='flex flex-row flex-wrap justify-center m-5 border border-black rounded w-min p-2'>
                    <div className='m-5'>
                        <h1>{getText(request.resort)}</h1>
                        <h1>{getText(request.park)}</h1>
                        <h1>{getText(request.pass)}</h1>
                        <h1>{changeDateFormat(request.date)}</h1>
                        <h1>Status: {request.available? 'available' : 'unavailable'}</h1>
                    </div>
                    <h1>{request.available}</h1>
                    <button 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[150px] self-center' 
                        onClick={() => handleDeleteClick(request)}>
                        Delete
                    </button>
                </div>
            </>
        );
    });
}

let profileHeader = 'loading...';
if (profile && !showEditForm) {
  profileHeader = (
    <div className="flex flex-col items-center justify-center w-full mb-4">
        <h1 className="font-bold mb-4 text-2xl">{profile.firstname}</h1>
        <div className="text-lg">
            <p><strong>First Name:</strong> {profile.firstname}</p>
            <p><strong>Last Name:</strong> {profile.lastname}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Default Pass:</strong> {getText(profile.defaultpass)}</p>
            <p><strong>Default Resort:</strong> {getText(profile.defaultresort)}</p>
        </div>
        <div className="flex flex-row space-x-4">
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[150px]"
                onClick={() => setShowEditForm(true)}
            >
                Edit Profile
            </button>
            <button 
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[150px]"
                onClick={() => handleClickChangePassword()}
            >
                Change Password
            </button>
        </div>
</div>


  );
} else if (profile && showEditForm) {
    profileHeader = <EditForm profile={profile} setShowEditForm={setShowEditForm} setShowPasswordForm={setShowPasswordForm} setProfile={setProfile} setLoggedIn={setLoggedIn}/>
} 

    return (
        <>  
            <div className='flex flex-row justify-center'>
                {profileHeader}
                {showPasswordForm && <ChangePassForm setShowPasswordForm={setShowPasswordForm} setLoggedIn={setLoggedIn}/>}
            
            </div>
            <h1 className='text-center text-2xl'>User Requests: </h1>
            <div className='flex flex-row flex-wrap justify-center m-5  border-black rounded p-2'>
                {profileHTML}
            </div>
        </>
    )
}