import axios from "axios"

export async function getAvailability(resort){
    let url = resort == 'DLR' ? 'https://disneyland.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=inspire-key-pass,believe-key-pass,enchant-key-pass,imagine-key-pass,dream-key-pass&destinationId=DLR&numMonths=14' : process.env.WDWURL
    const response = await axios.get(url)
    return response.data
}