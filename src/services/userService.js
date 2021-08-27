
import {axiosJwt}  from "./axiosJwt";
import { apiUrl } from "./constants";
import axios from "axios";

import { useSelector } from "react-redux";

export default class UserService{

    login(username,password){

        return axios.post(`http://${apiUrl}/auth/login`,{username:username,password:password})

    }



    logout(){

        return axiosJwt.post(`http://${apiUrl}/auth/logout`)
        
    }



    register(name,username,email,password){


        return axios.post(`http://${apiUrl}/users/register`,{username:username,email:email})

    }

    refreshToken(){


        return axios.post(`http://${apiUrl}/auth/refreshToken`,{token:localStorage.getItem("refreshToken")})


    }







}