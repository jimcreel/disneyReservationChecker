import {getUser} from '../../../utils/backend'
import {useState, useEffect} from 'react'
import { changeDateFormat, getPasses, getText } from '../../../utils/api'
import { deleteRequest, editUser } from '../../../utils/backend'

export default function ProfilePage () {
    const [profile, setProfile] = useState({})
    const [requests, setRequests] = useState([{}])
    const [showEditForm, setShowEditForm] = useState(false)
    const [editForm, setEditForm] = useState({})
    
    useEffect (() => {
        getUser()
        .then((result) => {
            setProfile({
                name: result.name,
                email: result.email,
                defaultPass: result.defaultPass,
                defaultResort: result.defaultResort
            })
            setRequests(result.requests)
            
        })
    }, [])

    function handleEditChange(event){
        setEditForm({
            ...editForm,
            [event.target.name]: event.target.value
        })
    }


    function handleSubmit(){
        editUser(editForm)
        .then((result) => {
            setProfile({
                name: result.name,
                email: result.email,
                defaultPass: result.defaultPass,
                defaultResort: result.defaultResort
            })
        }
        )
        setShowEditForm(false)

    }

 

    const handleDeleteClick = async (requestToDelete) => {
        await deleteRequest(requestToDelete._id);
        setRequests(requests.filter(request => request._id !== requestToDelete._id));
    }
    
    
        
    
    let profileHTML = 'No requests found.';
    let sortedRequests = [];
if (requests.length>0) {
    sortedRequests = requests.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
    profileHTML = sortedRequests.map((request) => {
        return (
            <>
                <div key={request._id} className='flex flex-row flex-wrap justify-center m-5 border border-black rounded w-min p-2'>
                    <div className='m-5'>
                        <h1>{getText(request.resort)}</h1>
                        <h1>{getText(request.park)}</h1>
                        <h1>{getText(request.pass)}</h1>
                        <h1>{changeDateFormat(request.date)}</h1>
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
    <div className='flex flex-col items-center justify-center w-full mb-4'>
      <h1 className='font-bold mb-2 text-2xl'>{profile.name}</h1>
      <h1> Name: {profile.name}</h1>
      <h1> Email: {profile.email}</h1>
      <h1> Default Pass: {getText(profile.defaultPass)}</h1>
      <h1> Default Resort: {getText(profile.defaultResort)}</h1>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[150px] self-center'
        onClick={() => setShowEditForm(true)}
      >
        Edit Profile
      </button>
    </div>
  );
} else if (profile && showEditForm) {
  let dlrPasses = getPasses('DLR').map((pass) => {
    return <option value={pass}>{getText(pass)}</option>;
  });
  let wdwPasses = getPasses('WDW').map((pass) => {
    return <option value={pass}>{getText(pass)}</option>;
  });

  profileHeader = (
    <div className='flex flex-col items-center justify-center w-25 mb-4'>
      <form className='flex flex-col items-center justify-center w-full mb-4'>
        <label className='font-bold mb-2 text-2xl'>Edit Profile</label>
           <div className='flex flex-row items-baseline justify-left w-full m-3'>
                <label className='font-bold m-2 text-2xl'>Name:</label>
                <input
                className='border border-black mb-2'
                type='text'
                name='name'
                defaultValue={profile.name}
                onChange={handleEditChange} // Pass the onChange event handler here
                />
            </div>
            <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                <label className='font-bold m-2 text-2xl'>Email:</label>
                <input
                className='border border-black mb-2'
                type='text'
                name='email'
                defaultValue={profile.email}
                onChange={handleEditChange} // Pass the onChange event handler here
                />
            </div>
            <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                <label className='font-bold m-2 text-2xl'>Default Resort:</label>
                <select
                className='border border-black mb-2'
                type='text'
                name='defaultResort'
                defaultValue={profile.defaultResort}
                onChange={handleEditChange} // Pass the onChange event handler here
                >
                <option value='DLR'>Disneyland Resort</option>
                <option value='WDW'>Walt Disney World Resort</option>
                </select>
            </div>
            <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                <label className='font-bold m-2 text-2xl'>Default Pass:</label>
                <select
                className='border border-black mb-2'
                type='text'
                name='defaultPass'
                defaultValue={profile.defaultPass}
                onChange={handleEditChange} // Pass the onChange event handler here
                >
                {editForm.defaultResort === 'DLR' ? dlrPasses : wdwPasses}
                </select>
            </div>
            
            <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                <label className='font-bold m-2 text-2xl w-50'>
                Receive Notifications by Phone or Email
                </label>
                <select
                className='border border-black mb-2'
                type='text'
                name='notifications'
                onChange={handleEditChange} // Pass the onChange event handler here
                >
                <option value='phone'>Phone</option>
                <option value='email'>Email</option>
                </select>
            </div>
      </form>
      <div className='flex flex-row'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[150px] self-center m-2'
        onClick={() => handleSubmit(editForm)}
      >
        Save
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[150px] self-center'
        onClick={() => setShowEditForm(false)}
      >
        Cancel
      </button>
      </div>
    </div>
  );
}


    return (
        <>  
            <div className='flex flex-row justify-center'>
            {profileHeader}
            </div>
            <h1 className='text-center text-2xl'>User Requests: </h1>
            <div className='flex flex-row flex-wrap justify-center m-5 border border-black rounded p-2'>
            {profileHTML}
            </div>
        </>
    )
}