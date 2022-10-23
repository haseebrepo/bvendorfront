import { Box, Card, Grid, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import Pic1 from '../../../images/pic1.png'
import Registration from './Registration';
import UserLogin from './UserLogin';


const TabPanel = (props) => {
    const {children, value, index} = props;
    return (
        <div role='tabpanel' hidden={value!==index}>
            {
                value === index && (
                    <>
                    <Box>{children}</Box>
                    {console.log(children)}
                    </>
                    
                )
            }
        </div>
    )
}

const LoginReg = () => {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) =>{
        setValue(newValue)
        console.log(newValue)
    }

  return (
    <>
    <Grid container sx={{height:'90vh'}}>
        <Grid lg={7} sm={5} sx={{
            backgroundImage: `url(${Pic1})`,
            backgroundRepeat:'no-repear',
            backgroundSize:'cover',
            backgroundPosition:'center',
            display: {xs:'none', sm:'block'}
        }}>
        </Grid>


        <Grid lg={5} sm={7} xs={12}>
            <Card sx={{
                width:'100%',
                height:'100%'
            }}>
                <Box>
                    <Box sx={{
                        borderBottom:1,
                        borderColor:'divider'
                    }}>

                        <Tabs 
                            textColor='#2E3B55' 
                            indicatorColor='secondary'
                            value={value}
                            onChange={handleChange}>

                            <Tab label='Login' 
                            sx={{textTransform:'none',
                                fontWeight:'bold'
                            }}>
                            </Tab>

                            <Tab label='Register'
                            sx={{
                                textTransform:'none',
                                fontWeight:'bold'
                            }}>

                            </Tab>

                        </Tabs>

                    </Box>
                    <TabPanel value={value} index={0}><UserLogin/></TabPanel>
                    <TabPanel value={value} index={1}><Registration/></TabPanel>
                </Box>
            </Card>
        </Grid>


    </Grid>
    </>
  )
}

export default LoginReg