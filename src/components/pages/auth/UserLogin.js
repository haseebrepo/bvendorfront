import { Alert, Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const UserLogin = () => {

    const [error, setError] = useState(
        {
        status: false,
        msg: "",
        type: "",
    })

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            email: data.get('email'),
            password: data.get('password')
        }
        console.log(actualData)

        // (actualData.email && actualData.password) ? console.log('all fields available') : console.log('all fields are rquired')
        if (actualData.email && actualData.password){
            console.log('all fields available')
            document.getElementById('login-form').reset()
            setError({
                status:true,
                type: 'success',
                msg: 'Logged In Successfully'
            })
            navigate('/')
        }
        else{
            console.log('all fields are rquired')
            setError({
                status:true,
                type: 'error',
                msg: 'All fields are required'
            })
        }
    }
  return (
    <>
    <Box 
        component='form' 
        id='login-form'
        onSubmit={handleSubmit}
        sx={{mt:1, paddingRight:2, paddingLeft:2}}
        noValidate>

            <TextField fullWidth name='email' label='Email Address' margin='normal' required id='email'/>

            <TextField fullWidth name='password' label='Password' margin='normal' required type='password' id='password'/>
            <NavLink to='/' >Forgot Password ? </NavLink>
            <Box textAlign='center'>
                <Button
                    variant='contained'
                    sx={{mt:3, mb:2, px:5, backgroundColor:'#2E3B55'}}
                    type='submit'>
                    User Login
                </Button>
            </Box>

            {error.status? 
            <Alert severity={error.type}>{error.msg}</Alert>   
            : null 
            }
            
    </Box>
    </>
  )
}

export default UserLogin