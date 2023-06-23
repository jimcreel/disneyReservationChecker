import axios from "axios";

function buildHeader(){
    const headers = { headers: 
        { 
            'Authorization': localStorage.getItem('userToken'),
            'Content-Type': 'application/json'
        }
    };
    return headers;
}

let mode = import.meta.env.VITE_MODE

// const uri = 'https://magicres-backend.herokuapp.com'
const uri = 'http://localhost:3000'

export async function signUp(user){
    console.log(user)
    const {data} = await axios.post(`${uri}/api/users/signup`, user);
    return data;
}

export async function login(user){
    
    const {data} = await axios.post(`${uri}/api/users/login`, user);
    return data;
}

export async function loginGoogle(googleUser){
    
    const response = await axios.post(`${uri}/api/users/google`, googleUser);
    return response.data;
}

export async function getAvailability(resort, pass){
    let headers = buildHeader()
    const response = await axios.get(`${uri}/api/availability/${resort}/${pass}`, headers); 
    return response.data;
}
export async function makeNewRequest(request) {
    // console.log(request)
    let headers = buildHeader()
    const response = await axios.post(`${uri}/api/requests/create`, request, headers);
    // console.log(response)
    return response.data;
}

export async function getUser(){
    let headers = buildHeader()
    const response = await axios.get(`${uri}/api/users/profile`, headers);
    return response.data;
}

export async function deleteRequest(requestId){
    let headers = buildHeader()
    const response = await axios.delete(`${uri}/api/requests/${requestId}`, headers);
    return response.data;
}

export async function editUser(user){
    
    let headers = buildHeader()
    const response = await axios.put(`${uri}/api/users`, user, headers);
    return response.data;
}

export async function changePassword(user){
    let headers = buildHeader()
    if (user.resetPass){
        const response = await axios.put(`${uri}/api/users/change-password/${user.resetPass}`, user, headers);
        return response.data;
    }else {
        const response = await axios.put(`${uri}/api/users/change-password`, user, headers);
        return response.data;
    }
    
    
}

export async function resetPassword(hash){
    let headers = buildHeader()
    const response = await axios.post(`${uri}/api/users/send-password/:${hash}`, headers);
    return response.data;
}

export async function forgotPassword(email){
    
    let headers = buildHeader()
    const response = await axios.post(`${uri}/api/users/forgot-password`, email, headers);
    
    return response.data;
}

export async function getAllRestaurants(req){
    let headers = buildHeader()
    const response = await axios.get(`${uri}/api/dining`)
    return response.data;
}

