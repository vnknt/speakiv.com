import React from 'react'
import axios from 'axios'
import {apiUrl} from './constants'


export default class RoomService{
    constructor(){
        
    }
    getRooms(){


        return axios.get(`http://localhost:3009/api/rooms/`)

    }


}