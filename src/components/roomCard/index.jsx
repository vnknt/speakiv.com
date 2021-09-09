import React,{useState,useEffect} from 'react'

import styles from './index.module.css'
import { Label, Image,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {LanguageLevels} from '../../utilities/constants/'

export default function RoomCard({room_info}) {

    let id = room_info._id
    let title = room_info.name
    let language = room_info.language
    let active_users=room_info.active_users
    let level = room_info.level
    
    return (
        <div className="col-md-6 col-lg-4 col-xs-12 p-2  ">
        <div className={`${styles.roomCard}`}>
            <h4>{title}</h4>
            <div >
                <div>
                    <b className={`${styles.language}`}>{language.name}</b> <i> {LanguageLevels[level] }</i>
                </div>

            </div>
            <div className={styles.users}>
                {
                    active_users.map((u)=>{
                        return (<img alt="avatar" className={styles.userAvatar} src={u.imgUrl}></img>)
                    })
                    
                }
            </div>

            <div className={styles.footer}>
                <Link to={`/rooms/${id}`} ><button className={`${styles.joinButton}`} >Join Room</button></Link>
            </div>
        </div>
        </div>
    )
}
