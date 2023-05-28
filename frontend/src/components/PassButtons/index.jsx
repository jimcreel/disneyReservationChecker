import getText from '../../utils/api.jsx'

export default function PassButton({resort}) {
    let buttons=[]
    for (pass in availabilities) {
            let passType = availabilities[pass].passType;
            buttons = availabilities.map(passType) `<button type="button" class="btn btn-primary pass-button" 
            data-bs-toggle="modal" id='${passType}'> ${getText(passType)} </button>`;
        }

return (
    <div class = "container">
        <div class = "pass row">
        {buttons}
        </div>
    </div>
    )
}