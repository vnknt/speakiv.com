import React,{useState,useEffect} from 'react'

import styles from './index.module.css'
import { Label, Image,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default function RoomCard({id,title,language}) {
    console.log(language)
    return (
        <div className={`col-md-6 col-lg-4 col-xs-12 p-5 ${styles.roomCard}`}>
            <h4>{title}</h4>
            <div className={styles.description}>
                <label>
                    {language}
                </label>

            </div>
            <div className={styles.users}>
                <img alt="avatar" className={styles.userAvatar} src="https://vnknt.github.io/assets/img/pp.jpg"></img>
                <img alt="avatar" className={styles.userAvatar} src="https://vnknt.github.io/assets/img/pp.jpg"></img>
                <img alt="avatar" className={styles.userAvatar} src="https://vnknt.github.io/assets/img/pp.jpg"></img>

            </div>

            <div className={styles.footer}>
                <Link className={styles.joinButton} role="button" to={`/rooms/${id}`}  >Join Room</Link>
            </div>
        </div>
    )
}
