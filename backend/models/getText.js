

module.exports = {
    getText: async function (code) {
        switch (code) {
            case 'DLR':
                return 'Disneyland Resort'
            case 'WDW':
                return 'Walt Disney World Resort'
            case 'DP':
                return 'Disneyland Park'
            case 'CA':
                return 'California Adventure'
            case 'MK':
                return 'Magic Kingdom'
            case 'EPCOT':
                return 'Epcot'
            case 'HS':
                return 'Hollywood Studios'
            case 'AK':
                return 'Animal Kingdom'
        }
        
    }

    
}