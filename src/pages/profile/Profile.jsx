import jwtDecode from 'jwt-decode'
import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import styles from './Profile.module.css'
import UserService from '../../services/userService'
import ImageUploadModal from '../../components/imageUploadModal/ImageUploadModal'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import {displayIf} from '../../utilities/helpers/displayIf'
export default function Profile() {
    const isLogged = useSelector(store => store.user)
    let dispatch = useDispatch()
    let { userId } = useParams()
    let history = useHistory()
    const [user, setUser] = useState({ name: "", username: "", imgUrl: "" })
    const [isMyProfile, setIsMyProfile] = useState(false)
    const [pageLoaded, setPageLoaded] = useState(false)

    const [showImageModal, setShowImageModal] = useState(false)


    useEffect(async () => {
        if (!isLogged) {
            history.push("/login")
        }
        if (userId === undefined) {
            userId = jwtDecode(localStorage.getItem("accessToken")).user_id
            setIsMyProfile(true)
        }


        let userService = new UserService()
        let request = await userService.getUserById(userId)
        let userData = request.data
        setUser(userData.data)
        if (!userData.success) {
            toast.error("User does not exist", { autoClose: 1000 })
            history.push("/")
            return
        }

        setPageLoaded(true)





    }, [])

    function openImageUploadModal() {

        setShowImageModal(true)
    }

    function updateImageUrl(url) {

        setUser({ ...user, imgUrl: url })

    }

    return (
        <>
        <LoadingSpinner show={pageLoaded}></LoadingSpinner>
        {isLogged?
        <div className={`row ${displayIf(pageLoaded)}`}>
            <ImageUploadModal
                setShow={setShowImageModal}
                show={showImageModal}
                onHide={() => setShowImageModal(false)}
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
                updateImageUrl={updateImageUrl}
            ></ImageUploadModal>

            <div className="col-12 d-flex justify-content-center " >
                <div className="col-6 col-md-3 col-lg-2 text-center " >
                    <div className="row d-flex justify-content-center">
                        <div className="col-8 position-relative">
                            <img className=" rounded-full object-cover" src={user.imgUrl} />
                            <button onClick={() => { openImageUploadModal() }} className="position-absolute bottom-0 text-2xl  end-0 "><i className="camera icon"></i></button>

                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12">
                <div className="col-12 py-2 text-center">
                    <h4>{`@${user.username}`}</h4>
                </div>
                <div className="col-12 py-2 text-center">
                    <span>{`${user.name}`}</span>
                </div>
                <div className="col-12 d-flex justify-center my-2">
                    <span>{`Bio: ${user.bio}`}</span>
                </div>
                <div className="col-12 text-center py-2">
                    {isMyProfile ?
                        <button className="btn btn-secondary m-2">Edit Profile</button>
                        : <>
                            <button className="btn btn-success m-2">Add Friend</button>
                            <button className="btn btn-danger m-2">Report</button>
                        </>
                    }

                </div>

            </div>


        </div>
        : <Redirect to="/login" />
            
                }


        </>

    )
}
