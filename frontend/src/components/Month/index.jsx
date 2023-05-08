import Week from "../Week"

export default function Month ({date}){

    console.log(date)
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dayNames = ["S", "M", "T", "W", "T", "F", "S"]; 
    let monthHeader = <p>loading...</p>
    let weekHeader = <p>loading...</p>
    let month = date.getMonth()
    
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

    function buildWeek(day){
        let week = []
        console.log(day)
        for (let i = 0; i < 7; i++) {
        let newDate = new Date(day)
        newDate.setDate(day.getDate() + i)
        week.push(newDate)
    }
    return week
    }
    // make an array of dates for each week
    console.log(date)
    let week1Dates = buildWeek(date)
    console.log(week1Dates)
    let week2Dates = []
    let week3Dates = []
    let week4Dates = []
    let week5Dates = []
    let week6Dates = []
    

    return (
        <div className="month max-w-[350px] text-center m-8">
            {monthHeader}
           <div className="week flex flex-row">
            {weekHeader}
           </div>
              <Week week={week1Dates}/>
                <Week week={week2Dates}/>
                <Week week={week3Dates}/>
                <Week week={week4Dates}/>
                <Week week={week5Dates}/>
                <Week week={week6Dates}/>

        </div>
        ) 
    }