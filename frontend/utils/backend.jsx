import axios from "axios";
const headers = {
    'Content-Type': 'application/json', // Specify the content type of the request
  };

export async function getAvailability(resort, pass){
    console.log(resort, pass)
    const url = `https://magicres-backend.herokuapp.com/availability/${resort}/${pass}`
    const response = await axios.get(url)
    return response.data;
}
export async function makeNewRequest(request) {
    
    const response = await axios.post(`https://magicres-backend.herokuapp.com/requests/create/64136c6f16ea0ebb1b1e1f3e`, request, {headers});
    
    return response.data;
}

export async function getUser(){
    const response = await axios.get(`https://magicres-backend.herokuapp.com/users/64136c6f16ea0ebb1b1e1f3e`, {headers});
    
    return response.data;
}

export async function deleteRequest(requestId){
    const response = await axios.delete(`https://magicres-backend.herokuapp.com/requests/${requestId}`, {headers});
    return response.data;
}
