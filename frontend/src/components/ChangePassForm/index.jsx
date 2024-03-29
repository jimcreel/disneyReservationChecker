import React, { useState, useEffect } from 'react';
import { changePassword } from '../../../utils/backend';
import { useNavigate, useParams } from 'react-router-dom';

export default function ChangePassForm(props) {
  const navigate = useNavigate();
  const { setShowPasswordForm, setLoggedIn } = props;
  const [badPassword, setBadPassword] = useState(false);
  const [editForm, setEditForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    resetPass: '',
  });
  const [passwordError, setPasswordError] = useState();

  const { token } = useParams();

  useEffect(() => {
    if (token) {
      setEditForm((prevForm) => ({ ...prevForm, resetPass: token }));
    }
  }, [token]);

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  function handleCancelClick(event) {
    event.preventDefault();
    setShowPasswordForm(false);
  }

  async function handleSubmitClick(event) {
    event.preventDefault();
    if (editForm.newPassword !== editForm.confirmPassword) {
      setBadPassword(true);
      setPasswordError(
        <p className="text-red-500 m-3 self-start">Passwords do not match</p>
      );
      return;
    }

    const {token}  = await changePassword(editForm);
    console.log(token)
    if (token) {
      localStorage.setItem('userToken', token);
      setLoggedIn(true);
      setBadPassword(false);
      navigate('/profile');
    } else {
      setBadPassword(true);
      setPasswordError(
        <p className="text-red-500 m-3 self-start">Incorrect Password</p>
      );
    }
  }

  return (
    <form className="flex flex-col items-center justify-center w-full mb-4">
      <div className="flex flex-row items-baseline justify-left w-full mb-4">
        <h1 className="font-bold m-2 text-2xl">Change Password</h1>
      </div>
      {!token && (
        <div className="flex flex-row items-baseline justify-left w-full mb-4">
          <label className="font-regular m-2 text-xl">Old Password:</label>
          <input
            className="border border-black mb-2"
            type="password"
            name="oldPassword"
            onChange={handleEditChange}
          />
        </div>
      )}
      <div className="flex flex-row items-baseline justify-left w-full mb-4">
        <label className="font-regular m-2 text-xl">New Password:</label>
        <input
          className="border border-black mb-2"
          type="password"
          name="newPassword"
          onChange={handleEditChange}
        />
      </div>
      <div className="flex flex-row items-baseline justify-left w-full mb-4">
        <label className="font-regular m-2 text-xl">Re-enter Password:</label>
        <input
          className="border border-black mb-2"
          type="password"
          name="confirmPassword"
          onChange={handleEditChange}
        />
      </div>
      {badPassword && passwordError}
      <div className="flex flex-row items-baseline space-x-4 justify-left w-full mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="reset"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
