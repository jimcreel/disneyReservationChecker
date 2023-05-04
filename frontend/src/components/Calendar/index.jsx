import { useContext } from 'react';
import { AvailabilityContext } from '../App';
import { ResortContext } from '../App'; 
import Month from '../Month';

export default function Calendar (){

   
    return (
        <div id="calendars">
            <Month />
        </div>
    )
}