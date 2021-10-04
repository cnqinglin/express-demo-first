const routerPath = () => {
    return (request, response, next) => {
        response.write('routerTest')
        next()
    }
}

module.exports = routerPath