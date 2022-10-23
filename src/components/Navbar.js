import React from 'react'
import { Box, AppBar, Toolbar, Typography, Button} from "@mui/material/";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    
    <>
    
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            B-Vendor
          </Typography>
          {/* #5F9EA0 */}

          <Button component={NavLink} to='/' 
          style={(isActive)=>{return {backgroundColor: isActive ?'':''}}} 
          sx={{color:'white', textTransform:'none'}}>Home</Button>

          <Button component={NavLink} to='/contact' 
          style={({isActive})=>{return {backgroundColor: isActive ?'':'' }}} 
          sx={{color:'white', textTransform:'none'}}>Contact</Button>
          
          <Button component={NavLink} to='/login'
          style={(isActive)=>{return {backgroundColor: isActive? '':''}}}
          sx={{color:'white', textTransfrom:'none'}}
          >Login/Register</Button>

        </Toolbar>
      </AppBar>
    </Box>

    </>
  )
}

export default Navbar