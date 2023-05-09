export default function Day({date}) {
  let dateNum = ''
  if (date) {
    dateNum = date.getDate()
  }
  return(
    <div className="day w-[50px] h-[50px]">
      <p>{dateNum}</p>
    </div>
  )
}