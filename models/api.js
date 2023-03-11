require('dotenv').config()
const axios = require('axios')

module.exports = {
    getResorts: async function (req, res) {
        console.log('getResorts function called')
        const DLRresorts = await axios.get(`${process.env.DLRURL}`)
        const WDWresorts = await axios.get(`${process.env.WDWURL}`)
        const allData = DLRresorts.data.concat(WDWresorts.data)
        console.log(typeof DLRresorts.data)
        return allData
    }
}