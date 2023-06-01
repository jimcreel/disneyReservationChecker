import axios from "axios";
const headers = { headers: 
    { 
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json'
    }
};

const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken')}};

export async function signUp(user){
    
    const {data} = await axios.post('http://localhost:3000/api/users/signup', user);
   
    return data;
}

export async function login(user){
    const {data} = await axios.post('http://localhost:3000/api/users/login', user);
    return data;
}

export async function getAvailability(resort, pass){
    // const url = `https://magicres-backend.herokuapp.com/api/availability/${resort}/${pass}`
    const url = `http://localhost:3000/api/availability/${resort}/${pass}`
    const response = await axios.get(url)
    return response.data;
}
export async function makeNewRequest(request) {
   
    // const response = await axios.post(`https://magicres-backend.herokuapp.com/api/requests/create/64136c6f16ea0ebb1b1e1f3e`, request, {headers});
    const response = await axios.post(`http://localhost:3000/api/requests/create`, request, headers);
    return response.data;
}

export async function getUser(){
    // const response = await axios.get(`https://magicres-backend.herokuapp.com/api/users/64136c6f16ea0ebb1b1e1f3e`, {headers});
    const response = await axios.get(`http://localhost:3000/api/users/profile`, headers);
    return response.data;
}

export async function deleteRequest(requestId){
    // const response = await axios.delete(`https://magicres-backend.herokuapp.com/api/requests/${requestId}`, {headers});
    const response = await axios.delete(`http://localhost:3000/api/requests/${requestId}`, headers);
    return response.data;
}
