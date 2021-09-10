
import CustomAxios  from "./axiosJwt";
import { apiUrl } from "./constants";
import axios from "axios";

import { useSelector } from "react-redux";

export default class UserService{

    login(username,password){

        return axios.post(`${apiUrl}/auth/login`,{username:username,password:password})

    }

    getUserById(userId){
        return CustomAxios.jwt().get(`${apiUrl}/users/getById/${userId}`)
    }


    logout(){

        return CustomAxios.jwt().post(`${apiUrl}/auth/logout`)
        
    }



    register(data){


        return axios.post(`${apiUrl}/users/register`,{
            name:data.name,
            username:data.username,
            email:data.email,
            password:data.password
        
        })

    }

    refreshToken(){


        return axios.post(`${apiUrl}/auth/refreshToken`,{token:localStorage.getItem("refreshToken")})


    }



    checkRefreshToken(){

        return axios.post(`${apiUrl}/auth/checkRefreshToken`,{token:localStorage.getItem("refreshToken")})

    }

    async uploadProfileImage(base64EncodedImage){
       
        return CustomAxios.jwt().post(`${apiUrl}/users/uploadProfileImage`,{data:base64EncodedImage})
    }

}