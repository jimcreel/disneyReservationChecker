import Day from '../Day'

export default function Month ({date}){

    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dayNames = ["S", "M", "T", "W", "T", "F", "S"]; 
    let monthHeader = <p>loading...</p>
    let weekHeader = <p>loading...</p>
    let month = date.getMonth()
    
        monthHeader = <div className="month text-center"> {monthNames[month]} {date.getFullYear()} </div>
        weekHeader = dayNames.map((day) => {
            return <div className="day w-[50px] h-[50px]">{day}</div>
        })

    let monthDates = []
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    let lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0)
    for (let i = 1; i <= 42; i++){
        monthDates.push(new Date(date.getFullYear(), date.getMonth(), i-firstDay))
    }
    let monthHTML = monthDates.map((date) => {
        return <Day date={date} />
    })

    

    
  
    // make an array of dates for each week
    
    return (
        <div className="month max-w-[350px] text-center m-8">
            {monthHeader}
           <div className="week flex flex-row">
            {weekHeader}
           </div>
           <div className="week flex flex-row flex-wrap">
            {monthHTML}
            </div>
        </div>
        ) 
    }