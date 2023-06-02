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

// const uri = 'http://localhost:3000'
const uri = 'https://magicres-backend.herokuapp.com'

export async function signUp(user){
    
    // const {data} = await axios.post('http://localhost:3000/api/users/signup', user);
    const {data} = await axios.post(`${uri}/api/users/signup`, user);
   
    return data;
}

export async function login(user){
    // const {data} = await axios.post('http://localhost:3000/api/users/login', user);
    const {data} = await axios.post(`${uri}/api/users/login`, user);
    return data;
}

export async function getAvailability(resort, pass){
    const url = `${uri}/api/availability/${resort}/${pass}`
    // const url = `http://localhost:3000/api/availability/${resort}/${pass}`
    const response = await axios.get(url)
    return response.data;
}
export async function makeNewRequest(request) {
    let headers = buildHeader()

    const response = await axios.post(`${uri}/api/requests/create/`, request, headers);
    // const response = await axios.post(`http://localhost:3000/api/requests/create`, request, headers);
    return response.data;
}

export async function getUser(){
    let headers = buildHeader()
    const response = await axios.get(`${uri}/api/users/profile`, headers);
    // const response = await axios.get(`http://localhost:3000/api/users/profile`, headers);
    return response.data;
}

export async function deleteRequest(requestId){
    let headers = buildHeader()
    const response = await axios.delete(`${uri}/api/requests/${requestId}`, headers);
    // const response = await axios.delete(`http://localhost:3000/api/requests/${requestId}`, headers);
    return response.data;
}

export async function editUser(user){
    console.log(user)
    let headers = buildHeader()
    const response = await axios.put(`${uri}/api/users/`, user, headers);
    // const response = await axios.put(`http://localhost:3000/api/users`, user, headers);
    return response.data;
}

export async function changePassword(user){
    let headers = buildHeader()
    const response = await axios.put(`${uri}/api/users/64136c6f16ea0ebb1b1e1f3e`, user, headers);
    // const response = await axios.put(`http://localhost:3000/api/users/password`, user, headers);
    console.log(response.data)
    return response.data;
}

export async function resetPassword(email){
    const response = await axios.post(`${uri}/api/users/send-password`, email);
    return response.data;
}