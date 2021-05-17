import { parseStatus, toJson } from './responseParser';
import config from '../config';

export function prepareRequestOptions(data, method = 'GET', headers) {

    if(localStorage.getItem(config.accessTokenName)) {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem(config.accessTokenName);
    }

    let options = {
        method: method,
        headers: headers
    };

    if (data !== null) {
        options['body'] = JSON.stringify(data);
    }

    return options;
}

function request(url, method, data = null, headers = null) {
    const requestOptions = prepareRequestOptions(data, method, headers);
    let link = config.baseUrl + url;

    return fetch(link, requestOptions)
        .then(toJson)
        .then(parseStatus);
}

export function getRequest(url) {
    return request(url, 'GET', null, { 'Accept': 'application/json' });
}

export function postRequest(url, data) {
    return request(url, 'POST', data, { 'Content-Type': 'application/json', 'Accept': 'application/json' });
}

export function patchRequest(url, data) {
    return request(url, 'PATCH', data, { 'Content-Type': 'application/json', 'Accept': 'application/json' });
}

export function putRequest(url, data) {
    return request(url, 'PUT', data, { 'Content-Type': 'application/json', 'Accept': 'application/json' });
}

export function deleteRequest(url, data) {
    return request(url, 'DELETE', data, { 'Content-Type': 'application/json', 'Accept': 'application/json' });
}

export function postFileRequest(url, data) {
    let link = config.baseUrl + url;

    return fetch(link, {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem(config.accessTokenName) ? 'Bearer ' + localStorage.getItem(config.accessTokenName) : ''
        },
        body: data})
        .then(toJson)
        .then(parseStatus);
}

export function getFileRequest(url) {
    const requestOptions = prepareRequestOptions(null, 'GET', {});
    let link = config.baseUrl + url;
    return fetch(link, requestOptions).then((response) => parseStatus(response, true));
}