import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input

const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: 'Antarctica' }
]


function UploadProductPage() {
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([])

    const onTitleChange = evt => {
        setTitleValue(evt.currentTarget.value)
    }
    const onDescriptionChange = evt => {
        setDescriptionValue(evt.currentTarget.value)
    }
    const onPriceChange = evt => {
        setPriceValue(evt.currentTarget.value);
    }
    const onContinentsSelectChange = evt => {
        setContinentValue(evt.currentTarget.value);
    }

    const updateImages = newImages => {
        setImages(newImages);
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Travel Product</Title>
            </div>

            <Form >
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label htmlFor="">Title</label>
                <Input
                    type="text"
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label htmlFor="">Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />

                <label htmlFor="">Price($)</label>
                <Input
                    type="number"
                    onChange={onPriceChange}
                    value={PriceValue}
                />
                <select onChange={onContinentsSelectChange}>
                    {Continents.map(item => (
                        <option value={item.key} key={item.key}>
                            {item.value}
                        </option>
                    ))}
                </select>
                <br />
                <br />

                <Button>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage