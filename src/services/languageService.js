import axios from "axios"
import { apiUrl } from "./constants"

export default class LanguageService{
   

    getLanguages(){
        console.log(process.env.REACT_APP_API_URL)
        return axios.get(`http://${apiUrl}/languages`)
    }



}