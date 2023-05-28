import axios from "axios";

// add cors header to requests




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
            return 'Inspire Key'
        case 'imagine-key-pass':
            return 'Imagine Key'
        case 'dream-key-pass':
            return 'Dream Key'
        case 'enchant-key-pass':
            return 'Enchant Key'
        case 'believe-key-pass':
            return 'Believe Key'
        case 'disney-incredi-pass':
            return 'Incredi-Pass'
        case 'disney-sorcerer-pass':
            return 'Sorcerer Pass'
        case 'disney-pirate-pass':
            return 'Pirate Pass'
        case 'disney-pixie-dust-pass':
            return 'Pixie Dust Pass'
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