import axios from "axios"

const send =() => {
    return axios.get('http://localhost:8081/api/user/get').then((response )=>response.data)
}