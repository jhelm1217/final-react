import { useContext, useState } from "react"
import { AuthContext } from "./context"
import { createImage, createMessage } from "./api"
import './App.css'


const UploadImage = () => {
    const { auth } = useContext(AuthContext)
    const [image, setImage] = useState(undefined)
    const [title, setTitle] = useState('')

    const submit = () => {
        createImage({
            auth, 
            title, 
            image
        })
            .then (response => {
                console.log('UPLOAD IMAGE: ', response)
                createMessage({ auth, content: response.data.title, image: `http://127.0.0.1:8000/${response.data.image}`})
            })
            .catch(error => console.log('ERRRRROR: ', error))
    }



    return (
        <div>
            <h4>Upload Image</h4>
            <div>Image Caption</div>
            <input
                onChange={e => setTitle(e.target.value)}
                
                value= { title }
                

            />
            <div>
                <input
                    accept='/image/*'
                    type='file'
                    onChange={e => setImage(e.target.files[0])}
                
                />
            </div>

            <div>
                <button onClick={() => submit ()} style={{ color: 'white ', backgroundColor: 'purple', borderRadius: '10px'}}> 
                    Submit
                </button>
            </div>

        </div>
    )
}

export default UploadImage