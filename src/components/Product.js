import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from '@mui/material'
import "../styles/ProductCard.css"

// const image = "https://i02.appmifile.com/769_operator_in/26/04/2021/2fab525c022f0d6c0dba8a6edcf12060.png?width=398&height=320";
// const image = "http://localhost:3000/static/media/bike.6c47012aa19098139cfb.jpg";
import image from './bike.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Product = ({index, title, quantity, price, image_url, id, description, video_url}) => {


  const navigate = useNavigate();
  const Delete_API = 'http://localhost:8000/product/';
   let msg = ""
   
    const headers = {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('bvendor_user')).tokens.access}`,
  };
  const handleClick = (e, param) =>{
    // e.preventDefault()
    console.log('clicked', param)
    axios.delete(`${Delete_API}?id=${param}`, { headers })
    .then(() =>{
      msg = 'Delete successful'
      window.location.href = `http://localhost:3000`
    });
  }

  const handleClickVideo = (e, param) =>{
    // e.preventDefault()
    console.log('clicked', param)
    console.log('here is the url: ', `http://localhost:8000${video_url}`)
    window.location.href = `http://localhost:8000${video_url}`

  }

  

  return (
  
    <>

      <div className='cardz'>
        
            <div className='videoCardMain'>
                <div className="videoCard" style={{backgroundImage:`url(http://localhost:8000${image_url})` }}></div>
                <h5>{title}</h5>
                <b>Price: ${price}</b>
                <div><b>Quantity: {quantity}</b></div>
                <span> {description}</span> 
               <br />
                <Button
                className='prod-del-button'
                onClick={event => handleClick(event, id)}
                    variant='contained'
                    sx={{mt:3, mb:2, px:5, backgroundColor:'#2E3B55'}}
                    type='submit'>
                    Delete Product
                </Button>
                <br />
                <Button
                className='prod-del-button'
                onClick={event => handleClickVideo(event, id)}
                    variant='contained'
                    sx={{mt:3, mb:2, px:5, backgroundColor:'#2E3B55'}}
                    type='submit'>
                    Product   Video
                </Button>
            </div>
          


      </div>
      <div>
        
      </div>
      

    </>
  )
}

export default Product