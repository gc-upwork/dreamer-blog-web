import axios from "axios";

export function serverRequest(config, success, failure) {

    /*default setting for this service*/
    const instance = axios.create({
        baseURL: 'http://localhost:8082',
        timeout: 5000,
    });

    instance(config)
        .then(res => {
            success(res)
        }).catch(error => {
        failure(error)
    })
}