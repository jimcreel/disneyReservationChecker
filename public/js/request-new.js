let dlr = document.getElementsByClassName('DLR');
let wdw = document.getElementsByClassName('WDW');

document.getElementById('resortSelect').addEventListener('change', function() {
  if (this.value == 'DLR') {
    for (resort of dlr){
      resort.removeAttribute('disabled');
      }
    for (resort of wdw){
      resort.setAttribute('disabled', 'disabled');
      }
    }
  else if (this.value == 'WDW') {
    for (resort of wdw){
      resort.removeAttribute('disabled');
      }
    for (resort of dlr){
      resort.setAttribute('disabled', 'disabled');
      }
    }
  });

  let resortSelect = document.getElementById("resortSelect");
  for (let i = 0; i < resortSelect.length; i++) {
    if (resortSelect[i].value === resortText) {
      resortSelect[i].selected = true;
    }else{
      resortSelect[i].selected = false;
    }
  }