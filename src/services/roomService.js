import React from 'react'
import axios from 'axios'
import {apiUrl} from './constants'
import { axiosJwt } from './axiosJwt'


export default class RoomService{
    constructor(){
        
    }
    getRooms(){


        return axiosJwt.get(`http://${apiUrl}/rooms/`)

    }

    getRoomById(roomId){

        return axiosJwt.get(`http://${apiUrl}/rooms/${roomId}`)

    }




    createRoom(values){
        return axiosJwt.post(`http://${apiUrl}/rooms/`,{name:values.title,lang_code:values.language,level:values.level,user_limit:values.limit})

    }

}