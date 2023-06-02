export default function ChangePassForm() {
    return (
        <form className='flex flex-col items-center justify-center w-full mb-4'>
            <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                    <h1 className='font-bold m-2 text-2xl'>Change Password</h1>
                </div>
                <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                    
                    <label className='font-regular m-2 text-xl'>Old Password:</label>
                    <input
                    className='border border-black mb-2'
                    type='password'
                    name='oldPassword'
                    onChange={handleEditChange} 
                    />
                    
                </div>
                <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                    
                    <label className='font-regular m-2 text-xl'>New Password:</label>
                    <input
                    className='border border-black mb-2'
                    type='password'
                    name='newPassword'
                    onChange={handleEditChange} 
                    />
                    
                </div>
                <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                    
                    <label className='font-regular m-2 text-xl'>Re-enter Password:</label>
                    <input
                    className='border border-black mb-2'
                    type='password'
                    name='confirmPassword'
                    onChange={handleEditChange} 
                    />
                    
                </div>
                <div className='flex flex-row items-baseline justify-left w-full mb-4'>
                    <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type='submit'
                    >
                    Submit
                    </button>
                    <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type='reset'
                    >
                    Cancel
                    </button>

                </div>

        </form>
    )
}