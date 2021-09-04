import { React, useState, useEffect } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import CustomTextInput from '../../utilities/customForm/CustomTextInput'
import FormTitle from '../../utilities/customForm/FormTitle'
import UserService from '../../services/userService'
import { Redirect, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../../store/action/userAction'
import SubmitButton from '../../utilities/customForm/SubmitButton'
import { Link } from 'react-router-dom'
import styles from './Register.module.css'
import FormWrapper from '../../components/formWrapper/FormWrapper'

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


        <FormWrapper title="REGISTER">


            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => handleRegister(values)}
            >

                <Form className="form-row  ui form ">
                    <CustomTextInput className="col-12 mb-5" name="name" placeholder="Name"   ></CustomTextInput>
                    <CustomTextInput className="col-12 mb-5" name="username" placeholder="Username"   ></CustomTextInput>
                    <CustomTextInput className="col-12 mb-5" name="email" placeholder="Email"></CustomTextInput>
                    <CustomTextInput className="col-12 mb-5" name="password" placeholder="Password" type="password"   ></CustomTextInput>
                    <div class="row justify-content-center">
                        <SubmitButton text="Register" className="col-12 col-md-8 col-lg-8 btn btn-primary"></SubmitButton>
                        <div className="row justify-content-center">

                            <Link to="/login" className={`col-12 text-center mt-3 ${styles.link}`}>Do you have an account?</Link>
                        </div>
                    </div>

                </Form>

            </Formik>
        </FormWrapper>

    )
}
