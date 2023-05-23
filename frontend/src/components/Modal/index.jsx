import React, { useState } from 'react';
import Request from '../Request';

export default function Modal({ requestAvailable, date, resort, availability, showModal, setShowModal }) {

  let modalBody = '';
  if (requestAvailable) {
    modalBody = <Request date={date} resort={resort} availability={availability} />;
  } else {
    modalBody = <div className='text-center text-2xl'>Blocked</div>;
  }

  return (
    <>
      {showModal ? (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center'>
          <div className='bg-white rounded-lg shadow-lg p-4'>
            <div className='flex justify-end'>
              <button className='text-2xl' onClick={() => setShowModal(false)}>
                X
              </button>
            </div>
            <div className='flex justify-center' style={{ display: 'inline-block', padding: '1rem' }}>
              {modalBody}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
