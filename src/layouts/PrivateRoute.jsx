import React from 'react'
import { Component } from 'react'
import { Redirect, Route } from 'react-router'

export default function PrivateRoute({component:Component ,authed:authed ,...rest}) {
    console.log(rest)

    return (
        <>
        

            <Route
            {...rest}
            render={(props)=>{

                if(authed) {
                    return <Component></Component>
                
                }else{
                    return <Redirect to="/login"></Redirect>
                }
                    
                
                
                
             }}            
            />
        </>
            

    )
}
