import csrftoken from './csrf_token'

export function apiService(endpoint, method, data) {
    const config = {
        method: method || 'GET',
        body: data ? JSON.stringify(data) : null,
        headers: {
            'content-type': 'application/json',
            'X-CSRFTOKEN': csrftoken
        }
    }
    return fetch(endpoint, config).then(response => {
        if (response.status == 204) return ''
        return response.json()
    }).catch(error => console.log(error))
}