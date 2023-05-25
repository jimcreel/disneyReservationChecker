import axios from "axios";

export async function makeNewRequest(request) {
    
    const response = await axios.post(`/api/requests/create/64136c6f16ea0ebb1b1e1f3e`, request);
    
    return response.data;
}

export async function getUser(){
    const response = await axios.get(`/api/users/64136c6f16ea0ebb1b1e1f3e`);
    
    return response.data;
}

export async function deleteRequest(requestId){
    const response = await axios.delete(`/api/requests/${requestId}`);
    console.log(response)
    return response.data;
}

export function changeDateFormat(dateString) {
    const date = new Date(dateString);
    
    let day = String(date.getDate());
    if (day.length < 2) day = '0' + day;
    
    let month = String(date.getMonth() + 1); // Months are 0 based in JS
    if (month.length < 2) month = '0' + month;
    
    const year = date.getFullYear();
    
    return `${month}-${day}-${year}`;
}
