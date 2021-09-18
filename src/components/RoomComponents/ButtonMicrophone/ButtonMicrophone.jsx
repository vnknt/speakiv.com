import React from 'react'

export default function ButtonMicrophone(props) {
    let {microphoneState,setMicrophoneState,...fields} = props


    function toggleMicrophone(){
        setMicrophoneState(!microphoneState)
    }


    return (
        <div {...fields}>
            <button onClick={toggleMicrophone} className={`text-3xl w-12 h-12 rounded-full  ${(!microphoneState)?"bg-yellow-800 bg-opacity-60":"bg-green-700"} text-gray-100 text-center`}><i className={`microphone ${(!microphoneState)?"slash":""} icon`}></i></button>
        </div>
    )
}
