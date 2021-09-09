
import CustomAxios  from "./axiosJwt";
import { apiUrl } from "./constants";
import axios from "axios";

import { useSelector } from "react-redux";

export default class UserService{

    login(username,password){

        return axios.post(`http://${apiUrl}/auth/login`,{username:username,password:password})

    }

    getUserById(userId){
        return axios.get(`http://${apiUrl}/users/getById/${userId}`)
    }


    logout(){

        return CustomAxios.jwt().post(`http://${apiUrl}/auth/logout`)
        
    }



    register(data){


        return axios.post(`http://${apiUrl}/users/register`,{
            name:data.name,
            username:data.username,
            email:data.email,
            password:data.password
        
        })

    }

    refreshToken(){


        return axios.post(`http://${apiUrl}/auth/refreshToken`,{token:localStorage.getItem("refreshToken")})


    }



    checkRefreshToken(){

        return axios.post(`http://${apiUrl}/auth/checkRefreshToken`,{token:localStorage.getItem("refreshToken")})

    }



}