
import Month from '../Month';
import { useEffect } from 'react';

import { get } from 'mongoose';

export default function Calendar (props){
   
    let availability = props
    let resort = props
    let today = new Date();

    let calendarHTML = 'loading...'
    if (availability) { 
        calendarHTML = 
        <div id="calendars" className='flex flex-row flex-wrap justify-center'>
        <Month key={today.getMonth()} date={new Date(today.getFullYear(), today.getMonth(), 1)} availability={availability} resort={resort}/>
        <Month key={today.getMonth() + 1} date={new Date(today.getFullYear(), today.getMonth()+1, 1)} availability={availability} resort={resort}/>
        <Month key={today.getMonth() + 2} date={new Date(today.getFullYear(), today.getMonth()+2, 1)} availability={availability} resort={resort}/>
        <Month key={today.getMonth() + 3} date={new Date(today.getFullYear(), today.getMonth()+3, 1)} availability={availability} resort={resort}/>
            </div>
    }

    return (
        <>
            {calendarHTML}
        </>
    )
}

{/* */}