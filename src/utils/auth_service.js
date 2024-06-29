export function getUserFromLocalStorage(){
    const token = loadToken()

    if (token) {
        return extractPayload(token) 
    } else {
        return null
    }
}

function extractPayload(token) {
    const payload = token.split('.')[1]
    return JSON.parse(window.atob(payload))
}

function loadToken(){
    const token = localStorage.getItem('token')
    if(!token) {
        return null
    }
    if(isExpired(token)) {
        return null
    }
    return token

}

function isExpired(token) {
    const payload = extractPayload(token)
    return payload.exp < (Date.now() / 1000)
}
