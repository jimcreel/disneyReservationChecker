import { set } from 'mongoose';
import {getPasses, getText} from '../../../utils/api'
import {editUser} from '../../../utils/backend'
import {useState} from 'react'

export default function EditForm(props) {
    const { profile, setProfile, setShowEditForm } = props;
    const [editForm, setEditForm] = useState({})
    const [badMatch, setBadMatch] = useState(false)
    

    function handleEditChange(event){
        setEditForm({
            ...editForm,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(){
        if(editForm.defaultResort && editForm.defaultPass){
            if (!getPasses(editForm.defaultResort).includes(editForm.defaultPass)){
                setBadMatch(true)
                return
            }
        }else if (editForm.defaultResort){
            if (!getPasses(editForm.defaultResort).includes(profile.defaultPass)){
                setBadMatch(true)
                return
            }
        }else if (editForm.defaultPass){
            if (!getPasses(profile.defaultResort).includes(editForm.defaultPass)){
                setBadMatch(true)
                return
            }
        }            
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
    
        let dlrPasses = getPasses('DLR').map((pass, index) => {
          return <option value={pass} key={index}>{getText(pass)}</option>;
        });
        let wdwPasses = getPasses('WDW').map((pass, index) => {
          return <option value={pass} key={index}>{getText(pass)}</option>;
        });
      
        let editFormHTML = (
          <div className='flex flex-col items-center justify-center w-25 mb-4'>
            <form className='flex flex-col items-center justify-center w-full mb-4'>
              <label className='font-bold mb-2 text-2xl'>Edit Profile</label>
                 <div className='flex flex-row items-baseline justify-left w-full m-3'>
                      <label className='font-bold m-2 text-xl'>Name:</label>
                      <input
                      className='border border-black mb-2 pl-2'
                      type='text'
                      name='name'
                      defaultValue={profile.name}
                      onChange={handleEditChange} // Pass the onChange event handler here
                      />
                  </div>
                  <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                      <label className='font-bold m-2 text-xl'>Email:</label>
                      <input
                      className='border border-black mb-2 pl-2 '
                      type='text'
                      name='email'
                      defaultValue={profile.email}
                      onChange={handleEditChange} // Pass the onChange event handler here
                      />
                  </div>
                  
                  
                  <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                      <label className='font-bold m-2 text-xl'>Default Resort:</label>
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
                    {badMatch ? <p className='text-red-500'>Invalid Pass for Resort</p> : null}
                  <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                      <label className='font-bold m-2 text-xl'>Default Pass:</label>
                      <select
                      className='border border-black mb-2'
                      type='text'
                      name='defaultPass'
                      defaultValue={profile.defaultPass}
                      onChange={handleEditChange} // Pass the onChange event handler here
                      >
                        <option value='none' disabled>None</option>
                      {editForm.defaultResort === 'WDW' ?  wdwPasses: dlrPasses}
                      </select>
                  </div>
                  
                  <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                      <label className='font-bold m-2 text-xl w-50'>
                      Receive Notifications by Phone or Email:
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
      

    return (
        editFormHTML
    )
}