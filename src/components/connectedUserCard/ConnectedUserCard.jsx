import React from 'react'
import styles from './connectedUserCard.module.css'
import hark from "hark";
import { useState,useEffect } from 'react';
import UserService from '../../services/userService';
export default function ConnectedUserCard({id,userName,profileImg,stream}) {

    const [isSpeaking,setSpeaking] = useState(false)

    var audio_element = document.createElement("video")
    audio_element.srcObject=stream

    audio_element.play()


    useEffect(()=>{


        let userService = new UserService()

        










        var audioMonitor = hark(stream)
        audioMonitor.on('speaking',()=>{
            setSpeaking(true)
        })
    
        audioMonitor.on('stopped_speaking',()=>{
            
            setSpeaking(false)
        })
    
     
    }
        
    ,[])
    

    




    return (
        
            <div className={`col-2 ${styles.connectedUserCard} ${isSpeaking?styles.audio_active:styles.audio_default}`} >
                {userName}
                
            </div>
        
    )
}
