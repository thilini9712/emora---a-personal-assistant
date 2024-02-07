import axios from "axios";

const accessToken: string | null = localStorage.getItem("loggedUserToken");
const Repository = axios.create({
    baseURL:  "http://18.143.151.234:8080/api/user", //18.143.151.234
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }
})

export default Repository;