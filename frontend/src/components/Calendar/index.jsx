
import Month from '../Month';
import { useEffect, useContext } from 'react';
import { getText } from '../../../utils/api';
import { PassContext } from '../App';

import { get } from 'mongoose';

export default function Calendar (props){
   const loggedIn = props

    let availability = props
    let resort = props
    let pass = useContext(PassContext)
    let today = new Date();
    let displayResort = ''
    let displayPass = ''

    let calendarHTML = 'loading...'
    if (availability) { 
        calendarHTML = 
        <div id="calendars" className='flex flex-row flex-wrap justify-center'>
        <Month key={today.getMonth()} date={new Date(today.getFullYear(), today.getMonth(), 1)} availability={availability} resort={resort} pass={pass}/>
        <Month key={today.getMonth() + 1} date={new Date(today.getFullYear(), today.getMonth()+1, 1)} availability={availability} resort={resort} pass={pass}/>
        <Month key={today.getMonth() + 2} date={new Date(today.getFullYear(), today.getMonth()+2, 1)} availability={availability} resort={resort} pass={pass}/>
        <Month key={today.getMonth() + 3} date={new Date(today.getFullYear(), today.getMonth()+3, 1)} availability={availability} resort={resort} pass={pass}/>
            </div>
    }
    if (typeof(resort.resort) === 'string') {
        displayResort = getText(resort.resort)
    } else {
        displayResort = getText(resort.resort[0])
    }

    if (typeof(pass.pass) === 'string') {
        displayPass = getText(pass)
    } else {
        displayPass = getText(pass)
    }

    return (
        <div className="flex flex-col flex-wrap justify-center">
            <h1
                className="text-2xl font-bold text-center m-5">
            Availability for {displayResort} - {displayPass} </h1>
            {calendarHTML}
        </div>
    )
}

{/* */}