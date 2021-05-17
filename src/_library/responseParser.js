export function toJson(response) {
    return new Promise((resolve, reject) => {
        response.json()
            .then(data =>
                resolve({
                    'status': response.status,
                    'statusText': response.statusText,
                    'ok': response.ok,
                    'data': data
                })
            )
            .catch(() =>
                reject(response)
            );
    });
}

export function parseStatus(response, file = false) {
    return new Promise((resolve, reject) => {
        if (response.status === 200) {

            if (!response.ok) {
                return reject(response.statusText);
            }

            if (file) {
                return resolve(response)
            } else {
                return resolve(response.data)
            }
        } else if (response.status === 400 || response.status === 401 || response.status === 403 ||
                    response.status === 404) {

            if (response.data.errors !== undefined) {
                return reject(response.data.errors)
            }

            return reject(response.data)
        } else {
            return reject(new Error(response.statusText))
        }
    });
}