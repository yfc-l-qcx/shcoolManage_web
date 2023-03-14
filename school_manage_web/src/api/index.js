import axios from "axios";

export function createAPI(options = {}) {
    return axios.post('/create', options)
}