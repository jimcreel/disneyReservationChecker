import axios from "axios";

export async function makeNewRequest(request) {
    
    const response = await axios.post(`https://magic-reservations.herokuapp.com/api/requests/create/64136c6f16ea0ebb1b1e1f3e`, request);
    
    return response.data;
}

export async function getUser(){
    const response = await axios.get(`https://magic-reservations.herokuapp.com/api/users/64136c6f16ea0ebb1b1e1f3e`);
    
    return response.data;
}

export async function deleteRequest(requestId){
    const response = await axios.delete(`https://magic-reservations.herokuapp.com/api/requests/${requestId}`);
    return response.data;
}
