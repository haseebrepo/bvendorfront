import React, { useEffect, useState } from 'react'
import Product from "../Product.js"
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  // const checkUser = () => {
  //   // localStorage.setItem('bvendor_user', JSON.stringify(data.data));
  //   var userObject = JSON.parse(localStorage.getItem('bvendor_user'))
  //   userObject = userObject ? userObject.hasOwnProperty('tokens') ? userObject :"not found 1" : "not found"
  //   console.log(userObject)
  //   return userObject
  // }

 const navigate = useNavigate();
  const userData = localStorage.getItem('bvendor_user')? JSON.parse(localStorage.getItem('bvendor_user')) : null
if (userData===null){
  console.log('here i am in null')
  navigate('/login')
  window.location.href = `http://localhost:3000/login`
}
 
  const API = 'http://localhost:8000/product/?product=all';
  let reponse_data = [];
  const [responseData, setResponseData] = React.useState([])
  const [showReturn, setShowReturn] = useState(0)
  const headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('bvendor_user')).tokens.access}`,
};
  



  const fetchProducts = async (url) => {
    
    if (localStorage.getItem('bvendor_user')){
     await axios.get(url, { headers }).then(
      (response) =>{ reponse_data = response.data
      console.log('cmmmm')
      console.log(responseData)
      console.log('immmmmmmm')
      console.log(reponse_data)
      console.log(responseData)
      setResponseData(response)
      console.log('bmmmm')
      console.log(responseData.data)
      console.log('dm')
      console.log(showReturn)
      if(typeof array !== 'undefined'){
        setShowReturn(1)
      }
      setShowReturn(1)
      console.log(showReturn)

      }

    )
  }
  }

  useEffect(()=>{
    fetchProducts(API);
  },[])

  if (showReturn===0){
    return (
      <>
      <h2 style={{backgroundColor:'#2E3B55', border:'2px solid #2E3B55' ,textAlign:'center', paddingTop:'5px',paddingBottom:'5px', marginLeft:'10px', marginRight:'10px', marginTop:'10px', color:'white'}}>{userData ? `Welcome ${userData.full_name}` :"Home Page"}</h2>
      </>
    )
  }
else{
  return (
    <>
    {
      console.log("in jsx",responseData.data)
    }

     
    <h2 style={{backgroundColor:'#2E3B55', border:'2px solid #2E3B55' ,textAlign:'center', paddingTop:'5px',paddingBottom:'5px', marginLeft:'10px', marginRight:'10px', marginTop:'10px', color:'white'}}>{userData ? `Welcome ${userData.full_name}` :"Home Page"}</h2>
    <p></p>
    <div style={{marginLeft:'10px', marginRight:'10px'}}>
    <Row lg={4} sm={6} xs={12} md={6}>
          
    {localStorage.getItem('bvendor_user')? 
    
    responseData.data.data.map((item,index)=>(
      <Col >
      <Product  index={index} title={item.title} quantity={item.quantity} price={item.price} image_url={item.image_url} id={item.id} description={item.description}/>
      </Col>
    ))
    // <Product />
    
    
    : "User Not Logged in"
  }

        </Row>
        </div>
    </>
  )}
}

export default Home