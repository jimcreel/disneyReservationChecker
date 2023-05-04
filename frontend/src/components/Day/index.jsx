let modalHTML = ''; 
    // build modals for dates that have availability keys in their objects
     if (resortAvailability !== undefined) { 
       modalHTML = `<div class="modal" id="modal-${resortFullDate}-${availabilities.passType}">` 
       modalHTML += `<div class="modal-content">` 
       modalHTML += `<div class="modal-header">` 
       modalHTML += `<span class="close" id="close-${resortFullDate}">&times;</span>` 
       modalHTML += `<h3>Availability for ${resortFullDate}</h3>` 
       modalHTML += `</div>` 
       modalHTML += `<div class="modal-body">` 
       modalHTML += `<div class="modal-body-content">` 
       modalHTML += `<div class="modal-body-content-left">` 
         let textResort = getText(resort);  
       modalHTML += `<p>Resort: ${textResort}</p>` 
       modalHTML += `<p>Park Availability: </p>` 
       modalHTML += `</div>` 
       modalHTML += `<div class="modal-body-content-right">` 
      // build individual facility divs for each park in the availability object 
       for (facilities of resortAvailability.facilities) { 
         modalHTML += `<div class="facilities">` 
         modalHTML += `<img src=https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/${facilities.facilityName}.png>` 
         modalHTML += `<p>${facilities.available ? 'Available' : facilities.blocked ? 'Blocked Out' : 'No Reservations'}</p>` 
        // conditional buttons to request dates if they're not blocked 
        // first one links to disney's site for the reservation
         if (facilities.available && resort === 'DLR'){
          modalHTML += `<a href="https://disneyland.disney.go.com/entry-reservation/" target="_blank"><button>Book Now</button></a>`
        }else if (facilities.available && resort === 'WDW'){
          modalHTML += `<a href="https://disneyworld.disney.go.com/entry-reservation/" target="_blank"><button>Book Now</button></a>`
        }else if (!facilities.available && !facilities.blocked){
          modalHTML += `<a href="/requests/new/${user._id}/${resortFullDate}/${facilities.facilityName}"><button>Request a Notification</button></a>`
        } 

          
         modalHTML += `</div>` 
       } 
      
       // lets the user place a request for the first available park on a given date (if pass not blocked)
         for (facilities of resortAvailability.facilities) { 
         if (!facilities.blocked) { 
           modalHTML += `<div class ="facilities">` 
         modalHTML += `<img src='https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/WDW_ALL.webp'><p>Any Park</p><a href="/requests/new/640d649def9a82312f066ba0/${resortFullDate}/${resort}_ANY"><button>Request Any Park</button></a>` 
         modalHTML += `</div>` 
         break 
         } 
         } 
        
       modalHTML += `</div>` 
       modalHTML += `</div>` 
       modalHTML += `</div>` 
       modalHTML += `</div>` 
       modalHTML += `</div>` 
       html += modalHTML; 
      
      // adding classes and images to day divs to indicate availability
       if (resortAvailability.availability === 'cms-key-all-availability' ) { 
         if (resort === 'DLR') { 
           resortClass = 'both' 
           imgHTML = `<img src="https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/both.png" alt="both" style="width: 27px; height: 15px;">` 
         }else{
          resortClass = 'all'
          imgHTML = `<img src="https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/all.png" alt="all" style="width: 27px; height: 15px;">`
        } 
        
         }else if (resortAvailability.availability === 'cms-key-at-least-one-availability') { 
           if (resort === 'DLR') { 
             resortClass = resortAvailability.facilities.find(resort => resort.available === true).facilityName; 
             imgHTML = `<img src="https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/${resortClass}.png" alt="${resortClass}" style="width: 15px; height: 15px;">`  
           }else{
            resortClass = 'some'
            imgHTML = `<img src="https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/some.png" alt="some" style="width: 27px; height: 15px;">`
          } 
      // if no availability, check to see if it's blocked or just full 
         }else if (resortAvailability.availability === 'cms-key-no-availability') { 
             for (facilities of resortAvailability.facilities) { 
               if (facilities.blocked === true) { 
                 resortClass = 'slash' 
                 }else{ 
                   imgHTML = `<img src="https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/green.png" alt="green" style="width: 15px; height: 15px;">` 
                   resortClass = 'green' 
                 } 
               } 
            
         } 
     }else{ 
         resortClass = 'slash' 
     } 
    
    

    // finish the resortClass so it can respond to conditional rendering 
     resortClass += ' ' + availabilities.passType + ' availability' 
     week += `<div class='day ${resortClass}' id='${resortFullDate}-${availabilities.passType}'>` + month.getDate() + '</a>' + imgHTML + '</div>'; 
