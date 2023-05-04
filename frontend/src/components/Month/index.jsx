export default function Month (){
    
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dayNames = ["S", "M", "T", "W", "T", "F", "S"]; 
    let monthHeader = <p>loading...</p>
    let weekHeader = <p>loading...</p>
    let today = new Date()
    let month = today.getMonth()
    console.log(month)
        monthHeader = <div className="month"> {monthNames[month]} {today.getFullYear()} </div>
        weekHeader = dayNames.map((day) => {
            return <div className="day">{day}</div>
        })
   
    

 
    let weeks = []
    
    return (
        <div className="calendar">
            {monthHeader}
            {weekHeader}
        </div>
        ) 
    }