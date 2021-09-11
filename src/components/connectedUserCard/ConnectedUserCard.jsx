import React from 'react'
import styles from './connectedUserCard.module.css'
import hark from "hark";
import { useState, useEffect } from 'react';
import UserService from '../../services/userService';
export default function ConnectedUserCard({ user }) {
    let stream = user.stream
    const [isSpeaking, setSpeaking] = useState(false)

    var audio_element = document.createElement("video")
    audio_element.srcObject = stream

    audio_element.play()


    useEffect(() => {


        let userService = new UserService()












        var audioMonitor = hark(stream)
        audioMonitor.on('speaking', () => {
            setSpeaking(true)
        })

        audioMonitor.on('stopped_speaking', () => {

            setSpeaking(false)
        })


    }

        , [])







    return (

        <div className={`col-6 col-sm-4 col-md-3 col-lg-2 h-32  ${styles.connectedUserCard}`} >
            <div className="row ">
                <div className="col-12 d-flex justify-center">
                    <img className={`h-24 w-24 rounded-full object-contain" ${isSpeaking ? styles.audio_active : styles.audio_default}`} src={`${user.imgUrl}`} />
                </div>
                <div className="col-12 text-center"><b>{user.username}</b></div>
            </div>
        </div>

    )
}
