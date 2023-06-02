import { useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import { login, signUp } from "../../../utils/backend";


export default function AuthFormPage(props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""

    });
    const [badPassword, setBadPassword] = useState(false);
    const {setLoggedIn} = props
    const navigate = useNavigate();
    const { formType } = useParams();
    let actionText
    formType === 'login' ? actionText = 'Login' : actionText = 'Sign Up'

    async function handleSubmit(event){
        event.preventDefault();
        if(formType === 'login'){
            const {token} = await login(formData);
            localStorage.setItem('userToken', token);
            setLoggedIn(true)
            navigate('/')
            
        } else {
            if (formData.password !== formData.confirmPassword) {
                setBadPassword(true);
                return;
            }
            const {token} = await signUp(formData);
            localStorage.setItem('userToken', token);
            setLoggedIn(true)
            navigate('/')
            
        }
       
    }

    function handleInputChange (event){
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    
    return (
        <div className="flex items-center justify-center h-[90vh]">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl text-center font-bold text-gray-100 mb-8">{actionText}</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-100 font-bold mb-2" htmlFor="email">
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
                    <div>
                        <label className="block text-gray-100 font-bold mb-2" htmlFor="password">
                            Password {badPassword && <span className="text-red-500">Passwords do not match</span>}
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
                    {formType === 'signup' && (
                        <>
                    <div>
                        <label className="block text-gray-100 font-bold mb-2" htmlFor="password">
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
                            className="w-full py-2 px-4 bg-green-700 text-gray-100 rounded-md hover:bg-green-800 transition duration-300">
                            {actionText}
                        </button>
                    </div>
                   
                    
                </form>
            </div>
        </div>
    );
}
