import { useContext } from 'react';
import { AvailabilityContext } from '../App';
import { ResortContext } from '../App'; 
import Month from '../Month';

export default function Calendar (){

    let today = new Date();
   
    return (
        <div id="calendars" className='flex flex-row flex-wrap justify-center'>
            <Month date={today} />
            <Month date={new Date(today.getFullYear(), today.getMonth()+1, 1)} />
            <Month date={new Date(today.getFullYear(), today.getMonth()+2, 1)} />
            <Month date={new Date(today.getFullYear(), today.getMonth()+3, 1)} />
            <Month date={new Date(today.getFullYear(), today.getMonth()+4, 1)} />
            <Month date={new Date(today.getFullYear(), today.getMonth()+5, 1)} />
        </div>
    )
}