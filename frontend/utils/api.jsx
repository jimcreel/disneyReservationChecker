import axios from "axios";

// add cors header to requests




export async function getAvailability(resort, pass) {
    let url = `https://${resort}.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=${pass}&destinationId=DLR&numMonths=14` 
    const response = await axios.get(url);
    return response.data;
}



// ... rest of the code


export function getText(code) {
    
    switch (code) {
        case 'DLR':
            return 'Disneyland Resort'
        case 'WDW':
            return 'Walt Disney World Resort'
        case 'DP':
            return 'Disneyland Park'
        case 'CA':
            return 'California Adventure'
        case 'MK':
            return 'Magic Kingdom'
        case 'EP':
            return 'Epcot'
        case 'HS':
            return 'Hollywood Studios'
        case 'AK':
            return 'Animal Kingdom'
        case 'inspire-key-pass':
            return 'Inspire'
        case 'imagine-key-pass':
            return 'Imagine'
        case 'dream-key-pass':
            return 'Dream'
        case 'enchant-key-pass':
            return 'Enchant'
        case 'believe-key-pass':
            return 'Believe'
        case 'disney-incredi-pass':
            return 'Incredi-Pass'
        case 'disney-sorcerer-pass':
            return 'Sorcerer'
        case 'disney-pirate-pass':
            return 'Pirate'
        case 'disney-pixie-dust-pass':
            return 'Pixie Dust'
        case 'ANY':
            return 'Any Park'
    }
}


export function changeDateFormat(dateString) {
    const date = new Date(dateString);
    
    let day = String(date.getUTCDate());
    if (day.length < 2) day = '0' + day;
    
    let month = String(date.getUTCMonth() + 1); // Months are 0-based in JS
    
    const year = date.getUTCFullYear();
    
    return `${getMonthString(month)} ${day}, ${year}`;
  }
  

export function getMonthString(monthNum){
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    return monthNames[monthNum -1];
}