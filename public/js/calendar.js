let modalArray = document.querySelectorAll('.modal');
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