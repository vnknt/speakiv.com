
import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useParams,useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import styles from './Room.module.css'
import { io } from "socket.io-client";
import connectedUserCard from "../../components/connectedUserCard/ConnectedUserCard";
import React from "react";
import ActiveUsersWrapper from "../../components/ActiveUsersWrapper/ActiveUsersWrapper";
import RoomService from "../../services/roomService";
import UserService from "../../services/userService";
import jwtDecode from "jwt-decode";



export default function Room(props) {

    const [remoteId, setRemoteId] = useState("");
    const [peerId, setPeerId] = useState("");
    const [selfUserId,setSelfUserId] = useState("")
    // const [calls, setCalls] = useState([])
    // const [callAccepted, setCallAccepted] = useState(false)

    const [joined, setJoined] = useState(false)
    const [isAbleToJoin, setIsAbleToJoin] = useState(false)

    const [activeUsers,setActiveUsers] = useState([])
    let [arr , setArr] = useState([])

    const history = useHistory()
    const socket = io.connect(process.env.REACT_APP_SOCKET_URL,{query:{token:localStorage.getItem("accessToken")}})

    let peer = new Peer();

    let { roomId } = useParams()

    var videoDiv = null;


    const handleInput = (event) => {

        setRemoteId(event.target.value)

    }

    useEffect(()=>{

        console.log(activeUsers)

    },[activeUsers])



    const handleConnect = (remotePeerId,userId) => {

        // var audio_element = document.createElement("audio")

        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {


            const call = peer.call(remotePeerId, stream,{metadata:{userId:selfUserId}})
            


            // addObjectStream(audio_element, stream)
            
            call.on("stream",async (stream)=>{
                
                let userService = new UserService()
                let userResult = await userService.getUserById(userId);
                console.log(userResult)
                
                let currentUserArr = [{userName:userResult.data.data.username, profileImg:"image ",stream:stream}]
                
                setActiveUsers(arr=>[...arr,...currentUserArr])
                
                

            })




        }).catch(error => alert(error))
    }

    const joinRoom = () => {


        setJoined(true)

        socket.emit("join-room", roomId, peerId)

        socket.on('user-connected', (userId,peerId) => {
           
            handleConnect(peerId,userId)

        })


    }


    useEffect(() => {
        if (peerId !== "") {

            setIsAbleToJoin(true)

        }

        console.log(peerId)

    }, [peerId])



    useEffect(async ()=>{
        let id = await jwtDecode(localStorage.getItem("accessToken")).user_id
        setSelfUserId(id)
    },[])




    useEffect(() => {
        

            peer.on('call', (call) => {
                
                navigator.mediaDevices.getUserMedia({audio:true,video:false}).then(stream=>{
                call.answer(stream)

            })


            
            call.on('stream', async(stream) => {
                
                let userService = new UserService()
                let userId = call.metadata.userId
                let userResult = await userService.getUserById(userId);
                console.log(`USER_ID : ${userId}`)
                
                let currentUserArr = [{userName:userResult.data.data.username, profileImg:"image ",stream:stream}]
                
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
        video.muted=true
        video.addEventListener('loadedmetadata', () => {
            
            video.play()
            
        })

    }

    
async function isRoomExist(){
    
    let roomService = new RoomService()
    
    let response = await  roomService.getRoomById(roomId).then(response=>{return response})
    if(!response.data.success){
        history.push('/')
    }
    return  await response.data.success

}


    return (
    
        <>  

        { !isRoomExist() ?
        
        //   <Redirect to="/" ></Redirect>
        ""
        :
    
        
        <>
        
        {activeUsers.map(i=>{
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
        
        
    }
        </>


    )


}