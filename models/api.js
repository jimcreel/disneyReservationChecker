require('dotenv').config()
const axios = require('axios')

module.exports = {
    getResorts: async function (req, res, resort) {
        const resorts = await axios.get(resort)
        
        return allData
    }

    
}