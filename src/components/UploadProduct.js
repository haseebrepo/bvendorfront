import React, { useState } from 'react'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import API from "./pages/API";



const UploadProduct = () => {

    const [data, setData] = useState({
        title: "",
        description: "",
        image_url: "",
        video_url: "",
        price: 0,
        quantity: 0
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image_url: "",
        video_url:"",
        price: 0,
        quantity: 0
    });


    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...data };
        newData[input.name] = input.value;
        setData(newData);
    };

    const handleImageChange = (e) => {
        let newData = { ...data };
        newData["image_url"] = e.target.files[0];
        setData(newData);
    };

    const handleVideoChange = (e) => {
        let newData = { ...data };
        newData["video_url"] = e.target.files[0];
        setData(newData);
    };

    const doSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        const response = await API.createMyModelEntry(data);
        if (response.status === 400) {
            setErrors(response.data);
        }
    };



  return (

    
    <>
    <div style={{paddingLeft:"200px", paddingRight:"200px", marginTop:"50px", marginBottom:'80px'}}>

    <Form>
            <Row>
                <Form.Group className="mb-3" controlId="titleInput">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={data.title}
                        isInvalid={errors.title}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        maxLength={80}
                    />
                    {errors.title && (
                        <Form.Text className="alert-danger" tooltip>
                            {errors.title}
                        </Form.Text>
                    )}
                </Form.Group>
            </Row>

            <Row>
                <Form.Group className="mb-3" controlId="titleInput">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        min={1}
                        value={data.number}
                        isInvalid={errors.title}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        maxLength={80}
                    />
                    {errors.title && (
                        <Form.Text className="alert-danger" tooltip>
                            {errors.title}
                        </Form.Text>
                    )}
                </Form.Group>
            </Row>


            <Row>
                <Form.Group className="mb-3" controlId="titleInput">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        min={1}
                        value={data.price}
                        isInvalid={errors.title}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        maxLength={80}
                    />
                    {errors.title && (
                        <Form.Text className="alert-danger" tooltip>
                            {errors.title}
                        </Form.Text>
                    )}
                </Form.Group>
            </Row>



            <Row>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image_url"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => {
                            handleImageChange(e);
                        }}
                    />
                    {errors.image_url && (
                        <Form.Text className="alert-danger" tooltip>
                            {errors.image_url}
                        </Form.Text>
                    )}
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Product Video</Form.Label>
                    <Form.Control
                        type="file"
                        name="video_url"
                        accept="video/mp4,video/mkv,video/WEBM, video/"
                        onChange={(e) => {
                            handleVideoChange(e);
                        }}
                    />
                    {errors.image_url && (
                        <Form.Text className="alert-danger" tooltip>
                            {errors.image_url}
                        </Form.Text>
                    )}
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="descriptionInput">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    name="description"
                    value={data.description}
                    isInvalid={errors.description}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                {errors.description && (
                    <Form.Text className="alert-danger" tooltip>
                        {errors.description}
                    </Form.Text>
                )}
            </Form.Group>
            <Button
                style={{backgroundColor:'#2E3B55', color:'white'}}
                variant="contained"
                type="submit"
                onClick={(e) => doSubmit(e)}> Submit Now
            </Button>
        </Form>


    </div>
    
    </>
  )
}

export default UploadProduct