import axios from "axios";
const headers = {
    'Content-Type': 'application/json', // Specify the content type of the request
  };

export async function getAvailability(resort, pass){
    console.log(resort, pass)
    const url = `api/availability/${resort}/${pass}`
    const response = await axios.get(url)
    return response.data;
}
export async function makeNewRequest(request) {
    
    const response = await axios.post(`/api/requests/create/64136c6f16ea0ebb1b1e1f3e`, request, {headers});
    
    return response.data;
}

export async function getUser(){
    const response = await axios.get(`/api/users/64136c6f16ea0ebb1b1e1f3e`, {headers});
    
    return response.data;
}

export async function deleteRequest(requestId){
    const response = await axios.delete(`/api/requests/${requestId}`, {headers});
    return response.data;
}
