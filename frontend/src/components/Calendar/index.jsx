
import Month from '../Month';

export default function Calendar (props){
    let availability = props
    let resort = props
    let today = new Date();
    let calendarHTML = 'loading...'
    if (availability) { 
        calendarHTML = 
        <div id="calendars" className='flex flex-row flex-wrap justify-center'><Month date={new Date(today.getFullYear(), today.getMonth(), 1)} availability={availability} resort={resort}/>
        <Month date={new Date(today.getFullYear(), today.getMonth()+1, 1)} availability={availability} resort={resort}/>
        <Month date={new Date(today.getFullYear(), today.getMonth()+2, 1)} availability={availability} resort={resort}/>
        <Month date={new Date(today.getFullYear(), today.getMonth()+3, 1)} availability={availability} resort={resort}/>
            </div>
    }

    return (
        <>
            {calendarHTML}
        </>
    )
}

{/* */}