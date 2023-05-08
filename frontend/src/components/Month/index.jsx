import Week from "../Week"

export default function Month ({date}){

    
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dayNames = ["S", "M", "T", "W", "T", "F", "S"]; 
    let monthHeader = <p>loading...</p>
    let weekHeader = <p>loading...</p>
    let month = date.getMonth()
    console.log(month)
        monthHeader = <div className="month text-center"> {monthNames[month]} {date.getFullYear()} </div>
        weekHeader = dayNames.map((day) => {
            return <div className="day w-[50px] h-[50px]">{day}</div>
        })

        let week = []
    for (let i = 0; i < 6; i++) {
        
        for (let j = 0; j < 7; j++) {
            week.push(<div className="day w-[50px] h-[50px]"></div>)
        }

        
   

    }
   

 
    let weeks = []
    
    return (
        <div className="month max-w-[350px] text-center m-8">
            {monthHeader}
           <div className="week flex flex-row">
            {weekHeader}
           </div>
              <Week />
                <Week />
                <Week />
                <Week />
                <Week />

        </div>
        ) 
    }