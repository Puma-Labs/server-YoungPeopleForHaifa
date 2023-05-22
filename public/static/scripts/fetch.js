async function fetchHelper(uri, method = 'GET', option) {
    const {
        body = {},
        headers = {},
        json = true,
        parseResult = true,
        cbBefore = () => {},
        cbAfter = () => {},
        cbSuccess = () => {},
        cbError = () => {},
        cbLogin = () => {},
    } = option
    try {
        cbBefore()

        const fetchOption = {}
        method.toLowerCase() === 'post'
            ? fetchOption.body = json ? JSON.stringify(body) : body
            : fetchOption

        headers === {}
            ? fetchOption.headers = headers
            : fetchOption.headers = {'Content-Type': 'application/json; charset=utf-8'}

        let response = await fetch(uri, {...fetchOption, method: method});
        let result = await response.text()

        if(response.status !== 403) {
            if(parseResult) {
                result = JSON.parse(result)
            }

            cbSuccess(result)
            return result
        } else {
            $('body').prepend(result)
            cbLogin()
            throw 'please sign in account'
        }
    }  catch (e) {
        console.error('ERROR::', e)
        cbError(e)
        return {status: 'error'}
    } finally {
        cbAfter()
    }
}
