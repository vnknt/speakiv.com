import {React,useState,useEffect} from 'react'
import { Form,Formik } from 'formik'
import * as Yup from 'yup'
import CustomTextInput from '../../utilities/customForm/CustomTextInput'
import UserService from '../../services/userService'
import { Redirect, useHistory } from 'react-router'
import { useSelector,useDispatch } from 'react-redux'

import {login} from '../../store/action/userAction'


export default function Login() {
    const isUserLoggedIn = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const initialValues= {
        username:"",
        password:""
    }

    const schema = Yup.object({

        username:Yup.string().required().min(3).max(18),
        password:Yup.string().required()


    });

    useEffect(()=>{
        

       if(isUserLoggedIn){
           history.push("/")
       }

    },[isUserLoggedIn])


    async function handleLogin(values){

        let userService = new UserService()
        let loginResult =await  userService.login(values.username,values.password)
        loginResult=loginResult.data

        if(loginResult.success){
            let token = loginResult.data    
             dispatch(login(token))
            
        }else{

            alert("username or password is wrong")

        }

    }




    return (
        <>


        {isUserLoggedIn?


        <Redirect to="/"></Redirect>:


            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values)=>handleLogin(values)}

            >   
            
                <Form className="ui form">
                    <CustomTextInput className="mb-5" name="username" placeholder="E-mail or username"   ></CustomTextInput>
                    <CustomTextInput className="mb-5" name="password" placeholder="Password" type="password"   ></CustomTextInput>
                        
                    <button type="submit" className="btn btn-primary">Create Room</button>
                </Form>

            </Formik>   


        }
        </>


    )
}
