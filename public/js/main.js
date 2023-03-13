
// Get the current date
let today = new Date();



// Array of month names
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Array of day names
let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Function to generate calendar HTML
function generateCalendarHTML(date) {
  // Create a new date object for the given month
  let month = new Date(date.getFullYear(), date.getMonth(), 1);

  // Start building the HTML
  let html = '<div class="calendar">';
  html += '<div class="month">' + monthNames[month.getMonth()] + ' ' + month.getFullYear() + '</div>';

  // Add the day labels
  html += '<div class="week">';
  for (let i = 0; i < 7; i++) {
    html += '<div class="day">' + dayNames[i] + '</div>';
  }
  html += '</div>';

  // Add the days of the month
  let week = '<div class="week">';
  for (let i = 0; i < month.getDay(); i++) {
    week += '<div class="day empty"></div>';
  }
  while (month.getMonth() === date.getMonth()) {
    week += '<div class="day">' + month.getDate() + '</div>';
    if (month.getDay() === 6) {
      week += '</div><div class="week">';
    }
    month.setDate(month.getDate() + 1);
  }
  for (let i = month.getDay(); i < 7; i++) {
    week += '<div class="day empty"></div>';
  }
  html += week + '</div>';

  // Close the calendar div
  html += '</div>';

  return html;
}

// Generate HTML for the current month and the next three months
let calendarHTML = '';
for (let i = 0; i < 4; i++) {
  calendarHTML += generateCalendarHTML(new Date(today.getFullYear(), today.getMonth() + i, 1));
}

// Display the HTML
document.getElementById('calendars').innerHTML = calendarHTML;
