import React from 'react'
import axios from 'axios'
import {apiUrl} from './constants'
// import { axiosJwt } from './axiosJwt'
import CustomAxios from './axiosJwt'

export default class RoomService{
    constructor(){
        
    }
    getRooms(){


        return CustomAxios.jwt().get(`${apiUrl}/rooms/`)

    }

    getRoomById(roomId){

        return CustomAxios.jwt().get(`${apiUrl}/rooms/${roomId}`)

    }




    createRoom(values){
        return CustomAxios.jwt().post(`${apiUrl}/rooms/`,{name:values.title,lang_code:values.language,level:values.level,user_limit:values.limit})

    }

}