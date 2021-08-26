import React from 'react'
import styles from './connectedUserCard.module.css'
import hark from "hark";
import { useState,useEffect } from 'react';
export default function ConnectedUserCard({userName,profileImg,stream}) {

    const [isSpeaking,setSpeaking] = useState(false)

    var audio_element = document.createElement("video")
    audio_element.srcObject=stream
    audio_element.play()


    useEffect(()=>{
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
                {profileImg}
            </div>
        
    )
}
