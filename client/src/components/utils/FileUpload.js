import React, { useState } from 'react'
import Axios from 'axios';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd'

function FileUpload(props) {
    const [Images, setImages] = useState([])

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append('file', files[0])
        Axios.post('/api/product/uploadImage', formData, config)
            .then(resp => {
                if (resp.data.success) {
                    setImages([...Images, resp.data.image])
                    props.refreshFunction([...Images, resp.data.image])
                } else {
                    alert('Failed to save the Image in the Server');
                }
            })

        // save the image we choose inside the node server
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type='plus' style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: "scroll" }}>
                <div>
                    <img src="" alt="" />
                </div>
            </div>




        </div>
    )
}

export default FileUpload