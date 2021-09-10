import { React, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import UserService from '../../services/userService'
import ImageCropper from '../ImageCropper/ImageCropper'

export default function ImageUploadModal(props) {
  let { show,setShow, onHide, dialogClassName, updateImageUrl,...fields } = props


  const [blob, setBlob] = useState(null)
  const [inputImg, setInputImg] = useState('')
  const [zoom, setZoom] = useState(1)


  const getBlob = (blob) => {
    // pass blob up from the ImageCropper component
    setBlob(blob)
  }

  const onInputChange = (e) => {
    // convert image file to base64 string
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      setInputImg(reader.result)
    }, false)

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitImage = async (e) => {
    // upload blob to firebase 'images' folder with filename 'image'

    e.preventDefault()
    let reader = new FileReader();
    let base64data = null
    reader.readAsDataURL(blob);
    reader.onloadend = async function () {
      base64data = reader.result;
    

    let userService = new UserService()
    let uploadResult = await userService.uploadProfileImage(base64data)

    if (!uploadResult.data.success) {
      return toast.error("Image couldn't uploaded")
    }
    setBlob(null)
    setInputImg('')
    setShow(false)
    updateImageUrl(uploadResult.data.data)
    return toast.success("Image uploaded successfully")
  }

    // firebase
    //     .storage()
    //     .ref('images')
    //     .child('image')
    //     .put(blob, { contentType: blob.type })
    //     .then(() => {
    //         // redirect user 
    //     })
  }




  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName={dialogClassName}
      {...fields}
      centered

    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title" >
          Upload Profile Picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div className="h-56">


          {
            inputImg && (
              <ImageCropper
                getBlob={getBlob}
                inputImg={inputImg}
                zoom={zoom}
                setZoom={setZoom}
              />
            )
          }
        </div>
      </Modal.Body>
      <Modal.Footer>

        <div className="d-flex">
          <input type="file" class="form-control  mr-7  " id="customFile"
            type='file'
            accept='image/*,capture=camera'
            onChange={onInputChange}
          />
          <button onClick={handleSubmitImage} class="btn btn-success d-flex" type='submit'><i className="save icon"></i>Kaydet</button>

        </div>
      </Modal.Footer>
    </Modal>
  )
}
