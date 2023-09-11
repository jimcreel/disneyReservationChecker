import { getText, changeDateFormat } from '../../../utils/api'
import { deleteRequest } from '../../../utils/backend'


export default function RequestCard(props) {
    const {request, requests, setRequests} = props;

    const handleDeleteClick = async (requestToDelete) => {
        await deleteRequest(requestToDelete.id);
        setRequests(requests.filter(request => request.id !== requestToDelete.id));
    }

    return (
        <div key={request.id} className="flex flex-col flex-wrap justify-center m-5 border border-black rounded p-2 min-w-[125px]">
            <div className="m-5 text-center">
                <h1 className="text-xl font-semibold mb-2">{changeDateFormat(request.date)}</h1>
                <div className="text-lg mt-4">
                <span className="font-bold">Resort:</span> {getText(request.resort)}
                </div>
                <div className="text-lg mt-2">
                <span className="font-bold">Park:</span> {getText(request.park)}
                </div>
                <div className="text-lg mt-2">
                <span className="font-bold">Pass:</span> {getText(request.pass)}
                </div>
                <div className="text-lg mt-2">
                <span className="font-bold">Status:</span> {request.available ? 'Available' : 'Unavailable'}
                </div>
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-center mt-4"
                onClick={() => handleDeleteClick(request)}
            >
                Delete
            </button>
        </div>

      

    )
}