import { Alert, Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Registration = () => {

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
            password: data.get('password'),
            confirm_password: data.get('password_confirmation'),
            store_name: data.get('store_name'),
            name: data.get('name')

        }
        console.log(actualData)

        // (actualData.email && actualData.password) ? console.log('all fields available') : console.log('all fields are rquired')
        if (actualData.email && actualData.password && actualData.confirm_password && actualData.store_name && actualData.name){
            console.log('all fields available')
            
            if (actualData.password !== actualData.confirm_password){
                console.log('in the password confirmation')
                setError({
                    status:true,
                    type: 'error',
                    msg: 'Password & Confirm Password should be same'
                })
            }
            else{
                document.getElementById('registration-form').reset()
                setError({
                    status:true,
                    type: 'success',
                    msg: 'Registered Successfully'
                })
                navigate('/')
            }
            
            
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
        id='registration-form'
        onSubmit={handleSubmit}
        sx={{mt:1, paddingRight:2, paddingLeft:2}}
        noValidate>

            <TextField fullWidth name='name' label='Full Name' margin='normal' required id='name'/>
            {/* <TextField fullWidth name='name' label='Last Name' margin='normal' required id='name'/> */}
            <TextField fullWidth name='store_name' label='Store Name' margin='normal' required id='name'/>
            <TextField fullWidth name='email' label='Email Address' margin='normal' required id='email'/>
            <TextField fullWidth name='password' label='Password' margin='normal' required type='password' id='password'/>
            <TextField fullWidth name='password_confirmation' label='Confrim Password' margin='normal' required type='password' id='password_confirmation'/>
            
            <Box textAlign='center'>
                <Button
                    variant='contained'
                    sx={{mt:3, mb:2, px:5, backgroundColor:'#2E3B55'}}
                    type='submit'>
                    Join
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

export default Registration