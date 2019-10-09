import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json;charset=UTF-8'
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

const requestGet = (options) => {
    const headers = new Headers({
        'Accept': 'application/json;charset=UTF-8'
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

const requestImage = (options) => {

    const headers = new Headers({
        'Accept': 'application/json'
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/auth/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function profileInfoUpdate(mainInfoRequest) {
    return request({
        url: API_BASE_URL + "/admin/user/update",
        method: 'POST',
        body: JSON.stringify(mainInfoRequest)
    });
}

export function profilePasswordUpdate(passDataRequest) {
    return request({
        url: API_BASE_URL + "/admin/user/password",
        method: 'POST',
        body: JSON.stringify(passDataRequest)
    });
}

export function profileImageUpdate(formData) {
    return requestImage({
        url: API_BASE_URL + "/admin/user/image/upload",
        method: 'POST',
        body: formData
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function feedback(feedbackRequest) {
    return request({
        url: API_BASE_URL + "/admin/feedback",
        method: 'POST',
        body: JSON.stringify(feedbackRequest)
    });
}

export function dataListGet(roleAdmin) {
    if (roleAdmin) {
        return requestGet({
            url: API_BASE_URL + "/mobile/full",
            //url: "http://localhost:8016" + "/mobile/full",
            method: 'GET'
        });
    }else {
        return requestGet({
            url: API_BASE_URL + "/mobile/list",
            //url: "http://localhost:8016" + "/mobile/list",
            method: 'GET'
        });
    }
}
export function deviceDeleteRequestSend(deviceId) {
    const query = "?device_id" + deviceId;
    return requestGet({
        url: API_BASE_URL + "/mobile/data/delete"  + query,
        method: 'GET',
    });
}

