let modalArray = document.querySelectorAll('.modal');
let passDays = document.querySelectorAll('.availability');

document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', () => {
        for (modal of modalArray) {
            let dayID = day.id;
            if (modal.id === `modal-${dayID}`){
            modal.style.display='block';
        }
    }
    })
})

document.querySelectorAll('.close').forEach(close => {
    close.addEventListener('click', () => {
        for (modal of modalArray) {
            modal.style.display='none';
        }
    })
})

document.querySelectorAll('.pass-button').forEach(button => {
    button.addEventListener('click', () => {
        let buttonID = button.id;
        document.querySelector('#calendars').style.display='flex';
        for (day of passDays) {
            if (day.classList.contains(buttonID)){
                day.style.display='flex';
            }else{
                day.style.display='none';
            }
        }
    })
})
