require('dotenv').config()
const axios = require('axios')

module.exports = {
    getResorts: async function (req, res) {
        console.log('getResorts function called')
        const DLRresorts = await axios.get('https://disneyland.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=inspire-key-pass,believe-key-pass,enchant-key-pass,imagine-key-pass,dream-key-pass&destinationId=DLR&numMonths=14')
        const WDWresorts = await axios.get('https://disneyworld.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=disney-incredi-pass,disney-sorcerer-pass,disney-pirate-pass,disney-pixie-dust-pass&destinationId=WDW&numMonths=13')
        const allData = DLRresorts.data.concat(WDWresorts.data)
        return allData
    }

    
}