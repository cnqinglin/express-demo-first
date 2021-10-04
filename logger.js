const logger = (prefix) => {
    return (request, response, next) =>{
        console.log(`${prefix}:${request.path}`)
        next()
    }
}

module.exports = logger