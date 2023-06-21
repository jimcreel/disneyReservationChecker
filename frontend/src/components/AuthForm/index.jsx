
import { useState, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import { forgotPassword, login, signUp, loginGoogle } from "../../../utils/backend";
import { resetPassword } from "../../../utils/backend";
import { GoogleLogin } from '@react-oauth/google';





export default function AuthFormPage(props) {
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""

    });

    useEffect(() => {
        const domain = window.location.hostname;
        if (domain !== 'www.magic-reservations.com') {
          setFormData({
            ...formData,
            email: "",
            password: "",
            confirmPassword: ""
          });
        }
      }, []);


    const [badPassword, setBadPassword] = useState(false);
    const [passwordError, setPasswordError] = useState();
    const {setLoggedIn} = props
    const navigate = useNavigate();
    const { formType } = useParams();

    

    let actionText
    switch (formType) {
        case 'login':
            actionText = 'Login'
            break;
        case 'signup':
            actionText = 'Sign Up'
            break;
        case 'forgot-password':
            actionText = 'Forgot Password'
            break;
        default:
            break;
    }

    async function handleSubmit(event){
        event.preventDefault();
        if(formType === 'login'){
            const {token} = await login(formData);
            if (token) {
                localStorage.setItem('userToken', token);
                setLoggedIn(true)
                navigate('/')
            }else{
                setBadPassword(true);
                setPasswordError(<span className="text-red-500 m-3 self-start">Incorrect Password or Email</span>)

            }

            
        } else if (formType === 'signup'){
            if (formData.password !== formData.confirmPassword) {
                setBadPassword(true);
                setPasswordError(<span className="text-red-500 m-3 self-start">Passwords do not match</span>)
                return;
            }
            const {token} = await signUp(formData);
            localStorage.setItem('userToken', token);
            setLoggedIn(true)
            navigate('/profile')
            
        } else if (formType === 'forgot-password'){
            console.log(formData)
            setBadPassword(true)
            setPasswordError(<span className="text-red-500 m-3 self-start">Password Reset Email Sent</span>)
            const {token} = await forgotPassword(formData)
            navigate('/auth/login')
        }
       
    }

    function handleInputChange (event){
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    
    return (
        <div className="flex items-center justify-center h-[90vh]">
            <div className="bg-gray-200 rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl text-center font-bold text-black-100 mb-8">{actionText}</h2>
                {window.location.hostname === 'magicreservations.jim-creel.com' && (
                <>
                    <p className="text-center text-black-100 mb-8">To test the site, use the following credentials: </p>
                    <p className="text-center text-black-100 mb-8">Email: testuser@gmail.com</p>
                    <p className="text-center text-black-100 mb-8">Password: testuser</p>
                </>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-black-100 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full p-2 text-gray-900 rounded-md focus:outline-none focus:ring focus:border-blue-600"
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    {(formType === 'signup' || formType === 'login') && (
                    <div>
                        <label className="block text-black-100 font-bold mb-2" htmlFor="password">
                            Password {badPassword && passwordError }
                        </label>
                        <input
                            className="w-full p-2 text-gray-900 rounded-md focus:outline-none focus:ring focus:border-blue-600"
                            id="password"
                            name="password"
                            type="password"
                            minLength="8"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    )}
                    {formType === 'signup' && (
                        <>
                    <div>
                        <label className="block text-black-100 font-bold mb-2" htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            className="w-full p-2 text-gray-900 rounded-md focus:outline-none focus:ring focus:border-blue-600"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            minLength="8"
                            required
                            placeholder="Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    </>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-400 text-gray-100 rounded-md hover:bg-green-800 transition duration-300">
                            {actionText}
                        </button>
                    </div>
                    {formType === 'login' && (
                    <div>
                        <button
                            type="button"
                            className="w-full py-2 px-4 bg-blue-400 text-gray-100 rounded-md hover:bg-green-800 transition duration-300"
                            onClick={() => navigate('/auth/signup')}
                        >
                            New Account
                        </button>
                    </div>
                    )}
                    {formType === 'login' && (
                    <div>
                        <button
                            type="button"
                            className="w-full py-2 px-4 bg-blue-400 text-gray-100 rounded-md hover:bg-green-800 transition duration-300"
                            onClick={() => navigate('/auth/forgot-password')}
                        >
                            Forgot Password
                        </button>
                    </div>
                    )}
                    {formType === 'forgot-password' && (
                    <div>
                        <button
                            type="button"
                            className="w-full py-2 px-4 bg-blue-400 text-gray-100 rounded-md hover:bg-green-800 transition duration-300"
                            onClick={() => navigate('/')}
                        >
                            Login
                        </button>
                    </div>
                    )}
                    {/* <GoogleLogin
                onSuccess={credentialResponse => {
                    
                    
                    loginGoogle(credentialResponse);
                    setLoggedIn(true)
                    localStorage.setItem('userToken', token);
                    navigate('/')
                    
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                /> */}
            
                   
                    
                </form>
            </div>
            
        </div>
        
    );
}
