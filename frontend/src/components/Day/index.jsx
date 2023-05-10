
import { Link } from "react-router-dom"


export default function Day(props) {
  const { date, availability, resort, month } = props
  let dateNum = ''
  if (date.getMonth() == month) {
    dateNum = date.getDate()
  }
  let requestAvailable = false
  // get the date as a string in yyyy-mm-dd format
  let dateStr = date.toISOString().split('T')[0]
  console.log(availability)
  let calendarAvail = availability.availability[0]['calendar-availabilities']
  console.log('calendarAvail', calendarAvail)
  let dateClass = 'text-xl font-thin hover:font-normal  '
  let availabilityHTML = ''
  let dayClass = "day w-[50px] h-[50px] border border-black  flex align-center justify-between flex-col pb-2 hover:cursor-pointer hover:shadow-md hover:border-gray-400 hover:bg-gray-100"
  let today = new Date()
  if (date.getMonth() != month) {
    dayClass = "day w-[50px] h-[50px] border  border-black  flex align-center justify-between flex-col pb-2 bg-gray-200"
    dateClass = 'text-xl font-thin '
    } else if (date < today){
      dayClass = "day w-[50px] h-[50px] border  border-black  flex align-center justify-between flex-col pb-2 bg-gray-400"
      dateClass = 'text-xl font-thin'
    }
  
  let dateAvailability = []
  if (calendarAvail && date.getMonth()==month) {
    availabilityHTML = calendarAvail.map((avail) => {
      if (avail.date && avail.date === dateStr) {
        if (avail.availability == 'cms-key-no-availability' ){
          if(avail.facilities[0].blocked){
            dayClass = "day w-[50px] h-[50px] border  border-black  flex align-center justify-between flex-col pb-2 bg-slate-400"
            dateClass = 'text-xl font-thin text-white'
            return <div className='cms-key-no-availability grow-0 w-[50px] bg-slate'></div>
          }else{
            requestAvailable = true
            return <div className='cms-key-no-availability grow-0 '><img className='w-[15px] h=[15px]' src="https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/green.png"></img></div>
          }
        } else if (avail.availability == 'cms-key-all-availability'|| avail.availability == 'aplex-key-availability'){
              requestAvailable = true
              let availImg = resort.resort == 'DLR' ? 'https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/both.png' : 'https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/all.png'
              return <div className='cms-key-limited-availability grow-0'><img className='w-[27px] h-[15px]' src={availImg} alt="all" ></img></div>
        } else {
            requestAvailable = true
            if (resort.resort == 'WDW'){
              return <div className = 'cms-key-at-least-one-availability grow-0'><img className='w-[27px] h-[15px] ' src="https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/some.png"></img></div>
            } else {
              let availImg=''
              for (let i = 0; i < 2; i++){
                if (avail.facilities[i].available){
                  console.log(avail.facilities[i])
                  availImg = `https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/${avail.facilities[i].facilityName}.png`
                  }
              }
              return <div className = 'cms-key-at-least-one-availability grow-0'><img className='w-[15px] h-[15px] ' src={availImg}></img></div>
         } 
      } 
      }})
    }
  let requestLink = ''
  if (requestAvailable){
    requestLink = `/request/${resort.resort}/${dateStr}`

  }

  return(
    <>
    <Link to={requestLink}>
      <div className={dayClass}>
        <p className={dateClass}>{dateNum}</p>
        <div className='availability flex justify-center '>
          {availabilityHTML}
          </div>
      </div>
    </Link>
    </>
  )
}