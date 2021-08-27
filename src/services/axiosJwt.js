import axios from "axios";
import { refreshTokens } from "../store/action/userAction";
import { useSelector,useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import UserService from "./userService";


const axiosJwt = axios.create()

    axiosJwt.interceptors.request.use(async (config)=>{
        
        let token_access = localStorage.getItem("accessToken");
        let token_refresh = localStorage.getItem("refreshToken");

        if(token_refresh==null || token_refresh==undefined || token_access==null || token_access==undefined){
            console.log("undef")
          return config
        }
        
        let accessTokenExpires = await jwt_decode(token_access).exp
        let currentDate = new Date()
        console.log(accessTokenExpires * 1000, currentDate.getTime())

        
        if(accessTokenExpires * 1000 <=  currentDate.getTime()-50000 ){
            
            
            let userService = new UserService()
            let response = await userService.refreshToken()
            console.log("expired")
            console.log(response)
            if(response.data.success){

                let new_refresh_token = response.data.data.refreshToken
                let new_access_token = response.data.data.accessToken

                localStorage.setItem("accessToken",new_access_token);
                localStorage.setItem("refreshToken",new_refresh_token)
                
                console.log(new_refresh_token)
                config.headers["authorization"] = "Bearer "+new_access_token

            } 



        }else{
            console.log("not expired")
            config.headers["authorization"]  ="Bearer "+token_access
            
        }
    
        return config
    
    },(error)=>{
    
        return Promise.reject(error)
    })



    // axiosJwt.interceptors.response.use(async (response)=>{

    //     if(response.status===400 ){

    //     }



    // },( error)=>{
    //     return Promise.reject(error)
    // })


export {axiosJwt}