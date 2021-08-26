
import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './Room.module.css'
import { io } from "socket.io-client";
import connectedUserCard from "../../components/connectedUserCard/ConnectedUserCard";
import React from "react";
import ActiveUsersWrapper from "../../components/ActiveUsersWrapper/ActiveUsersWrapper";
export default function Room(props) {

    const [remoteId, setRemoteId] = useState("");
    const [peerId, setPeerId] = useState("");
    const [calls, setCalls] = useState([])
    const [callAccepted, setCallAccepted] = useState(false)
    const [audioVolume, setAudioVolume] = useState(0.0)
    const [joined, setJoined] = useState(false)
    const [isAbleToJoin, setIsAbleToJoin] = useState(false)

    const [activeUsers,setActiveUsers] = useState([])
    let [arr , setArr] = useState([])

    const socket = io.connect("localhost:3002")

    let peer = new Peer();

    let { roomId } = useParams()

    var videoDiv = null;


    const handleInput = (event) => {

        setRemoteId(event.target.value)

    }

    useEffect(()=>{

        console.log(activeUsers)

    },[activeUsers])



    const handleConnect = (remotePeerId) => {

        var audio_element = document.createElement("audio")

        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
            const call = peer.call(remotePeerId, stream)

            addObjectStream(audio_element, stream)
            
            call.on("stream",(stream)=>{
                

                let currentUserArr = [{userName:"User 2", profileImg:"image ",stream:stream}]
                
                setActiveUsers(arr=>[...arr,...currentUserArr])
                
                

            })




        }).catch(error => alert(error))
    }

    const joinRoom = () => {


        setJoined(true)

        socket.emit("join-room", roomId, peerId)
        socket.on('user-connected', (userId) => {

            handleConnect(userId)

        })


    }


    useEffect(() => {
        if (peerId !== "") {

            setIsAbleToJoin(true)
        }

        console.log(peerId)

    }, [peerId])



    useEffect(() => {


        peer.on('call', (call) => {
            navigator.mediaDevices.getUserMedia({audio:true,video:false}).then(stream=>{
                call.answer(stream)
            })
            
            call.on('stream', (stream) => {
                
                let currentUserArr = [{userName:"User 1", profileImg:"image ",stream:stream}]
                
                setActiveUsers(arr=>[...arr,...currentUserArr])
                

            })




        })
        peer.on('open', (id) => {

            setPeerId(id)

        })



    }, [])



    const addObjectStream = (video, stream) => {
        videoDiv = document.getElementById("video-grid")
        video.classList.add(styles.video-stream)
        
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
            
        })

    }

    



    return (
    
        <> {activeUsers.map(i=>{
            return(<h1>{i.userName}</h1>)
        })}
            <div className={`d-flex justify-content-center pt-5 mt-5 ${joined ? "d-none " : " d-block"}`} >
                <button onClick={joinRoom} className="btn btn-primary" disabled={!isAbleToJoin}>Join Room</button>
            </div>
            <div className={`container ${!joined ? "d-none " : " d-block"}`} >
                <div className="row ">
                    {/* <div className="col-12" style={{"border":"1px solid #ff0000"}}>
                        <div className={`d-flex justify-content-center border-1 ${joined ? "d-block " : " d-none"}`} id="video-grid">

                        </div>
                    </div> */}
                    
                    <ActiveUsersWrapper users={activeUsers}></ActiveUsersWrapper>

                </div>


            </div>
        </>


    )


}