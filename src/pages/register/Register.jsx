import { React, useState, useEffect } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import CustomTextInput from '../../utilities/customForm/CustomTextInput'
import UserService from '../../services/userService'
import { Redirect, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../../store/action/userAction'


export default function Login() {
    const isUserLoggedIn = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const initialValues = {
        name: "",
        username: "",
        email: "",
        password: ""
    }

    const schema = Yup.object({

        username: Yup.string().required().min(3).max(18),
        password: Yup.string().required(),
        email: Yup.string().email(),
        password: Yup.string().min(6).max(18)

    });

    useEffect(() => {


        if (isUserLoggedIn) {
            history.push("/")
        }

    }, [isUserLoggedIn])


    async function handleRegister(values) {

        let userService = new UserService()
        let registerResult = await userService.register(values)
        registerResult = registerResult.data

        if (registerResult.success) {

            toast.success("Successfully registered")
            setTimeout(() => {
                history.push("/login")
            }, 200)

        } else {

            toast.error(registerResult.message)
        }

    }




    return (
        <div class="row">



            <div class="col-12 ">
                <div class="row d-flex justify-content-center">


                    <div class="col-12 text-center p-3">
                        <h2>Register Speakiv</h2>
                    </div>

                    <div class="col-6">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={(values) => handleRegister(values)}
                        >

                            <Form className="ui form">
                                <CustomTextInput className="mb-5" name="name" placeholder="Name"   ></CustomTextInput>
                                <CustomTextInput className="mb-5" name="username" placeholder="Username"   ></CustomTextInput>
                                <CustomTextInput className="mb-5" name="email" placeholder="Email"></CustomTextInput>
                                <CustomTextInput className="mb-5" name="password" placeholder="Password" type="password"   ></CustomTextInput>
                                <button type="submit" className="btn btn-primary">Create Room</button>
                            </Form>

                        </Formik>

                    </div>

                </div>

            </div>

        </div>
    )
}
