const util = require('util')
const mysql = require('../db')

module.exports = {
    asyncQuery: util.promisify(mysql.query).bind(mysql),
    generateQueryBody: (body) => {
        let result = ''
        for(let property in body){
            result += ` ${property} = ${mysql.escape(body[property])},`
        }
        return result.slice(0, -1)
    }
}