require('dotenv').config()
const axios = require('axios')

module.exports = {
    getResorts: async function (req, res, resort) {
        let resortURL = ''
        if (resort === 'DLR'){
            resortURL = process.env.DLRURL
        } else if (resort === 'WDW'){
            resortURL = process.env.WDWURL
        }
        const resorts = await axios.get(resortURL)
        return resorts.data
    }

    
}