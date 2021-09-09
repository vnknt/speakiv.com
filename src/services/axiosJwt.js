import axios from "axios";
import { clearUserState, login, logout, refreshTokens } from "../store/action/userAction";
import { useSelector,useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import UserService from "./userService";



class CustomAxios{

    static config(store){
        this.x=1
        this.store = store
        this.axiosJwt = axios.create()

        


        this.axiosJwt.interceptors.request.use(async (config)=>{
        
            let token_access = localStorage.getItem("accessToken");
            let token_refresh = localStorage.getItem("refreshToken");
    
            if(token_refresh==null || token_refresh==undefined || token_access==null || token_access==undefined){
             this.store.dispatch(clearUserState())
              return config
            }
            
            let userService = new UserService()
            
            let checkRefreshTokenReq =await userService.checkRefreshToken(token_refresh)
            console.log(checkRefreshTokenReq)
            if(!checkRefreshTokenReq.data.success){
                
                this.store.dispatch(clearUserState())
                return config
            }


            let accessTokenExpires = await jwt_decode(token_access).exp
            let currentDate = new Date()
            
            if(accessTokenExpires * 1000 <=  currentDate.getTime() ){
                
                
                userService.refreshToken().then(response=>{


                
                
                console.log(response)
             
    
                if(response.data.success){
    
                    let new_refresh_token = response.data.data.refreshToken
                    let new_access_token = response.data.data.accessToken
                    console.log(new_refresh_token)
                    config.headers["authorization"] = "Bearer "+new_access_token
                    this.store.dispatch(login({"accessToken":new_access_token,"refreshToken":new_refresh_token}))

                    
                }else{
                    this.store.dispatch(logout())
                }
            }).catch(error=>{
                this.store.dispatch(logout())
            })
    
            }else{
                console.log("not expired")
                config.headers["authorization"]  ="Bearer "+token_access
                
            }
        
            return config
        
        },(error)=>{
            
            return Promise.reject(error)
        })
    
        
        return 
    }

    static jwt() {
        
        return this.axiosJwt
    }

}

export default CustomAxios