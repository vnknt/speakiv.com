import axios from "axios";
import { apiUrl } from "./constants";

export default class UserService{

    login(username,password){

        return axios.post(`http://${apiUrl}/users/login`,{username:username,password:password})

    }


}