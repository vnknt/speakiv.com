
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import styles from './Room.module.css'
import { io } from "socket.io-client";
import connectedUserCard from "../../components/connectedUserCard/ConnectedUserCard";
import React from "react";
import ActiveUsersWrapper from "../../components/ActiveUsersWrapper/ActiveUsersWrapper";
import RoomService from "../../services/roomService";
import UserService from "../../services/userService";
import jwtDecode from "jwt-decode";
import ButtonEndCall from "../../components/RoomComponents/ButtonEndCall/ButtonEndCall";
import ButtonMicrophone from "../../components/RoomComponents/ButtonMicrophone/ButtonMicrophone";



export default function Room(props) {

    const [peerId, setPeerId] = useState("");
    const [selfUserId, setSelfUserId] = useState("")
    const [calls, setCalls] = useState([])
    const [joined, setJoined] = useState(false)
    const [isAbleToJoin, setIsAbleToJoin] = useState(false)
    const [stream, setStream] = useState(null)
    const [activeUsers, setActiveUsers] = useState([])
    const mediaStreamRef = useRef()
    const history = useHistory()


    const callsRef = useRef({})
    callsRef.current = {}

    const socket = useRef()
    const peer = useRef(new Peer(
        {
            config: {
                'iceServers': [
                    { url: 'stun:stun.l.google.com:19302' },
                    {
                        url: 'turn:numb.viagenie.ca',
                        credential: 'muazkh',
                        username: 'webrtc@live.com'
                    }
                ]
            }
        }))

    // let peer = ;

    let { roomId } = useParams()

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken")
        socket.current = io.connect(process.env.REACT_APP_SOCKET_URL + `/room`, { query: { token: accessToken }, 'force new connection': true })
        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
            setStream(stream)
            mediaStreamRef.current = stream
        })
        return () => {
            socket.current.close()
            mediaStreamRef.current.getTracks().forEach(function(track) {
                track.stop();
              });
        }
    }, [])
    useEffect(() => {

        console.log(activeUsers)

    }, [activeUsers])



    const handleConnect = (remotePeerId, userId) => {
        console.log(remotePeerId, userId)
        if (userId === selfUserId) {
            return
        }



        const call = peer.current.call(remotePeerId, stream, { metadata: { userId: selfUserId } })

        
        callsRef.current[userId] = call


        call.on("stream", async (stream) => {

            let userService = new UserService()
            let userResult = await userService.getUserById(userId);
            if (userResult.data.success) {
                let user = userResult.data.data
                let currentUserArr = [{ ...user, stream: stream }]
                setActiveUsers(arr => [...arr, ...currentUserArr])
            }




        })





    }




    const handleDisconnect = (userId) => {

        setActiveUsers(arr => [...arr].filter(user => user._id !== userId))

    }



    const joinRoom = () => {


        setJoined(true)
        socket.current.emit("join-room", roomId, peerId)
        socket.current.on('user-connected', (userId, peerId) => {
            console.log("user-connected", peerId, userId)
            handleConnect(peerId, userId)

        })
        socket.current.on('user-disconnected', (userId) => {

            if (userId !== selfUserId) {
                handleDisconnect(userId)
            }
        })


    }


    useEffect(() => {
        if (peerId !== "") {

            setIsAbleToJoin(true)

        }

        console.log(peerId)

    }, [peerId])



    useEffect(() => {
        let id;
        async function decode() {
            id = jwtDecode(localStorage.getItem("accessToken")).user_id
            setSelfUserId(id)
        }
        decode()

    }, [])




    useEffect(() => {


        peer.current.on('call', (call) => {
            let userId = call.metadata.userId

            call.answer(stream)
            //setCalls([...calls,call])
            callsRef.current[userId] = call




            call.on('stream', async (stream) => {

                let userService = new UserService()
                let userResult = await userService.getUserById(userId);
                if (userResult.data.success) {
                    let user = userResult.data.data
                    let currentUserArr = [{ ...user, stream: stream }]
                    setActiveUsers(arr => [...arr, ...currentUserArr])
                }

            })




        })
        peer.current.on('open', (id) => {

            setPeerId(id)

        })

        return () => {

            //peer.current.removeListener('call',()=>{})
            //peer.current.disconnect()

            socket.current.removeAllListeners("user-connected");
            socket.current.removeAllListeners("user-disconnected");
            peer.current.destroy()

            console.log(callsRef.current)


            socket.current.emit("user-closed", roomId)
            socket.current.removeListener('user-disconnected', () => { })

        }

    }, [])




    async function isRoomExist() {

        let roomService = new RoomService()

        let response = await roomService.getRoomById(roomId).then(response => { return response })
        if (!response.data.success) {
            history.push('/')
        }
        return await response.data.success

    }


    return (

        <>

            {!isRoomExist() ?

                //   <Redirect to="/" ></Redirect>
                ""
                :


                <>

                    {activeUsers.map(i => {
                        return (<h1>{i.userName}</h1>)
                    })}
                    <div className={`d-flex justify-content-center pt-5 mt-5 ${joined ? "d-none " : " d-block"}`} >
                        <button onClick={() => { joinRoom() }} className="btn btn-primary" disabled={!isAbleToJoin}>Join Room</button>
                    </div>
                    <div className={`container ${!joined ? "d-none " : " d-block"}`} >
                        <div className="row">
                            <div className="col-12">
                                <ButtonEndCall></ButtonEndCall>
                                <ButtonMicrophone></ButtonMicrophone>
                            </div>

                            <ActiveUsersWrapper users={activeUsers}></ActiveUsersWrapper>
                        </div>


                    </div>
                </>


            }
        </>


    )


}